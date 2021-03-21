// 
// This test file contains all tests related to shoppingList.html
// 
if (isTesting == true)
{
    window.onload = async function()
    {
        appUser = await redirectIfNotFirebaseUser(); // runtime function to ensure a user is signed in
        appUser.uid = "ListID_TEST";

        getCurrentDate();
        runTests();

        await shoppingListPageInitialize();
    }
}

async function runTests()
{
    sidenavTest();
    ListTest();
    ProductTest();
    UserTest();
    
    await getProductsWithExistingListIDTest();
    await getProductsWithBadListIDTest();

    await updateDatabaseTest();

    await formatListNonWarningDayItemsTest();
    await formatListWarningDayItemsPastDueTest();
    await formatListWarningDayItemsPreDueTest();
    await formatListVisualTest();

    await clearListTest();

    await formatProductsJSONTest();

    await addItemSuccessTest();
    await addItemItemExistsFailureTest();
    await addItemEmptyStringInputFailureTest();
    await addItemStringForNumberFailureTest();

    await nameItemTest();

    await warningPeriodCheckTest();

    await addPageBreaksForPrintTest();
}

// sidenav resizes as expected when used
function sidenavTest()
{
    document.getElementById("navOpen").click();
    var sidenav = document.getElementById("sidenav");
    
    // check that works on mobile and desktop
    if ($(window).width() < 1400)
        console.assert(sidenav.style.width == "100%", "sidenavTest FAILED");
    else
        console.assert(sidenav.style.width == "250px", "sidenavTest FAILED");

    document.getElementById("navClose").click();
    console.assert(sidenav.style.width == "0px", "sidenavTest FAILED");
}

// // creating a List returns expected object
function ListTest()
{
    var data = false;
    var actualList = new List("ListID_TEST");

    var expectedList =
    {
        "listID" : "ListID_TEST",
        "products" : []
    }

    if (JSON.stringify(actualList) == JSON.stringify(expectedList))
        data = true;

    console.assert(data == true, "ListTest FAILED");
}

// // creating a Product returns expected object
function ProductTest(){
    var data = false;
    var builtProduct = new Product("Barcode0", {
        "count" : 5,
        "idealCount": 1,
        "name" : "name",
        "dayRemoved": -1,
        "warningDay":  -1 
    });

    var expectedProduct =
    {
        "barcode" : "Barcode0",
        "count" : 5,
        "idealCount": 1,
        "name" : "name",
        "dayRemoved": -1,
        "warningDay":  -1
    }
    if (JSON.stringify(builtProduct) == JSON.stringify(expectedProduct))
        data = true;

    console.assert(data == true, "ProductTest FAILED");
}

// creating a User returns expected object
function UserTest()
{
    var data = false;
    var expectedUser = 
    {
        "username": "someName",
        "email": "name@email.com",
        "uid" : "1234asdf"
    }

    var user = new User("someName", "name@email.com", "1234asdf");

    if (JSON.stringify(user) == JSON.stringify(expectedUser))
        data = true;

    console.assert(data == true, "UserTest FAILED");
}

// getProducts returns what is known to be in database
async function getProductsWithExistingListIDTest()
{
    let list = new List("ListID_TEST");
    var data = false;

    var expectedProducts = [];
    var products = await pullFromFirebase("ProductList/ListID_TEST");
    var barcodes = Object.keys(products);

    // create array of expected output
    for (var i = 0; i < barcodes.length; i++)
    {
        var barcode = barcodes[i];
        expectedProducts.push(new Product(barcode, products[barcode]));
    }

    await list.getProducts();

    if (JSON.stringify(list.products) == JSON.stringify(expectedProducts))
        data = true;

    console.assert(data == true, "getProductsTest FAILED");
}

// error message displayed from bad getProducts input should match the expected message
async function getProductsWithBadListIDTest()
{
    var data = false;
    let list = new List("listylisty");
    await list.getProducts();

    if ($("#errorMessage").innerHTML = "There is no list associated with this account. Have you scanned any items?")
        data = true;

    // clean up
    setTimeout(() => {
        $("#errorMessage").hide();
    }, 1000);

    console.assert(data == true, "getProductsTest FAILED");
}

// updateDatabase causes change in database that is verified to be what was
// expected
async function updateDatabaseTest()
{
    var data = false;
    var list = new List('ListID_TEST');
    list.products = await pullFromFirebase("ProductList/ListID_TEST/");
    
    // explicit data to change in DB
    list.products["Barcode3"].count = 10;

    await list.updateDatabase(list.products);

    var dbProducts = await pullFromFirebase("ProductList/ListID_TEST/");

    if (JSON.stringify(list.products) == JSON.stringify(dbProducts))
        data = true;

    console.assert(data == true, "updateDatabaseTest FAILED");

    // repair the test data
    await saveToFirebase("ProductList/ListID_TEST/Barcode3/", {count:3});
}

// shopping list items html elements and data should match as expected from UI
// and known test data in DB;
// This will check the formatList function capability for items that have
// warningDay = -1 and/or dayRemoved = -1
async function formatListNonWarningDayItemsTest()
{
    // build list
    userShoppingList.formatList();

    var expectedElements = '<li class="listProduct" id="Barcode3" name="shoppingListItem">name: 3</li>' + 
                           '<li class="listProduct notFound" id="unrecognized" name="unrecognizedItem" data-toggle="modal" data-target="#addNameModal" data-backdrop="false">unrecognized</li>';

    var siteShoppingListElements = document.getElementById("shoppingList").children;
    var actualElements = "";

    for (var i = 0; i < siteShoppingListElements.length; i++)
        actualElements += siteShoppingListElements[i].outerHTML;
        
    console.assert(expectedElements == actualElements, "formatListNonWarningDayItemsTest() FAILED");
}

// This test verifies that items with warningDay != -1 and dayRemoved != -1
// appear on the list from formatList when dayRemoved is >= warningDay
// days behind current date
async function formatListWarningDayItemsPastDueTest()
{
    var data = false;

    // force date to be more than 5 days behind current date
    await saveToFirebase("ProductList/ListID_TEST/banana/", {dayRemoved:"66/21"});

    // build list
    await userShoppingList.getProducts();
    userShoppingList.formatList();

    // expect a banana as the 2nd element on page due to known test data
    var siteShoppingListElements = document.getElementById("shoppingList").children;
    var expectedElement = '<li class="listProduct" id="banana" name="shoppingListItem">banana: 4</li>';

    if (siteShoppingListElements[1].outerHTML == expectedElement)
        data = true;

    console.assert(data == true, "formatListWarningDayItemsPastDueTest() FAILED");

    data = false;
    
    // expect banana to have these properties after being added to page
    var expectedProduct =
    {
        "count" : 0,
        "dayRemoved": "66/21",
        "idealCount": 4,
        "name" : "banana",
        "warningDay": 5
    }
 
    var actualProduct = await pullFromFirebase("ProductList/ListID_TEST/banana");
    
    if (JSON.stringify(actualProduct) == JSON.stringify(expectedProduct))
        data = true;

    console.assert(data == true, "formatListWarningDayItemsPastDueTest() FAILED");

    // clean up all changed data and rebuild list
    await saveToFirebase("ProductList/ListID_TEST/banana/", {count: 4});
    await saveToFirebase("ProductList/ListID_TEST/banana/", {dayRemoved: -1});
    await userShoppingList.getProducts();
    userShoppingList.formatList();
}

// This test verifies that items with warningDay != -1 and dayRemoved != -1
// DO NOT appear on the list from formatList when dayRemoved is < warningDay
// days behind current date
async function formatListWarningDayItemsPreDueTest()
{
    var data = false;
    
    // edit current day of year to be 2 days less than curren day
    // to check that the 5 day period is not met and function works
    date = date.split('/');
    date = (parseInt(date[0]) - 2) + '/' + date[1];

    await saveToFirebase("ProductList/ListID_TEST/banana/", {dayRemoved: date});

    // build list
    await userShoppingList.getProducts();
    userShoppingList.formatList();

    var expectedElements = '<li class="listProduct" id="Barcode3" name="shoppingListItem">name: 3</li>' + 
                           '<li class="listProduct notFound" id="unrecognized" name="unrecognizedItem" data-toggle="modal" data-target="#addNameModal" data-backdrop="false">unrecognized</li>';

    var siteShoppingListElements = document.getElementById("shoppingList").children;
    var actualElements = "";

    for (var i = 0; i < siteShoppingListElements.length; i++)
        actualElements += siteShoppingListElements[i].outerHTML;
        
    console.assert(expectedElements == actualElements, "formatListWarningDayItemsPreDueTest() FAILED");

    data = false;
   
    // verify product has not changed
    var expectedProduct =
    {
        "count" : 4,
        "dayRemoved": date,
        "idealCount": 4,
        "name" : "banana",
        "warningDay": 5
    }
 
    var actualProduct = await pullFromFirebase("ProductList/ListID_TEST/banana");
    
    if (JSON.stringify(actualProduct) == JSON.stringify(expectedProduct))
        data = true;

    console.assert(data == true, "formatListWarningDayItemsPreDueTest() FAILED");

    // clean up all changed data and rebuild list
    getCurrentDate();
    await saveToFirebase("ProductList/ListID_TEST/banana/", {count: 4});
    await saveToFirebase("ProductList/ListID_TEST/banana/", {dayRemoved: -1});
    await userShoppingList.getProducts();
    userShoppingList.formatList();
}

// shopping list items should have correct styling as per UI diagrams
async function formatListVisualTest()
{
    // build list
    userShoppingList.formatList();

    var siteListElements = document.getElementsByClassName("listProduct");

    // check if the name: count formatting is right
    var style = getComputedStyle(siteListElements[0]);
    var color = style.color;
    var FF = style.fontFamily;
    var FSize = style.fontSize;
    var FStyle = style.fontStyle;
    var FW = style.fontWeight;

    console.assert(color == "rgba(89, 139, 196, 0.81)", "formatListVisualTest FAILED");
    console.assert(FF == '"Lucida Bright", Georgia, serif', "formatListVisualTest FAILED");
    console.assert(FSize == "30px", "formatListVisualTest FAILED");
    console.assert(FStyle == "normal", "formatListVisualTest FAILED");
    console.assert(FW == "700", "formatListVisualTest FAILED");

    // check if the unrecognized item formatting is right
    var style = getComputedStyle(siteListElements[1]);
    var color = style.color;

    console.assert(color == "rgba(251, 87, 87, 0.81)", "formatListVisualTest FAILED");
}

// clear list should leave the shopping list empty and correctly update databse
async function clearListTest()
{
    // name unamed item since it will only not reappear when named
    document.getElementById("addName").value = "water";
    document.getElementById("addCount").value = 2;
    await userShoppingList.nameItem("unrecognized");

    userShoppingList.clearList();

    // expected resulting data
    var Barcode3 = await pullFromFirebase("ProductList/ListID_TEST/Barcode3/");
    var banana = await pullFromFirebase("ProductList/ListID_TEST/banana/");
    var siteListElements = document.getElementsByClassName("listProduct");
    var htmlCorrect = (siteListElements[0].outerHTML == '<li class="listProduct">Congratulations! Your list is empty!</li>');

    console.assert(Barcode3.count == 6, "clearListTest() FAILED");
    console.assert(banana.dayRemoved == date, "clearListTest() FAILED");
    console.assert(htmlCorrect, "clearListTest() FAILED");

    // clean up all changed data and rebuild list
    await saveToFirebase("ProductList/ListID_TEST/Barcode3/", {count: 3});
    await saveToFirebase("ProductList/ListID_TEST/unrecognized/", {count: 0});
    await saveToFirebase("ProductList/ListID_TEST/banana/", {dayRemoved: -1});
    await saveToFirebase("ProductList/ListID_TEST/unrecognized/", {name:""});
    await saveToFirebase("ProductList/ListID_TEST/unrecognized/", {idealCount:1});
    await userShoppingList.getProducts();
    userShoppingList.formatList();
}

// formatProductsJSON should create the correct database JSON format from the list's products array
async function formatProductsJSONTest()
{
    var data = false;

    var JSONproducts = userShoppingList.formatProductsJSON();

    var dbProducts = await pullFromFirebase("ProductList/ListID_TEST/");

    if (JSON.stringify(JSONproducts) == JSON.stringify(dbProducts))
        data = true;
    
    console.assert(data == true, "formatProductsJSONTest FAILED");
}

// Successfully add a mango to the database
async function addItemSuccessTest()
{
    var data = false;

    // addItem data
    document.getElementById("addItemName").value = "mango";
    document.getElementById("addItemCount").value = 2;
    document.getElementById("addWarningDay").value = 5;

    await userShoppingList.addItem();

    // what should be in DB
    var expectedProduct =
    {
        "count" : 0,
        "dayRemoved": -1,
        "idealCount": 2,
        "name" : "mango",
        "warningDay":  5
    }

    var actualProduct = await pullFromFirebase("ProductList/ListID_TEST/mango");
    
    if (JSON.stringify(actualProduct) == JSON.stringify(expectedProduct))
        data = true;

    console.assert(data == true, "addItemSuccessTest() FAILED");

    // clean up
    document.getElementById("addItemForm").reset();
}

// correct error message appears when item being added already exists
// mango left in DB after last test, so should not be allowed
async function addItemItemExistsFailureTest()
{
    var data = false;

    // addItem data
    document.getElementById("addItemName").value = "mango";
    document.getElementById("addItemCount").value = 3;
    document.getElementById("addWarningDay").value = 5;

    await userShoppingList.addItem();

    // ensure error appears
    if ($("#addItemAlert")[0].innerHTML == "This item already exists")
        data = true;
    
    console.assert(data == true, "addItemItemExistsFailureTest() FAILED");

    // clean up all changed data
    await saveToFirebase("ProductList/ListID_TEST/", {mango: null});
    await userShoppingList.getProducts();
    userShoppingList.formatList();
    document.getElementById("addItemForm").reset();
}

// correct error message appears when addItem gets an empty input
async function addItemEmptyStringInputFailureTest()
{
    var data = false;

    // addItem data
    document.getElementById("addItemName").value = "";
    document.getElementById("addItemCount").value = 3;
    document.getElementById("addWarningDay").value = 5;

    await userShoppingList.addItem();

    // alert for name = ""
    if ($("#addItemAlert")[0].innerHTML == "Please check your input, empty name, count, and warning period must be filled")
        data = true;
    
    console.assert(data == true, "addItemBadInputFailureTest() FAILED");

    document.getElementById("addItemForm").reset();
}

// correct error message appears when addItem gets a string in a number field
async function addItemStringForNumberFailureTest()
{
    var data = false;

    // addItem data
    document.getElementById("addItemName").value = "mango";
    document.getElementById("addItemCount").value = "qwe";
    document.getElementById("addWarningDay").value = "rtwry";

    await userShoppingList.addItem();

    // alert for string for warning or count
    if ($("#addItemAlert")[0].innerHTML == "Please check your input, count and warning period must be numbers")
        data = true;
    
    console.assert(data == true, "addItemStringForNumberFailureTest() FAILED");

    document.getElementById("addItemForm").reset();
}

// nameItem saves renamed products correctly
async function nameItemTest()
{
    var data = false;
    // build list

    // nameItem data
    document.getElementById("addName").value = "water";
    document.getElementById("addCount").value = 2;

    await userShoppingList.nameItem("unrecognized");

    // expected result
    var expectedProduct =
    {
        "count" : 0,
        "dayRemoved": -1,
        "idealCount": 2,
        "name" : "water",
        "warningDay":  -1 
    }
 
    var actualProduct = await pullFromFirebase("ProductList/ListID_TEST/unrecognized");
    
    if (JSON.stringify(actualProduct) == JSON.stringify(expectedProduct))
        data = true;

    console.assert(data == true, "nameItemTest() FAILED");

    // clean up all changed data and rebuild list
    await saveToFirebase("ProductList/ListID_TEST/unrecognized/", {name:""});
    await saveToFirebase("ProductList/ListID_TEST/unrecognized/", {idealCount:1});
    await userShoppingList.getProducts();
    userShoppingList.formatList();
    document.getElementById("addNameForm").reset();
}

//tests warning day function 
async function warningPeriodCheckTest() {
    var removeDate = "66/21";
    var failWarningDays = 100;
    var passWarningDays = 3;

    var response = userShoppingList.warningPeriodCheck(removeDate, failWarningDays);

    console.assert(response == false, "warningCheckTest() FAILED");

    response = null;

    response = userShoppingList.warningPeriodCheck(removeDate, passWarningDays);
    console.assert(response == true, "warningCheckTest() FAILED");
}

// checks that page break is added every 19 items
async function addPageBreaksForPrintTest()
{
    $("#shoppingList").html("");

    for (var i = 0; i < 90; i++)
        $("#shoppingList").append("<li class='listProduct'>Item" + i + "</li>");

    await addPageBreaksForPrint();

    var siteListElements = document.getElementsByClassName("listProduct");
    
    // check that every 18 items starting at 18 excluding EoL item (item89)
    // have page break class
    for (var i = 17; i < 89; i += 18)
    {
        var pageBreakLi = '<li class="listProduct html2pdf__page-break">Item' + i + '</li>';
        console.assert(siteListElements[i].outerHTML == pageBreakLi, "addPageBreaksForPrintTest() FAILED");
    }

    userShoppingList.formatList();
}