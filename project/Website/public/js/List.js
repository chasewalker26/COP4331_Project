class List
{
  constructor(listID)
  {
    this.listID = listID;
    this.products = [];
  }
  
  async getProducts()
  {
    this.products = [];

    var dbProducts = await pullFromFirebase("ProductList/" + this.listID);

    if (dbProducts == null)
    {
      await buildListIfEmpty();
      return;
    }

    if (dbProducts == "EmptyList")
      return;
    
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

  replaceProduct(newProductBarcode, newProduct)
  {
    for (var i = 0; i < this.products.length; i++)
    {
      if (this.products[i].barcode == newProductBarcode)
        this.products[i] = newProduct;
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

  alertUser(location, alert)
  {
    $(location).html(alert);

    setTimeout(() =>
    {
      $(location).html("");
    }, 3000);
  }
}
