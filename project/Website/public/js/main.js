// ALWAYS set false when not testing
var isTesting = true;
var appUser;
var account;


if (isTesting == false)
{
    window.onload = async function()
    {
        var page = window.location.pathname;

        if (page == "/shoppingList.html" || page == "/inventory.html")
        {
            await redirectIfNotFirebaseUser();
        }
    }
}

// Uses firebase function to verify firebase user status allows
// signed in user to enter and creates a local user object, or 
// sends them to login (not tested since third-party function from Google)
async function redirectIfNotFirebaseUser()
{
    await firebase.auth().onAuthStateChanged(async function(user)
    {
        if (user)
            await initializeAppUser();
        else
            window.location.replace("index.html");
    });
}

// Uses data from firebase function to create a User object
// (not explicitly tested as User() is tested and other function
// is a third-party function from Google)
async function initializeAppUser()
{
    var user = await firebase.auth().currentUser;
    appUser = new User(user.displayName, user.email, user.uid);
    console.log(appUser);
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

function openNav() {
    document.getElementById("sidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("sidenav").style.width = "0";
}

$(document).on("click", "#signOut", async function(){
    await appUser.signOut();
});
