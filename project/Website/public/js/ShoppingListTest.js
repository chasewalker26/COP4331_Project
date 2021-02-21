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

async function formatListTest()
{
    let shoppingList = new ShoppingList("ListID");

    await shoppingList.getProducts();

    shoppingList.formatList();

    var expectedElements = '<li class="shoppingListProduct" id="Barcode0">name: 1</li>' + 
                            '<li class="shoppingListProduct" id="Barcode1">name: 1</li>';

    var siteShoppingListElements = document.getElementById("shoppingList").children;
    var actualElements;

    for (var i = 0; i < siteShoppingListElements.length; i++)
        actualElements += siteShoppingListElements[i].outerHTML;

    console.assert(expectedElements == actualElements, "formatListTest() FAILED")
}


