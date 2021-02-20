var testing = true;

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
    this.products;
    this.listID = listID;
  }

  async getProducts()
  {
    var listProducts = await pullFromFirebase("ProductList/" +this.listID);

    this.products = listProducts;
  }

  async updateDatabase(products)
  {
    await saveToFirebase("ProductList/" + this.listID, products);
  }
}
