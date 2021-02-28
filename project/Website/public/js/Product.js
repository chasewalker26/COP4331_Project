class Product 
{
    constructor(barcode, product){
        this.barcode = barcode;
        this.count = product.count;
        this.idealCount = product.idealCount;
        this.name = product.name;
        this.dayRemoved = product.dayRemoved;
        this.warningDay = product.warningDay;
    }

    // get name() 
    // {
    //     return this.name;
    // }

    // get count() 
    // {
    //     return this.count;
    // }

    // get barcode()
    // {
    //     return this._barcode;
    // }

    // set name(newName) 
    // {
    //     this._name = newName; // validation could be checked here such as only allowing non numerical values
    // }

    // set count(newCount) 
    // {
    //     this._count = newCount;
    // }

    // set barcode(newBarcode)
    // {
    //     this._barcode = newBarcode
    // }

}


