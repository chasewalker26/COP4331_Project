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
    this.products =
    {
        "Barcode0" :
        {
            "count" : 47,
            "idealCount": 1,
            "name" : "name",
            "timeScanned": 0,
            "warningCount": -1,
            "warningDay":  -1
        },
        "Barcode1" : 
        {
            "count" : 7,
            "idealCount": 1,
            "name" : "name",
            "timeScanned": 0,
            "warningCount": -1,
            "warningDay":  -1
        }
    };

    this.listID = listID;
  }

  async updateDatabase(products)
  {
    await saveToFirebase("ProductList/" + this.listID, products);
  }
}
