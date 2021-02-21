var testing = false;

if (testing == true)
{
  module.exports = buildList;

  function buildList(listID)
  {
    var list = new List(listID);

    return list;
  }
}

class List
{
  constructor(listID)
  {
    this.listID = listID;
    this.products = [];
  }
  
  async getProducts()
  {
    var dbProducts = await pullFromFirebase("ProductList/" + this.listID + "/");
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
