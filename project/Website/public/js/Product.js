class Product{
    constructor(barcode, product){
        this.barcode = barcode;
        this.count = product.count;
        this.idealCount = product.idealCount;
        this.name = product.name;
        this.dayRemoved = product.dayRemoved;
        this.warningDay = product.warningDay;
    }
}