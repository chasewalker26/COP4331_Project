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
    let prodName = document.getElementById('prodName').value;
    let prodQuantity = document.getElementById('prodQuantity').value;

    // If product doesn't exist
    if ((this.isProductExists(prodName)) == false)
    {
      let product = new Product(prodName, {
        "count" : prodQuantity,
        "idealCount": 10,
        "name" : prodName,
        "dayRemoved": -1,
        "warningDay":  -1 
      });
  
      this.products.push(product);
  
      var JSONProducts = this.formatProductsJSON();
  
      // this.updateDatabase(JSONProducts);
  
      // document.getElementById("add-form").reset();
      // return togglePopup();
      // console.log(JSONProducts);
  
      this.updateDatabase(JSONProducts);
    }
    // If product exists
    else
    {
      alert(prodName + " already exists in the database");
    }
  }

  isProductExists(prodName)
  {
    var products = this.products;
    for (var i = 0; i < products.length; i++)
    {
      if (products[i].name.toLowerCase().replace(/\s+/g, "") == prodName.toLowerCase().replace(/\s+/g, ""))
      {
        console.log("SUKA: " + prodName + " " + products[i].name);
        return true;
      }
    }
    return false;
  }
}