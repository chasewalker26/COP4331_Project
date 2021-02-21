

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
    getProduct(barcode){
        
    }
}


const product1 = new Product(123,2,4,"bannas","10:32",4,3);
const product2 = new Product(1234,42,44,"apples","10:35",8,2);

//console.log(product1);