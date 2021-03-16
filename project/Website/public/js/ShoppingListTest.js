// 
// This test file contains all tests related to shoppingList.html
// 
if (isTesting == true)
{
    window.onload = async function()
    {
        await redirectIfNotFirebaseUser(); // runtime function to ensure a user is signed in
        getCurrentDate();
        runTests();
    }
}

async function runTests()
{
    sidenavTest();
    ListTest();
    ProductTest();
    UserTest();
    await getProductsWithExistingListIDTest();
    await getProductsWithBadListIDTest();
    await updateDatabaseTest();
    await formatListFunctionalTest();
    await formatListVisualTest();
    await clearListTest();
    await formatProductsJSONTest();
    await addItemSuccessTest();
    await addItemItemExistsFailureTest();
    await addItemEmptyStringInputFailureTest();
    await addItemStringForNumberFailureTest();
    await nameItemTest();
}

// sidenav resizes as expected when used
function sidenavTest()
{
    document.getElementById("navOpen").click();
    var sidenav = document.getElementById("sidenav");
    
    if ($(window).width() < 1400)
        console.assert(sidenav.style.width == "100%", "sidenavTest FAILED");
    else
        console.assert(sidenav.style.width == "250px", "sidenavTest FAILED");

    document.getElementById("navClose").click();
    console.assert(sidenav.style.width == "0px", "sidenavTest FAILED");
}

// // creating a List returns expected object
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

// // creating a Product returns expected object
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

// creating a User returns expected object
function UserTest()
{
    var data = false;
    var expectedUser = 
    {
        "username": "someName",
        "email": "name@email.com",
        "uid" : "1234asdf"
    }

    var user = new User("someName", "name@email.com", "1234asdf");

    if (JSON.stringify(user) == JSON.stringify(expectedUser))
        data = true;

    console.assert(data == true, "UserTest FAILED");
}

// getProducts returns what is known to be in database
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

// error message displayed from bad getProducts input should match the expected message
async function getProductsWithBadListIDTest()
{
    var data = false;
    let list = new List("listylisty");
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

// updateDatabase causes change in database that is verified to be what was
// expected
async function updateDatabaseTest()
{
    var data = false;
    var list = new List('ListID_TEST');
    list.products = await pullFromFirebase("ProductList/ListID_TEST/");
    
    list.products["Barcode3"].count = 10; // data to change in DB

    await list.updateDatabase(list.products);

    var dbProducts = await pullFromFirebase("ProductList/ListID_TEST/");

    if (JSON.stringify(list.products) == JSON.stringify(dbProducts))
        data = true;

    console.assert(data == true, "updateDatabaseTest FAILED");

    // repair the test data
    await saveToFirebase("ProductList/ListID_TEST/Barcode3/", {count:3});
}

// shopping list items html elements and data should match as expected from UI
// and known test data in DB;
async function formatListFunctionalTest()
{
    let shoppingList = new ShoppingList("ListID_TEST");
    await shoppingList.getProducts();
    shoppingList.formatList();

    var expectedElements = '<li class="listProduct" id="Barcode3" name="shoppingListItem">name: 3</li>' + 
                           '<li class="listProduct notFound" id="unrecognized" name="unrecognizedItem" data-toggle="modal" data-target="#addNameModal" data-backdrop="false">unrecognized</li>';

    var siteShoppingListElements = document.getElementById("shoppingList").children;
    var actualElements = "";

    for (var i = 0; i < siteShoppingListElements.length; i++)
        actualElements += siteShoppingListElements[i].outerHTML;
        
    console.assert(expectedElements == actualElements, "ShoppingList.formatListFunctionalTest() FAILED");
}

// shopping list items should have correct styling as per UI diagrams
async function formatListVisualTest()
{
    let shoppingList = new ShoppingList("ListID_TEST");
    await shoppingList.getProducts();
    shoppingList.formatList();

    var siteListElements = document.getElementsByClassName("listProduct");

    // check if the name: count formatting is right
    var style = getComputedStyle(siteListElements[0]);
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

    // check if the unrecognized item formatting is right
    var style = getComputedStyle(siteListElements[1]);
    var color = style.color;

    console.assert(color == "rgba(251, 87, 87, 0.81)", "formatListVisualTest FAILED");
}

// clear list should leave the shopping list empty and correctly update databse
async function clearListTest()
{
    var data = false;
    let shoppingList = new ShoppingList("ListID_TEST");
    await shoppingList.getProducts();

    shoppingList.clearList();

    var product = await pullFromFirebase("ProductList/ListID_TEST/Barcode3/")

    var siteListElements = document.getElementsByClassName("listProduct");
    var listEmpty = (siteListElements[0] == undefined);

    if (product.count == 6 && listEmpty)
        data = true;

    console.assert(data == true, "clearListTest FAILED");

    // repair the clear operation (fix data, get fixed data, display data)
    await saveToFirebase("ProductList/ListID_TEST/Barcode3/", {count:3});
    await saveToFirebase("ProductList/ListID_TEST/unrecognized/", {count:0});
    await shoppingList.getProducts();
    shoppingList.formatList();
}

// formatProducts... should create the correct database JSON format from the list's products array
async function formatProductsJSONTest()
{
    var data = false;
    let shoppingList = new ShoppingList("ListID_TEST");
    await shoppingList.getProducts();

    var JSONproducts = shoppingList.formatProductsJSON();
    var dbProducts = await pullFromFirebase("ProductList/ListID_TEST/");

    if (JSON.stringify(JSONproducts) == JSON.stringify(dbProducts))
        data = true;
    
    console.assert(data == true, "formatProductsJSONTest FAILED");
}

// Successfully add a mango to the database
async function addItemSuccessTest()
{
    var data = false;
    let shoppingList = new ShoppingList("ListID_TEST");
    await shoppingList.getProducts();

    document.getElementById("addItemName").value = "mango";
    document.getElementById("addItemCount").value = 2;
    document.getElementById("addWarningDay").value = 5;

    await shoppingList.addItem();

    var expectedProduct =
    {
        "count" : 2,
        "dayRemoved": date,
        "idealCount": 2,
        "name" : "mango",
        "warningDay":  5 
    }

    var actualProduct = await pullFromFirebase("ProductList/ListID_TEST/mango");
    
    if (JSON.stringify(actualProduct) == JSON.stringify(expectedProduct))
        data = true;

    console.assert(data == true, "addItemSuccessTest() FAILED");

    // clean up
    document.getElementById("addItemForm").reset();
}

// correct error message appears when item being added already exists
async function addItemItemExistsFailureTest()
{
    var data = false;
    let shoppingList = new ShoppingList("ListID_TEST");

    await shoppingList.getProducts();

    document.getElementById("addItemName").value = "mango";
    document.getElementById("addItemCount").value = "3";
    document.getElementById("addWarningDay").value = "5";

    if ($("#addItemAlert")[0].innerHTML == "This item already exists")
        data = true;
    
    console.assert(data == true, "addItemItemExistsFailureTest() FAILED");

    // clean up
    document.getElementById("addItemForm").reset();
}

// correct error message appears when addItem has bad input
async function addItemEmptyStringInputFailureTest()
{
    var data = false;
    let shoppingList = new ShoppingList("ListID_TEST");

    await shoppingList.getProducts();

    document.getElementById("addItemName").value = "";
    document.getElementById("addItemCount").value = "3";
    document.getElementById("addWarningDay").value = "5";

    await shoppingList.addItem();

    if ($("#addItemAlert")[0].innerHTML == "Please check your input, empty name, count, and warning period must be filled")
        data = true;
    
    console.assert(data == true, "addItemBadInputFailureTest() FAILED");

    document.getElementById("addItemForm").reset();
}

async function addItemStringForNumberFailureTest()
{
    var data = false;
    let shoppingList = new ShoppingList("ListID_TEST");

    await shoppingList.getProducts();

    document.getElementById("addItemName").value = "mango";
    document.getElementById("addItemCount").value = "qwe";
    document.getElementById("addWarningDay").value = "rtwry";

    await shoppingList.addItem();

    if ($("#addItemAlert")[0].innerHTML == "Please check your input, count and warning period must be numbers")
        data = true;
    
    console.assert(data == true, "addItemStringForNumberFailureTest() FAILED");

    document.getElementById("addItemForm").reset();
}


async function nameItemTest()
{
    var data = false;
    let shoppingList = new ShoppingList("ListID_TEST");
    await shoppingList.getProducts();

    document.getElementById("addName").value = "water";
    document.getElementById("addCount").value = 2;

    await shoppingList.nameItem("unrecognized");

    var expectedProduct =
    {
        "count" : 0,
        "dayRemoved": -1,
        "idealCount": 2,
        "name" : "water",
        "warningDay":  -1 
    }
 
    var actualProduct = await pullFromFirebase("ProductList/ListID_TEST/unrecognized");
    
    if (JSON.stringify(actualProduct) == JSON.stringify(expectedProduct))
        data = true;

    console.assert(data == true, "nameItemTest() FAILED");

    await saveToFirebase("ProductList/ListID_TEST/unrecognized/", {name:""});
    await saveToFirebase("ProductList/ListID_TEST/unrecognized/", {idealCount:1});
    await shoppingList.getProducts();
    shoppingList.formatList();
    document.getElementById("addNameForm").reset();
}
