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

      html += '<li class="listProduct" id="' + barcode + '" name="inventoryItem"><span class="material-icons mx-2" data-toggle="modal" data-target="#editItemModal" data-backdrop="false">edit</span>' + name + ': ' + count + '</li>';
    }

    document.getElementById("inventory").innerHTML = html;
  }

  async editIdealCount(barcode, idealCount)
  {
    if (this.validEditItemInput(idealCount) == false)
      return false;

    idealCount = parseInt(idealCount);

    var currentProduct = this.getProduct(barcode);
    currentProduct.idealCount = idealCount;

    this.replaceProduct(barcode, currentProduct);
        
    var JSONProducts = this.formatProductsJSON();
    await this.updateDatabase(JSONProducts);

    return true;
  }

  async editCount(barcode, count)
  {
    if (this.validEditItemInput(count) == false)
      return false;

    count = parseInt(count);

    var currentProduct = this.getProduct(barcode);
    currentProduct.count = count;

    this.replaceProduct(barcode, currentProduct);
        
    var JSONProducts = this.formatProductsJSON();
    await this.updateDatabase(JSONProducts);

    return true;
  }

  validEditItemInput(input)
  {
    if (input == "")
    {
      this.editItemAlertUser("All inputs must be filled!")
      return false;
    }
    
    input = parseInt(input);

    if (isNaN(input))
    {
      this.editItemAlertUser("Your input must be a number!")
      return false;
    }
    else if (input <= 0)
    {
      this.editItemAlertUser("Your input must be greater than 0!")
      return false;
    }
    else
      return true;
  }

  editItemAlertUser(alert)
  {
    $("#editItemAlert").html(alert);

    setTimeout(() =>
    {
      $("#editItemAlert").html("");
    }, 2000);
  }
 
}