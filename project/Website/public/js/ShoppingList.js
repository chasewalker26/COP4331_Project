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

      if (name == "")
      {
        html += '<li class="listProduct notFound" id="' + barcode + '" name="unrecognizedItem" data-toggle="modal" data-target="#addNameModal" data-backdrop="false">' + barcode + '</li>';
      }
      else if (count < idealCount)
      {
        html += '<li class="listProduct" id="' + barcode + '" name="shoppingListItem">' + name + ': ' + countToBuy + '</li>';
      }
    }

    $("#shoppingList").html(html);
  }
 
  
  clearList()
  {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var year = now.getFullYear().toString().substr(-2);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    var date = day.toString() + '/' + year;
    console.log(date);
    var products = this.products;

    for (var i = 0; i < products.length; i++)
    {
      var warning = products[i].warningDay;
      var count = products[i].count;
      var idealCount = products[i].idealCount;
      var countToBuy = idealCount - count;
      var dayRemoved = products[i].dayRemoved;

      if (count < idealCount)
      {
        var newCount = countToBuy + count;
        products[i].count = newCount; 
      }
      if(warning != -1){
        dayRemoved = date;
        products[i].dayRemoved = dayRemoved;
        console.log(dayRemoved);
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
    var warning = document.getElementById('addWarningDay').value;
    
    if (this.validAddItemInput(name, count, "#addItemAlert") == false)
      return false;

    if ((this.productExistsError(name)) == false)
    {
      let product = new Product(name, {
        "count" : 0,
        "idealCount": parseInt(count),
        "name" : name,
        "dayRemoved": -1,
        "warningDay":  warning
      });
  
      this.products.push(product);
  
      var JSONProducts = this.formatProductsJSON();
  
      await this.updateDatabase(JSONProducts);

      return true;
    }

    return false;
  }

  validAddItemInput(name, count, location)
  {
    if (name.length == 0 || count == "")
    {
      this.alertUser(location, "Please check your input, empty name or count detected");
      
      return false;
    }
    else
     return true;
  }
  
  async nameItem(barcode) 
  {
    var name = document.getElementById('addName').value;
    var count = document.getElementById('addCount').value;
    
    if (this.validAddItemInput(name, count, "#addNameAlert") == false)
      return false;

    let product = new Product(barcode, {
      "count" : 0,
      "idealCount": parseInt(count),
      "name" : name,
      "dayRemoved": -1,
      "warningDay":  -1 
    });
  
    this.replaceProduct(barcode, product);
  
    var JSONProducts = this.formatProductsJSON();
  
    await this.updateDatabase(JSONProducts);

    return true;
  }

  productExistsError(name)
  {
    var products = this.products;

    for (var i = 0; i < products.length; i++)
    {
      if (products[i].name.toLowerCase().replace(/\s+/g, "") == name.toLowerCase().replace(/\s+/g, ""))
      {
        this.alertUser("#addItemAlert", "This item already exists");

        return true;
      }
    }

    return false;
  }

}