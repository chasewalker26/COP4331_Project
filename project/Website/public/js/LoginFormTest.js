
if (isTesting == true)
{
    // window.onload = function()
    // {
    //     signOutTest();
    // }
}
async function signOutTest(){
    var newUserTest = new User();
    var user1 = firebase.auth().currentUser;

    await newUserTest.signOut();
    
    if (user1) {
    // User is signed in.
    console.log("singed in");
    } 
    else {
    // No user is signed in.
    console.log("not signed in");
    }
}