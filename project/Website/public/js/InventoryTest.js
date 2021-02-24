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
    var expectedElements = '<li class="listProduct" id="Barcode0" name="inventoryItem" onclick="inventory.editItem()"><span class="material-icons mx-2">edit</span>name: 5</li>' + 
                            '<li class="listProduct" id="Barcode1" name="inventoryItem" onclick="inventory.editItem()"><span class="material-icons mx-2">edit</span>name: 2</li>';

    var siteInventoryElements = document.getElementById("inventory").children;
    var actualElements = "";

    for (var i = 0; i < siteInventoryElements.length; i++)
        actualElements += siteInventoryElements[i].outerHTML;

    console.log(expectedElements);
    console.log(actualElements);

    console.assert(expectedElements == actualElements, "Inventory.formatListTest() FAILED");
}