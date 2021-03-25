class ShoppingList extends List {
  constructor(listID) {
    super(listID);
  }

  async formatList() 
  {
    var products = this.products;
    var html = "";

    for (var i = 0; i < products.length; i++) {
      var barcode = products[i].barcode;
      var name = products[i].name;
      var count = products[i].count;
      var idealCount = products[i].idealCount;
      var countToBuy = idealCount - count;
      var removeDay = products[i].dayRemoved;
      var warningDay = products[i].warningDay;

      if (name == "")
      {
        html += '<li class="listProduct notFound" id="' + barcode + '" name="unrecognizedItem" data-toggle="modal" data-target="#addNameModal" data-backdrop="false">' + barcode + '</li>';
      }
      else if (count < idealCount)
      {
        html += '<li class="listProduct" id="' + barcode + '" name="shoppingListItem">' + name + ': ' + countToBuy + '</li>';
      }
      else if (removeDay != -1)
      {
        if (this.warningPeriodCheck(removeDay, warningDay))
        {
         if (count != 0)
         {
            products[i].count = 0;

            var JSONProducts = this.formatProductsJSON();
            this.updateDatabase(JSONProducts);
          }
          html += '<li class="listProduct" id="' + barcode + '" name="shoppingListItem">' + name + ': ' + idealCount + '</li>';
        }
      }
    }

    // no items to show
    if (html == "")
      html = '<li class="listProduct">Congratulations! Your list is empty!</li>';

    $("#shoppingList").html(html);

    if ($("#shoppingList").html() != '<li class="listProduct">Congratulations! Your list is empty!</li>')
    {
        $('#clearShoppingList').show();
        $('#export').show();
    }
    else
    {
      $('#clearShoppingList').hide();
      $('#export').hide();
    }
  }
  
  clearList()
  {
    var products = this.products;

    for (var i = 0; i < products.length; i++)
    {
      var warningDay = products[i].warningDay;
      var count = products[i].count;
      var idealCount = products[i].idealCount;
      var countToBuy = idealCount - count;
      var dayRemoved = products[i].dayRemoved;

      if (count < idealCount)
      {
        var newCount = countToBuy + count;
        products[i].count = newCount; 
      }
      
      if (warningDay != -1){
        dayRemoved = date;
        products[i].dayRemoved = dayRemoved;
      }
    }

    var JSONProducts = this.formatProductsJSON();
    this.updateDatabase(JSONProducts);
  }

  async addItem() 
  {
    // get data
    var name = document.getElementById('addItemName').value;
    var count = document.getElementById('addItemCount').value;
    var warningDay = document.getElementById('addWarningDay').value;
    
    if (this.validAddItemInput(name, count, warningDay, "#addItemAlert") == false)
      return false;

    if ((this.productExistsError(name)) == false)
    {
      let product = new Product(name, {
        "count" : 0,
        "idealCount": parseInt(count),
        "name" : name,
        "dayRemoved": -1,
        "warningDay":  parseInt(warningDay)
      });
  
      this.products.push(product);
  
      var JSONProducts = this.formatProductsJSON();
      await this.updateDatabase(JSONProducts);

      return true;
    }

    return false;
  }

  validAddItemInput(name, count, warningDay, location)
  {
    if (name.length == 0 || count.length == 0 || warningDay.length == 0)
    {
      this.alertUser(location, "Please check your input, name, count, and warning period must be filled");
      return false;
    }
   
    count = parseInt(count);
    warningDay = parseInt(warningDay);
    
    if (isNaN(count) || isNaN(warningDay))
    {
      this.alertUser(location, "Please check your input, count and warning period must be numbers");
      return false;
    }

    if (count <= 0 || warningDay <= 0)
    {
      this.alertUser(location, "Please check your input, count and warning period must be greater than 0");
      return false;
    }
    

    return true;
  }
  
  async nameItem(barcode) 
  {
    // get data
    var name = document.getElementById('addName').value;
    var count = document.getElementById('addCount').value;
    
    if (this.validNametemInput(name, count, "#addNameAlert") == false)
      return false;

    let product = new Product(barcode, {
      "count" : 0,
      "idealCount": parseInt(count),
      "name" : name,
      "dayRemoved": -1,
      "warningDay":  -1 
    });

    // replace product in products
    this.replaceProduct(barcode, product);
  
    var JSONProducts = this.formatProductsJSON();
    await this.updateDatabase(JSONProducts);

    return true;
  }

  validNametemInput(name, count, location)
  {
    count = parseInt(count);

    if (name.length == 0)
    {
      this.alertUser(location, "Please check your input, empty name, count, and warning period must be filled");
      return false;
    }
    else if (isNaN(count))
    {
      this.alertUser(location, "Please check your input, count and warning period must be numbers");
      return false;
    }
    else
      return true;
  }

  productExistsError(name)
  {
    if (this.products == null)
      return false;

    var products = this.products;

    for (var i = 0; i < products.length; i++)
    {
      if (products[i].name.toLowerCase().replace(/\s/g, "") == name.toLowerCase().replace(/\s/g, ""))
      {
        this.alertUser("#addItemAlert", "This item already exists");

        return true;
      }
    }

    return false;
  }

  warningPeriodCheck(removeDay, warningDay)
  {
    removeDay = removeDay.split("/");
    var warnDate = parseInt(removeDay[0]) + warningDay;

    var curr = date.split("/");
    var today = parseInt(curr[0]);

    if (today >= warnDate)
      return true;
    
    return false;
  }
  
}