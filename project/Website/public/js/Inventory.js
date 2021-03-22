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

      if (name != "" && count != 0)
        html += '<li class="listProduct" id="' + barcode + '" name="inventoryItem"><span class="material-icons mx-2" data-toggle="modal" data-target="#editItemModal" data-backdrop="false">edit</span>'
          + '<span name="crossoutItem">' + name + ': ' + count + '</span></li>'; 
    }

    $("#inventory").html(html);
  }

  async clearSelectedItems()
  {
    var selectedItems = document.getElementsByClassName("selected");

    // console.log(selectedItems[0].parentElement.id);
    
    var products = this.products;
    
    for (var i = 0; i < selectedItems.length; i++)
    {
      for (var j = 0; j < products.length; j++)
      {
        if (products[j].barcode == selectedItems[i].parentElement.id)
        {
          // Found barcode to be deleted
          console.log("barcode to be deleted:");
          console.log(products[j].barcode);
          var barcodeToDelete = products[j].barcode;

          var productToDelete = this.getProduct(barcodeToDelete);

          // Delete product from the database
          await deleteFromFirebase("ProductList/ListID_TEST/" + barcodeToDelete);

          // // Delete product from the UI
          this.products.splice(j, 1);
        }
      }
    }

    return true;
  }

  async editIdealCount(barcode, idealCount)
  {
    if (this.validInput(idealCount) == false)
      return false;

    idealCount = parseInt(idealCount);

    // find the targeted product
    var currentProduct = this.getProduct(barcode);
    currentProduct.idealCount = idealCount;

    // replace the target product to update idealCount 
    this.replaceProduct(barcode, currentProduct);
        
    var JSONProducts = this.formatProductsJSON();
    await this.updateDatabase(JSONProducts);

    return true;
  }

  async editCount(barcode, count)
  {
    if (this.validInput(count) == false)
      return false;

    count = parseInt(count);

    // find the targeted product
    var currentProduct = this.getProduct(barcode);
    currentProduct.count = count;

    // replace the target product to update count 
    this.replaceProduct(barcode, currentProduct);
        
    var JSONProducts = this.formatProductsJSON();
    await this.updateDatabase(JSONProducts);

    return true;
  }

  validInput(input)
  {
    if (input == "")
    {
      this.alertUser("#editItemAlert", "All inputs must be filled!");
      return false;
    }
    
    input = parseInt(input);

    if (isNaN(input))
    {
      this.alertUser("#editItemAlert", "Your input must be a number!");
      return false;
    }
    else if (input <= 0)
    {
      this.alertUser("#editItemAlert", "Your input must be greater than 0!");
      return false;
    }
    else
      return true;
  }
}