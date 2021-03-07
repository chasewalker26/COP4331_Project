class ShoppingList extends List {
  constructor(listID) {
    super(listID);
  }

  formatList() 
  {
    var products = this.products;
    var html = "";

    for (var i = 0; i < products.length; i++) {
      var barcode = products[i].barcode;
      var name = products[i].name;
      var count = products[i].count;
      var idealCount = products[i].idealCount;
      var countToBuy = idealCount - count;

      if (count < idealCount)
        html += '<li class="listProduct" id="' + barcode + '" name="shoppingListItem">' + name + ': ' + countToBuy + '</li>'
    }

    document.getElementById("shoppingList").innerHTML = html;
  }
 
  
  clearList()
  {
    var products = this.products;

    for (var i = 0; i < products.length; i++)
    {
      var count = products[i].count;
      var idealCount = products[i].idealCount;
      var countToBuy = idealCount - count;

      if (count < idealCount)
      {
        var newCount = countToBuy + count;
        products[i].count = newCount; 
      }
    }
    var JSONProducts = this.formatProductsJSON();
    this.updateDatabase(JSONProducts);

    $("#shoppingList").html("");

  }

  async addItem() 
  {
    var name = document.getElementById('addItemName').value;
    var count = document.getElementById('addItemCount').value;
    
    if (this.validAddItemInput(name, count) == false)
      return false;

    if ((this.productExistsError(name)) == false)
    {
      let product = new Product(name, {
        "count" : 0,
        "idealCount": parseInt(count),
        "name" : name,
        "dayRemoved": -1,
        "warningDay":  -1 
      });
  
      this.products.push(product);
  
      var JSONProducts = this.formatProductsJSON();
  
      await this.updateDatabase(JSONProducts);

      return true;
    }

    return false;
  }

  validAddItemInput(name, count)
  {
    if (name.length == 0 || count == "")
    {
      $("#addItemAlert").html("Please check your input, empty name or count detected");

      setTimeout(() =>
      {
        $("#addItemAlert").html("");
      }, 2000);

      return false;
    }
    else
    {
      return true;
    }
  }

  productExistsError(name)
  {
    var products = this.products;

    for (var i = 0; i < products.length; i++)
    {
      if (products[i].name.toLowerCase().replace(/\s+/g, "") == name.toLowerCase().replace(/\s+/g, ""))
      {
        $("#addItemAlert").html("This item already exists");

        setTimeout(() =>
        {
          $("#addItemAlert").html("");
        }, 2000);

        return true;
      }
    }

    return false;
  }

}