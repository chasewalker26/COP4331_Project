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

    var html = shoppingList.formatList();
    document.getElementById("shoppingList").innerHTML = html;

    var expectedElements = '<li class="listProduct" id="Barcode0">name: 5</li>' + 
                            '<li class="listProduct" id="Barcode1">name: 2</li>';

    var siteShoppingListElements = document.getElementById("shoppingList").children;
    var actualElements = "";

    for (var i = 0; i < siteShoppingListElements.length; i++)
        actualElements += siteShoppingListElements[i].outerHTML;

    console.log(actualElements);
    console.log(expectedElements);

    console.assert(expectedElements == actualElements, "formatListTest() FAILED");
}