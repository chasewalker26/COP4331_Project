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

    // no items to show
    if (html == "")
      html = '<li class="listProduct">You do not have any items in your inventory yet!</li>';

    $("#inventory").html(html);
  }

  async clearSelectedItems()
  {
    var inventoryItems = document.getElementsByClassName("listProduct");
    var currProducts = this.formatProductsJSON();
    
    for (var i = 0; i < inventoryItems.length; i++)
      // current item is selected, found barcode to be deleted, set its respective product to null
      if ($(inventoryItems[i].children[1]).hasClass("selected"))
        currProducts[inventoryItems[i].id] = null;

    var newProducts = currProducts;

    // Deletes all null products from the database
    await saveToFirebase("ProductList/" + this.listID, newProducts);

    $('#clearInventory').hide();
  }

  async editIdealCount(barcode, idealCount)
  {
    if (this.validInput(idealCount, 1) == false)
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
    if (this.validInput(count, 0) == false)
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

  validInput(input, minimum)
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
    else if (input < minimum)
    {
      this.alertUser("#editItemAlert", "Your input must be greater than 0!");
      return false;
    }
    else
      return true;
  }
}