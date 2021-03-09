class List
{
  constructor(listID)
  {
    this.listID = listID;
    this.products = [];
  }
  
  async getProducts()
  {
    var dbProducts = await pullFromFirebase("ProductList/" + this.listID);

    if (dbProducts == null)
    {
      $("#errorMessage").append("There is no list associated with this account. Have you scanned any items?");
      return;
    }

    var barcodes = Object.keys(dbProducts);

    for (var i = 0; i < barcodes.length; i++)
    {
       this.products.push(new Product(barcodes[i], dbProducts[barcodes[i]]));
    }
  }

  getProduct(barcode)
  {
    for (var i = 0; i < this.products.length; i++)
    {
      if (this.products[i].barcode == barcode)
        return this.products[i];
    }
  }


  async updateDatabase(products)
  { 
    await saveToFirebase("ProductList/" + this.listID + "/", products);
  }

  formatProductsJSON()
  {
    var currProducts = this.products;
    var formattedProducts = {};

    for (var i = 0; i < currProducts.length; i++)
    {
      var currProduct = currProducts[i];
      var barcode = currProduct.barcode;

      formattedProducts[barcode] = currProduct.formatProductJSON();
    }

    return formattedProducts;
  }
}
