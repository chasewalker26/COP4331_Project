class Inventory extends List
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

      html += '<li class="listProduct" id="' + barcode + '" name="inventoryItem" onClick="inventory.editItem()"><span class="material-icons mx-2">edit</span>' + name + ': ' + count + '</li>';
    }

    document.getElementById("inventory").innerHTML = html;
  }
}