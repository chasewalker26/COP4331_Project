class ShoppingList extends List
{
  constructor(listID)
  {
    super(listID);
  }

  formatList()
  {
    var products = this.products;
    var html = "";

    for (var i = 0; i < products.length; i++)
    {
      var barcode = products[i].barcode;
      var name = products[i].name;
      var count = products[i].count;
      var idealCount = products[i].idealCount;
      var countToBuy = idealCount - count;

      if (count < idealCount)
        html += '<li class="listProduct" id="' + barcode + '" name="shoppingListItem">' + name + ': ' + countToBuy + '</li>'
    }

    return html;
  }
}