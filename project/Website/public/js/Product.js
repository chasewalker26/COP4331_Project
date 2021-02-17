

class Product{
    constructor(barcode,count,idealCount,name,timeScanned,warningCount,warningDay){
        this.barcode = barcode;
        this.count = count;
        this.idealCount = idealCount;
        this.name = name;
        this.timeScanned = timeScanned;
        this.warningCount = warningCount;
        this.warningDay = warningDay;
        
        
    }
    getProduct(barcode){

    }

}


const product1 = new Product(123,2,4,"bannas","10:32",4,3);
const product2 = new Product(1234,42,44,"apples","10:35",8,2);

//console.log(product1);