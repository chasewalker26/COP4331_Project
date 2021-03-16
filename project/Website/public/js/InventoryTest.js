// 
// This test file contains all tests related to inventory.html
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
    await formatListFunctionalTest();
    await formatListVisualTest();
    await getProductTest();
    await replaceProductTest();
    alertUserTest();
    validInputEmptyStringTest();
    validInputStringTest();
    validInputZeroTest();
    validInputNegativeTest();
    validInputPositiveTest();
    await editIdealCountTest();
    await editCountTest();
    editItemUITest();
}

// in Inventory.js
async function formatListFunctionalTest()
{
    let inventory = new Inventory("ListID_TEST");

    await inventory.getProducts();

    inventory.formatList();

    // change expectedElements
    var expectedElements = '<li class="listProduct" id="Barcode0" name="inventoryItem"><span class="material-icons mx-2" data-toggle="modal" data-target="#editItemModal" data-backdrop="false">edit</span>water: 6</li>' + 
                           '<li class="listProduct" id="Barcode1" name="inventoryItem"><span class="material-icons mx-2" data-toggle="modal" data-target="#editItemModal" data-backdrop="false">edit</span>name: 8</li>' +
                           '<li class="listProduct" id="Barcode3" name="inventoryItem"><span class="material-icons mx-2" data-toggle="modal" data-target="#editItemModal" data-backdrop="false">edit</span>name: 3</li>';

    var siteInventoryElements = document.getElementById("inventory").children;
    var actualElements = "";

    for (var i = 0; i < siteInventoryElements.length; i++)
        actualElements += siteInventoryElements[i].outerHTML;

    console.assert(expectedElements == actualElements, "Inventory.formatListTest() FAILED");

}

// in Inventory.js
async function formatListVisualTest()
{
    let inventory = new Inventory("ListID_TEST");
    await inventory.getProducts();
    inventory.formatList();

    var siteInventoryElements = document.getElementsByClassName("listProduct");

    for (var i = 0; i < siteInventoryElements.length; i++)
    {
        var style = getComputedStyle(siteInventoryElements[i]);
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

async function getProductTest()
{
    var data = false;
    let inventory = new Inventory("ListID_TEST");
    await inventory.getProducts();
    
    var product = inventory.getProduct("Barcode0");

    var expectedProduct = 
    {
        "barcode" : "Barcode0",
        "count" : 6,
        "idealCount": 1,
        "name" : "water",
        "dayRemoved": -1,
        "warningDay":  -1 
    }

    if (JSON.stringify(product) == JSON.stringify(expectedProduct))
        data = true;

    console.assert(data == true, "getProductTest() FAILED");
}

async function replaceProductTest()
{
    var data = false;
    let testInventory = new Inventory("ListID_TEST");
    await testInventory.getProducts();

    var newProduct = 
    {
        "barcode" : "Barcode4",
        "count" : 12,
        "idealCount": 10,
        "name" : "name",
        "dayRemoved": -1,
        "warningDay":  -1 
    }
    
    testInventory.replaceProduct("Barcode1", newProduct);
    
    let expectedInventory = new Inventory("ListID_TEST");
    await expectedInventory.getProducts();

    expectedInventory.products[1] = newProduct; // replacement at known location of Barcode1

    if (JSON.stringify(testInventory.products) == JSON.stringify(expectedInventory.products))
        data = true;

    console.assert(data == true, "replaceProductTest() FAILED");
}

function alertUserTest()
{
    var data = false;
    let inventory = new Inventory("ListID_TEST");

    inventory.alertUser("#editItemAlert", "Hello There!");

    if ($("#editItemAlert")[0].innerHTML == "Hello There!")
        data = true;

    console.assert(data == true, "editItemAlertUserTest() FAILED");
}

function validInputEmptyStringTest()
{
    var data = false;
    let inventory = new Inventory("ListID_TEST");

    console.assert(inventory.validInput("") == false, "validInputEmptyStringTest() FAILED");

    if ($("#editItemAlert")[0].innerHTML == "All inputs must be filled!")
        data = true;

    console.assert(data == true, "validInputEmptyStringTest() FAILED");
}

function validInputStringTest()
{
    var data = false;
    let inventory = new Inventory("ListID_TEST");

    console.assert(inventory.validInput("hi") == false, "validInputStringTest() FAILED");

    if ($("#editItemAlert")[0].innerHTML == "Your input must be a number!")
        data = true;

    console.assert(data == true, "validInputStringTest() FAILED");
}

function validInputZeroTest()
{
    var data = false;
    let inventory = new Inventory("ListID_TEST");

    console.assert(inventory.validInput("0") == false, "validInputZeroTest() FAILED");

    if ($("#editItemAlert")[0].innerHTML == "Your input must be greater than 0!")
        data = true;

    console.assert(data == true, "validInputZeroTest() FAILED");
}

function validInputNegativeTest()
{
    var data = false;
    let inventory = new Inventory("ListID_TEST");

    console.assert(inventory.validInput("-5") == false, "validInputNegativeTest() FAILED");

    if ($("#editItemAlert")[0].innerHTML == "Your input must be greater than 0!")
        data = true;

    console.assert(data == true, "validInputNegativeTest() FAILED");
}

function validInputPositiveTest()
{
    let inventory = new Inventory("ListID_TEST");
    console.assert(inventory.validInput("10") == true, "validInputPositiveTest() FAILED");
}

async function editIdealCountTest()
{
    var data = false;
    let inventory = new Inventory("ListID_TEST");
    await inventory.getProducts();

    inventory.editIdealCount("Barcode1", 25);

    var expectedProduct = 
    {
        "count" : 8,
        "dayRemoved": -1,
        "idealCount": 25,
        "name" : "name",
        "warningDay":  -1 
    }

    var updatedProduct = await pullFromFirebase("ProductList/ListID_TEST/Barcode1/");

    if (JSON.stringify(expectedProduct) == JSON.stringify(updatedProduct))
        data = true;

    console.assert(data == true, "editIdealCountTest() FAILED");

    // clean up
    await saveToFirebase("ProductList/ListID_TEST/Barcode1/", {idealCount: 1});
}

async function editCountTest()
{
    var data = false;
    let inventory = new Inventory("ListID_TEST");
    await inventory.getProducts()

    inventory.editCount("Barcode1", 11);

    var expectedProduct =
    {
        "count" : 11,
        "dayRemoved" : -1,
        "idealCount" : 1,
        "name" : "name",
        "warningDay" : -1
    }

    var updatedProduct = await pullFromFirebase("ProductList/ListID_TEST/Barcode1/");

    if (JSON.stringify(expectedProduct) == JSON.stringify(updatedProduct))
        data = true;
    
    console.assert(data == true, "editCountTest() FAILED");

    // clean up
    await saveToFirebase("ProductList/ListID_TEST/Barcode1/", {count: 8})
}

function editItemUITest()
{
    var data = false;
    var editInventoryItemButton = document.getElementsByName("inventoryItem")[0].children[0];

    editInventoryItemButton.click();

    // modal visible
    console.assert($('#editItemModal').is(':visible') == true, 'editItemUITest() FAILED');

    // shown product color correct
    var currentProduct = document.getElementById("currentProduct");
    currentProduct = getComputedStyle(currentProduct);
    console.assert(currentProduct.color == "rgb(89, 139, 196)",  'editItemUITest() FAILED');

    $('#editItemModal').hide();
}