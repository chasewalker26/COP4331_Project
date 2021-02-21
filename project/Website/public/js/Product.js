class Product{
    constructor(barcode, product){
        this.barcode = barcode;
        this.count = product.count;
        this.idealCount = product.idealCount;
        this.name = product.name;
        this.timeScanned = product.timeScanned;
        this.warningCount = product.warningCount;
        this.warningDay = product.warningDay;
    }

    /*
    getProduct(barcode){

        //converts 
        var product = 
        {  
            "barcode" : "Barcode0",
            "count" : 5,
            "idealCount": 1,
            "name" : "name",
            "timeScanned": 0,
            "warningCount": -1,
            "warningDay":  -1
        }

        // to 
        var product = 
        {
            "Barcode0" :
            {
                "count" : 5,
                "idealCount": 1,
                "name" : "name",
                "timeScanned": 0,
                "warningCount": -1,
                "warningDay":  -1
            }
        }
    }*/
}


const product1 = new Product("product 0", {
    "count" : 5,
    "idealCount": 1,
    "name" : "name",
    "timeScanned": 0,
    "warningCount": -1,
    "warningDay":  -1 
});

//console.log(product1);