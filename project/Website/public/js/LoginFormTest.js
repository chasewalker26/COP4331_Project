
if (isTesting == true)
{
    window.onload = function()
    {
        signOutTest();
    }
}
async function signOutTest(){
    var newUserTest = new User();
    var user1 = firebase.auth().currentUser;
    if (user) {
    // User is signed in.
    console.log("singed in");
    //rederict to shopping list
    } 
    else {
    // No user is signed in.
    console.log("not signed in");
    //redirect to sign in page
    }
    await newUserTest.signOut();
    //console.log(user);
    
    var user = firebase.auth().currentUser;
    if (user) {
    // User is signed in.
    console.log("singed in");
    } 
    else {
    // No user is signed in.
    console.log("not signed in");
    }
}