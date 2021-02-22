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
    var list = new List("ListID");

    if (JSON.stringify(list) == JSON.stringify(list))
        data = true;
    else
        data = false;

    console.assert(data == true, "ListTest FAILED");
}

// in Product.js
function ProductTest(){
    var data;
    var product0 = new Product("Barcode0", {
        "count" : 5,
        "idealCount": 1,
        "name" : "name",
        "timeScanned": 0,
        "warningCount": -1,
        "warningDay":  -1 
    });

    var product1 =
    {
        "barcode" : "Barcode0",
        "count" : 5,
        "idealCount": 1,
        "name" : "name",
        "timeScanned": 0,
        "warningCount": -1,
        "warningDay":  -1
    }
    if (JSON.stringify(product1) == JSON.stringify(product0))
        data = true;
    else
        data = false;

    console.assert(data == true, "ProductTest FAILED");
}

// in Test.js
async function getProductsTest()
{
    let list = new List("ListID");
    var data;
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
    else
        data = false;

    console.assert(data == true, "getProductsTest FAILED");
}

// in Test.js
async function updateDatabaseTest()
{
    var list = new List('ListID');
    var data;

    list.products =
    {
        "Barcode0" :
        {
            "count" : 5,
            "idealCount": 1,
            "name" : "name",
            "timeScanned": 0,
            "warningCount": -1,
            "warningDay":  -1
        },
        "Barcode1" :
        {
            "count" : 2,
            "idealCount": 1,
            "name" : "name",
            "timeScanned": 0,
            "warningCount": -1,
            "warningDay":  -1
        }
    }

    await list.updateDatabase(list.products);

    var dbProducts = await pullFromFirebase("ProductList/ListID/");

    if (JSON.stringify(list.products) == JSON.stringify(dbProducts))
        data = true;
    else
        data = false;

    console.assert(data == true, "updateDatabaseTest FAILED");
}

// in ShoppingList.js
async function formatListTest()
{
    let shoppingList = new ShoppingList("ListID");

    await shoppingList.getProducts();

    var html = shoppingList.formatList();
    document.getElementById("shoppingList").innerHTML = html;

    var expectedElements = '<li class="listProduct" id="Barcode0">name: 5</li>' + 
                            '<li class="listProduct" id="Barcode1">name: 2</li>';

    var siteShoppingListElements = document.getElementById("shoppingList").children;
    var actualElements = "";

    for (var i = 0; i < siteShoppingListElements.length; i++)
        actualElements += siteShoppingListElements[i].outerHTML;

    console.assert(expectedElements == actualElements, "ShoppingList.formatListTest() FAILED");
}