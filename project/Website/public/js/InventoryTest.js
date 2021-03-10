// 
// This test file contains all tests related to inventory.html
// 
if (isTesting == true)
{
    window.onload = async function()
    {
        await redirectIfNotFirebaseUser(); // runtime function to ensure a user is signed in
        runTests();
    }
}

async function runTests()
{
    await formatListFunctionalTest();
    await formatListVisualTest();
    await getProductTest();
    await replaceProductTest();
    editItemAlertUserTest();
    validEditItemInputEmptyStringTest();
    validEditItemInputStringTest();
    validEditItemInputZeroTest();
    validEditItemInputNegativeTest();
    validEditItemInputPositiveTest();
    await editIdealCountTest();
}

// in Inventory.js
async function formatListFunctionalTest()
{
    let inventory = new Inventory("ListID_TEST");

    await inventory.getProducts();

    inventory.formatList();

    // change expectedElements
    var expectedElements = '<li class="listProduct" id="Barcode0" name="inventoryItem"><span class="material-icons mx-2" data-toggle="modal" data-target="#editItemModal" data-backdrop="false">edit</span>name: 6</li>' + 
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
        "name" : "name",
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

    console.assert(data == true, "getProductTest() FAILED");
}

function editItemAlertUserTest()
{
    var data = false;
    let inventory = new Inventory("ListID_TEST");

    inventory.editItemAlertUser("Hello There!");

    if ($("#editItemAlert")[0].innerHTML == "Hello There!")
        data = true;

    console.assert(data == true, "editItemAlertUserTest() FAILED");
}

function validEditItemInputEmptyStringTest()
{
    var data = false;
    let inventory = new Inventory("ListID_TEST");

    console.assert(inventory.validEditItemInput("") == false, "validEditItemInputEmptyStringTest() FAILED");

    if ($("#editItemAlert")[0].innerHTML == "All inputs must be filled!")
        data = true;

    console.assert(data == true, "validEditItemInputEmptyStringTest() FAILED");
}

function validEditItemInputStringTest()
{
    var data = false;
    let inventory = new Inventory("ListID_TEST");

    console.assert(inventory.validEditItemInput("hi") == false, "validEditItemInputStringTest() FAILED");

    if ($("#editItemAlert")[0].innerHTML == "Your input must be a number!")
        data = true;

    console.assert(data == true, "validEditItemInputStringTest() FAILED");
}

function validEditItemInputZeroTest()
{
    var data = false;
    let inventory = new Inventory("ListID_TEST");

    console.assert(inventory.validEditItemInput("0") == false, "validEditItemInputZeroTest() FAILED");

    if ($("#editItemAlert")[0].innerHTML == "Your input must be greater than 0!")
        data = true;

    console.assert(data == true, "validEditItemInputZeroTest() FAILED");
}

function validEditItemInputNegativeTest()
{
    var data = false;
    let inventory = new Inventory("ListID_TEST");

    console.assert(inventory.validEditItemInput("-5") == false, "validEditItemInputNegativeTest() FAILED");

    if ($("#editItemAlert")[0].innerHTML == "Your input must be greater than 0!")
        data = true;

    console.assert(data == true, "validEditItemInputNegativeTest() FAILED");
}

function validEditItemInputPositiveTest()
{
    let inventory = new Inventory("ListID_TEST");
    console.assert(inventory.validEditItemInput("10") == true, "validEditItemInputPositiveTest() FAILED");
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