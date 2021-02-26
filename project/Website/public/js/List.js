class List
{
  constructor(listID)
  {
    this.listID = listID;
    this.products = [];
  }
  
  async getProducts()
  {
    var dbProducts = await pullFromFirebase("ProductList/" + this.listID + "/").catch((error) => {
      console.log(error);
      alert("There is no list associated with this account. Have you scanned any items?");
    });
    var barcodes = Object.keys(dbProducts);

    for (var i = 0; i < barcodes.length; i++)
    {
       this.products.push(new Product(barcodes[i], dbProducts[barcodes[i]]));
    }
  }

  async updateDatabase(products)
  {
    await saveToFirebase("ProductList/" + this.listID + "/", products);
  }
}
