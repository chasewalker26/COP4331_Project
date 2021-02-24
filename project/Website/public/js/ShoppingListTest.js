// 
// This test file contains all tests related to shoppingList.html
// 
if (isTesting == true)
{
    window.onload = function()
    {
        runTests();
    }
}

function runTests()
{
    ListTest();
    ProductTest();
    getProductsTest();
    updateDatabaseTest();
    formatListTest();
}

// in Test.js
function ListTest()
{
    var data = false;
    var actualList = new List("ListID");

    var expectedList =
    {
        "listID" : "ListID",
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
        "timeScanned": 0,
        "warningCount": -1,
        "warningDay":  -1 
    });

    var expectedProduct =
    {
        "barcode" : "Barcode0",
        "count" : 5,
        "idealCount": 1,
        "name" : "name",
        "timeScanned": 0,
        "warningCount": -1,
        "warningDay":  -1
    }
    if (JSON.stringify(builtProduct) == JSON.stringify(expectedProduct))
        data = true;

    console.assert(data == true, "ProductTest FAILED");
}

// in Test.js
async function getProductsTest()
{
    let list = new List("ListID");
    var data = false;

    var products = [
        {
            "barcode" : "Barcode0",
            "count" : 5,
            "idealCount": 1,
            "name" : "name",
            "timeScanned": 0,
            "warningCount": -1,
            "warningDay":  -1
        },
        {
            "barcode" : "Barcode1",
            "count" : 2,
            "idealCount": 1,
            "name" : "name",
            "timeScanned": 0,
            "warningCount": -1,
            "warningDay":  -1
        }
    ]

    await list.getProducts();

    if (JSON.stringify(list.products) == JSON.stringify(products))
        data = true;

    console.assert(data == true, "getProductsTest FAILED");
}

// in Test.js
async function updateDatabaseTest()
{
    var list = new List('ListID');
    var data = false;

    list.products = await pullFromFirebase("ProductList/ListID/");

    await list.updateDatabase(list.products);

    var dbProducts = await pullFromFirebase("ProductList/ListID/");

    if (JSON.stringify(list.products) == JSON.stringify(dbProducts))
        data = true;

    console.assert(data == true, "updateDatabaseTest FAILED");
}

// in ShoppingList.js
async function formatListTest()
{
    let shoppingList = new ShoppingList("ListID");

    await shoppingList.getProducts();

    var html = shoppingList.formatList();
    document.getElementById("shoppingList").innerHTML = html;

    var expectedElements = '<li class="listProduct" id="Barcode0" name="shoppingListItem">name: 5</li>' + 
                            '<li class="listProduct" id="Barcode1" name="shoppingListItem">name: 2</li>';

    var siteShoppingListElements = document.getElementById("shoppingList").children;
    var actualElements = "";

    for (var i = 0; i < siteShoppingListElements.length; i++)
        actualElements += siteShoppingListElements[i].outerHTML;

    console.assert(expectedElements == actualElements, "ShoppingList.formatListTest() FAILED");
}