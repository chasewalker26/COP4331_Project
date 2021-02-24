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
}