// 
// This test file contains all tests related to inventory.html
// 
if (isTesting == true)
{
    window.onload = async function()
    {
        await redirectIfNotFirebaseUser(); // runtime function to ensure a user is signed in
        runTests();
    }
}

// Uses firebase function to verify firebase user status
async function redirectIfNotFirebaseUser()
{
    await firebase.auth().onAuthStateChanged(function(user)
    {
        if (user)
            initializeAppUser();
        else
            window.location.replace("LoginForm.html");
    });
}

// Uses data from firebase function to create a User
function initializeAppUser()
{
    var user = firebase.auth().currentUser;
    appUser = new User(user.displayName, user.email, user.uid);
    console.log(appUser);
}

function runTests()
{
    formatListFunctionalTest();
    sidenavTest();
    formatListVisualTest();
}

async function sidenavTest()
{
    document.getElementById("navOpen").click();
    var sidenav = document.getElementById("sidenav");
    console.assert(sidenav.style.width == "250px", "sidenavTest FAILED");

    document.getElementById("navClose").click();
    console.assert(sidenav.style.width == "0px", "sidenavTest FAILED");
}


// in Inventory.js
async function formatListFunctionalTest()
{
    let inventory = new Inventory("ListID_TEST");

    await inventory.getProducts();

    inventory.formatList();

    // change expectedElements
    var expectedElements = '<li class="listProduct" id="Barcode0" name="inventoryItem" onclick="inventory.editItem()"><span class="material-icons mx-2">edit</span>name: 6</li>' + 
                           '<li class="listProduct" id="Barcode1" name="inventoryItem" onclick="inventory.editItem()"><span class="material-icons mx-2">edit</span>name: 8</li>' +
                           '<li class="listProduct" id="Barcode3" name="inventoryItem" onclick="inventory.editItem()"><span class="material-icons mx-2">edit</span>name: 3</li>';

    var siteInventoryElements = document.getElementById("inventory").children;
    var actualElements = "";

    for (var i = 0; i < siteInventoryElements.length; i++)
        actualElements += siteInventoryElements[i].outerHTML;

    console.assert(expectedElements == actualElements, "Inventory.formatListTest() FAILED");


}

// in Inventory.js
async function formatListVisualTest()
{
    let inventory = new Inventory("ListID_TEST");
    await inventory.getProducts();
    inventory.formatList();

    var siteInventoryElements = document.getElementsByClassName("listProduct");

    for (var i = 0; i < siteInventoryElements.length; i++)
    {
        var style = getComputedStyle(siteInventoryElements[i]);
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
    }
}


