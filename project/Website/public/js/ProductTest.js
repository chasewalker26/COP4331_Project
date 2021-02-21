if (isTesting == true)
{
    window.onload = function()
    {
        ProductTest();
    }
}

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
