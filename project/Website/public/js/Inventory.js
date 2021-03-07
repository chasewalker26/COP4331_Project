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

      if (name)
      {
        html += '<li class="listProduct" id="' + barcode + '" name="inventoryItem" onClick="inventory.editItem()"><span class="material-icons mx-2">edit</span>' + name + ': ' + count + '</li>';
      }
      else
      {
        html += '<li class="notFound"><div class="notFound" data-toggle = "modal" data-target = #myModal>' + barcode + ' </div> </li>';
      }
    }

    document.getElementById("inventory").innerHTML = html;
  }

  nameItem()
  {
    var name; 
    var count; 
    this.products.name = name;
    this.products.count = count;
  }
}