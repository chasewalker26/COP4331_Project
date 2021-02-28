
// Open-close popup
function togglePopup() {
  document.getElementById("popup-1").classList.toggle("active");
  console.log("popup open/close")
  return false
}

let list1 = new List("ListID");


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


  // static getListFromFirebase = async () => 
  // {
  //   let products = pullFromFirebase("ProductList/ListID/");

  //   products.then(data => {
  //     let table = document.getElementsByTagName('table')[0]
  //     Object.entries(data).forEach(([key, value]) => {
  //       let newRow = table.insertRow(table.rows.length)

  //       let cell1 = newRow.insertCell(0)
  //       let cell2 = newRow.insertCell(1)


  //       cell1.innerHTML = value.name;
  //       cell2.innerHTML = value.count;
  //     });

  //   }).catch(err => {
  //     console.log(err)
  //   })

  // }

  addItem() 
  {
    console.log("lol");
    let prodName = document.getElementById('prodName').value;
    let prodQuantity = document.getElementById('prodQuantity').value;

    let product = new Product("Barcode777", {
      "count" : prodQuantity,
      "idealCount": 1,
      "name" : prodName,
      "timeScanned": 0,
      "warningDay":  -1 
    });

    this.products.push(product);

    var JSONProducts = this.formatProductsJSON();

    console.log(JSONProducts);
    return;

    this.updateDatabase(JSONProducts);

    let table = document.getElementsByTagName('table')[0];
    let newRow = table.insertRow(table.rows.length);

    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);

    cell1.innerHTML = prodName;
    cell2.innerHTML = prodQuantity;

    // this.products.push(new Product(0, ));

    document.getElementById("add-form").reset();

    // Close popup 
    return togglePopup();
  }
}

window.onload = async function () 
{
  await ShoppingList.getListFromFirebase();
}
