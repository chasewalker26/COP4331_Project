// ALWAYS set false when not testing
var isTesting = true;
var appUser;
var account;
var date;

var userShoppingList;
var userInventory;

if (isTesting == false)
{
    window.onload = async function()
    {
        var page = window.location.pathname;

        // if user is not on login page
        if (page == "/shoppingList.html" || page == "/inventory.html" || page == "/Contact.html")
            appUser = await redirectIfNotFirebaseUser();

        getCurrentDate();
        console.log(date);

        if (await userHasNonEmptyList())
        {
            console.log("List is good");

            if (page == "/shoppingList.html")
                await shoppingListPageInitialize();
            else if (page == "/inventory.html")
                await inventoryPageInitialize();
        }
    }
}

// no test because this uitilizes only tested code or built in js code
async function shoppingListPageInitialize()
{
    await intitializeShoppingList();

    if ($('#shoppingList').html() != "")
    {
        $('#clearShoppingList').show();
        $('#export').show();
    }
}

// no test because this uitilizes only tested code or built in js code
async function inventoryPageInitialize()
{

    if (document.getElementsByClassName("selected").length != 0)
    {
        document.getElementById('clearInventory').classList.add("visible");
    }

    await intitializeInventory();
}

// no test because this uitilizes only tested functions
async function intitializeShoppingList()
{
    userShoppingList = new ShoppingList(appUser.uid);
    await userShoppingList.getProducts();
    userShoppingList.formatList();
}

// no test because this uitilizes only tested functions
async function intitializeInventory()
{
    userInventory = new Inventory(appUser.uid);
    await userInventory.getProducts();
    userInventory.formatList();
}

// No test because only utilizes tested or API code
async function userHasNonEmptyList()
{
    // user has no list
    if (await pullFromFirebase("ProductList/" + appUser.uid) == null)
    {
        console.log("No list exists for this user. Initializing empty list.");

        await saveToFirebase("ProductList/", {[appUser.uid]: "EmptyList"});

        return false;
    }
    // user's list is empty
    else if (await pullFromFirebase("ProductList/" + appUser.uid) == "EmptyList")
    {
        console.log("Empty list for user");

        return false;
    }
    else
        return true;
}

// Uses firebase function to verify firebase user status allows signed
// in user to enter and creates a local user object with their info, or 
// sends them to login (not tested since third-party function from Google)
redirectIfNotFirebaseUser = () => 
{
    return new Promise((resolve) => 
    {
        firebase.auth().onAuthStateChanged(async function(user)
        {
            if (user)
            {
                var currUser = new User(user.displayName, user.email, user.uid);
                console.log(currUser);
                resolve(currUser);
            }
            else
                window.location.replace("index.html");
        });
    })
}

function getCurrentDate()
{
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var year = now.getFullYear().toString().substr(-2);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    date = day.toString() + '/' + year;
}

// function that enables asynchronous fethcing of database data
// (not tested since this is a third-party function from Google)
pullFromFirebase = (datapath) => 
{
    return new Promise((resolve) => 
    {
        firebase.database().ref(datapath).on('value', function(snapshot) 
        {
            const products = snapshot.val();
            resolve(products);
        });
    })
}

// function that enables asynchronous saving of data to databse
// (not tested since this is a third-party function from Google)
saveToFirebase = (datapath, data) =>
{
    return new Promise((resolve) => 
    {
        firebase.database().ref(datapath).update(data);
        resolve();
    })
}

// function that enables asynchronous deleting of data from database
// (deletes the object in the datapath)
// (not tested since this is a third-party function from Google)
deleteFromFirebase = (datapath) =>
{
    return new Promise((resolve) => 
    {
        firebase.database().ref(datapath).set(null);
        resolve();
    })
}

function openNav() {
    if ($(window).width() < 1400)
        document.getElementById("sidenav").style.width = "100%";
    else
        document.getElementById("sidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("sidenav").style.width = "0";
}

$(document).on("click", "#signOut", async function(){
    await appUser.signOut();
});
