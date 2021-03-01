
// Open-close popup
function togglePopup() {
  document.getElementById("popup-1").classList.toggle("active");
  document.getElementById("add-form").reset();
  console.log("popup open/close")
}

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

  }

  async addItem() 
  {
    console.log("lol");
    let prodName = document.getElementById('prodName').value;
    let prodQuantity = document.getElementById('prodQuantity').value;

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

    document.getElementById("add-form").reset();
    // return togglePopup();
    // console.log(JSONProducts);

    this.updateDatabase(JSONProducts);
  }
}