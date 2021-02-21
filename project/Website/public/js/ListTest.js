if (isTesting == true)
{
    window.onload = function()
    {
        runTests();
    }
}

function runTests()
{
    getProductsTest();
    updateDatabaseTest();
}


// WRITE LIST TEST

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



