class Product{
    constructor(barcode, product){
        this.barcode = barcode;
        this.count = product.count;
        this.idealCount = product.idealCount;
        this.name = product.name;
        this.dayRemoved = product.dayRemoved;
        this.warningDay = product.warningDay;
    }

    formatProductJSON()
    {
        var formattedProduct = {
            "count": this.count,
            "dayRemoved": this.dayRemoved,
            "idealCount": this.idealCount,
            "name": this.name,
            "warningDay": this.warningDay
        }

        return formattedProduct;
    }
}