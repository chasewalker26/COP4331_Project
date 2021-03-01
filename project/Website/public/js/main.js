// ALWAYS set false when not testing
var isTesting = true;

var appUser;

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

// function that enables asynchronous fethcing of database data
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
