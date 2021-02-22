// 
// This test file contains all tests related to inventory.html
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
    formatListTest();
}

// in Inventory.js
async function formatListTest()
{
    let inventory = new Inventory("ListID");

    await inventory.getProducts();

    var html = inventory.formatList();
    document.getElementById("inventory").innerHTML = html;

    // change expectedElements
    var expectedElements = '<li class="listProduct" id="Barcode0">name: 5</li>' + 
                            '<li class="listProduct" id="Barcode1">name: 2</li>';

    var siteInventoryElements = document.getElementById("inventory").children;
    var actualElements = "";

    for (var i = 0; i < siteInventoryElements.length; i++)
        actualElements += siteInventoryElements[i].outerHTML;

    console.assert(expectedElements == actualElements, "Inventory.formatListTest() FAILED");
}