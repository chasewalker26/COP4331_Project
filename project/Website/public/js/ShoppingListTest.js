// 
// This test file contains all tests related to shoppingList.html
// 
if (isTesting == true)
{
    window.onload = async function()
    {
        await redirectIfNotFirebaseUser(); // runtime function to ensure a user is signed in
        runTests();
    }
}

// Uses firebase function to verify firebase user status
async function redirectIfNotFirebaseUser()
{
    await firebase.auth().onAuthStateChanged(function(user)
    {
        if (user)
            initializeAppUser();
        else
            window.location.replace("LoginForm.html");
    });
}

// Uses data from firebase function to create a User
function initializeAppUser()
{
    var user = firebase.auth().currentUser;
    appUser = new User(user.displayName, user.email, user.uid);
    console.log(appUser);
}

async function runTests()
{
    sidenavTest();
    ListTest();
    ProductTest();
    await getProductsWithExistingListIDTest();
    await getProductsWithBadListIDTest();
    await updateDatabaseTest();
    await formatListFunctionalTest();
    await formatListVisualTest();
    await clearListTest();
    await formatProductsJSONTest();
    // await addProductTest();
}

function sidenavTest()
{
    document.getElementById("navOpen").click();
    var sidenav = document.getElementById("sidenav");
    console.assert(sidenav.style.width == "250px", "sidenavTest FAILED");

    document.getElementById("navClose").click();
    console.assert(sidenav.style.width == "0px", "sidenavTest FAILED");
}

// in Test.js
function ListTest()
{
    var data = false;
    var actualList = new List("ListID_TEST");

    var expectedList =
    {
        "listID" : "ListID_TEST",
        "products" : []
    }

    if (JSON.stringify(actualList) == JSON.stringify(expectedList))
        data = true;

    console.assert(data == true, "ListTest FAILED");
}

// in Product.js
function ProductTest(){
    var data = false;
    var builtProduct = new Product("Barcode0", {
        "count" : 5,
        "idealCount": 1,
        "name" : "name",
        "dayRemoved": -1,
        "warningDay":  -1 
    });

    var expectedProduct =
    {
        "barcode" : "Barcode0",
        "count" : 5,
        "idealCount": 1,
        "name" : "name",
        "dayRemoved": -1,
        "warningDay":  -1
    }
    if (JSON.stringify(builtProduct) == JSON.stringify(expectedProduct))
        data = true;

    console.assert(data == true, "ProductTest FAILED");
}

// in Test.js
async function getProductsWithExistingListIDTest()
{
    let list = new List("ListID_TEST");
    var data = false;

    var expectedProducts = [];
    var products = await pullFromFirebase("ProductList/ListID_TEST");
    var barcodes = Object.keys(products);

    for (var i = 0; i < barcodes.length; i++)
    {
        var barcode = barcodes[i];
        expectedProducts.push(new Product(barcode, products[barcode]));
    }

    await list.getProducts();

    if (JSON.stringify(list.products) == JSON.stringify(expectedProducts))
        data = true;

    console.assert(data == true, "getProductsTest FAILED");
}

// in Test.js
async function getProductsWithBadListIDTest()
{
    let list = new List("listylisty");
    var data = false;

    await list.getProducts();

    if ($("#errorMessage").innerHTML = "There is no list associated with this account. Have you scanned any items?")
        data = true;

    // clean up
    setTimeout(() =>
    {
        $("#errorMessage").hide();

    }, 1000);

    console.assert(data == true, "getProductsTest FAILED");
}

// in Test.js
async function updateDatabaseTest()
{
    var list = new List('ListID_TEST');
    var data = false;

    list.products = await pullFromFirebase("ProductList/ListID_TEST/");
    
    list.products["Barcode3"].count = 10; // data to change

    await list.updateDatabase(list.products);

    var dbProducts = await pullFromFirebase("ProductList/ListID_TEST/");

    if (JSON.stringify(list.products) == JSON.stringify(dbProducts))
        data = true;

    console.assert(data == true, "updateDatabaseTest FAILED");

    // repair the test data
    await saveToFirebase("ProductList/ListID_TEST/Barcode3/", {count:3});
}

// in ShoppingList.js
async function formatListFunctionalTest()
{
    let shoppingList = new ShoppingList("ListID_TEST");

    await shoppingList.getProducts();

    shoppingList.formatList();

    var expectedElements = '<li class="listProduct" id="Barcode3" name="shoppingListItem">name: 3</li>';

    var siteShoppingListElements = document.getElementById("shoppingList").children;
    var actualElements = "";

    for (var i = 0; i < siteShoppingListElements.length; i++)
        actualElements += siteShoppingListElements[i].outerHTML;
        
    console.assert(expectedElements == actualElements, "ShoppingList.formatListFunctionalTest() FAILED");
}

// in Inventory.js
async function formatListVisualTest()
{
    let shoppingList = new ShoppingList("ListID_TEST");
    await shoppingList.getProducts();
    shoppingList.formatList();

    var siteListElements = document.getElementsByClassName("listProduct");

    for (var i = 0; i < siteListElements.length; i++)
    {
        var style = getComputedStyle(siteListElements[i]);
        var color = style.color;
        var FF = style.fontFamily;
        var FSize = style.fontSize;
        var FStyle = style.fontStyle;
        var FW = style.fontWeight;

        console.assert(color == "rgba(89, 139, 196, 0.81)", "formatListVisualTest FAILED");
        console.assert(FF == '"Lucida Bright", Georgia, serif', "formatListVisualTest FAILED");
        console.assert(FSize == "30px", "formatListVisualTest FAILED");
        console.assert(FStyle == "normal", "formatListVisualTest FAILED");
        console.assert(FW == "700", "formatListVisualTest FAILED");
    }
}

// in Inventory.js
async function clearListTest()
{
    var data = false;
    let shoppingList = new ShoppingList("ListID_TEST");

    await shoppingList.getProducts();
    shoppingList.clearList();

    var product = await pullFromFirebase("ProductList/ListID_TEST/Barcode3/")

    if (product.count == 6)
        data = true;

    console.assert(data == true, "clearListTest FAILED");

    // repair the clear operation
    await saveToFirebase("ProductList/ListID_TEST/Barcode3/", {count:3});
}

async function formatProductsJSONTest()
{
    let shoppingList = new ShoppingList("ListID_TEST");
    await shoppingList.getProducts();

    var data = false;

    var JSONproducts = shoppingList.formatProductsJSON();
    var dbProducts = await pullFromFirebase("ProductList/ListID_TEST/");

    if (JSON.stringify(JSONproducts) == JSON.stringify(dbProducts))
        data = true;
    
    console.assert(data == true, "formatProductsJSONTest FAILED");
}

// In ShoppingList.js
async function addProductTest()
{
    console.log("addProdTest");
    var data = false;
    let shoppingList = new ShoppingList("ListID_TEST");

    await shoppingList.getProducts();

    document.getElementById("popup-button").click();

    document.getElementById("prodName").value = "Banana Ice Cream";
    document.getElementById("prodQuantity").value = 2;
    document.getElementById("addItem-button").click();

    var expectedProduct =
    {
        "barcode" : "Banana Ice Cream",
        "count" : 2,
        "idealCount": 10,
        "name" : "Banana Ice Cream",
        "dayRemoved": -1,
        "warningDay":  -1 
    }

    var actualProduct = await pullFromFirebase("ProductList/ListID/Banana Ice Cream");
    
    console.assert(JSON.stringify(expectedProduct.count) == actualProduct.count, "addProductTest FAILED");
    console.assert(JSON.stringify(expectedProduct.idealCount) == actualProduct.idealCount, "addProductTest FAILED");
    console.assert(JSON.stringify(expectedProduct.name) == JSON.stringify(actualProduct.name), "addProductTest FAILED");
    console.assert(JSON.stringify(expectedProduct.dayRemoved) == actualProduct.dayRemoved, "addProductTest FAILED");
    console.assert(JSON.stringify(expectedProduct.warningDay) == actualProduct.warningDay, "addProductTest FAILED");
}