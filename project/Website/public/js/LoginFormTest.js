
if (isTesting == true)
{
    // window.onload = function()
    // {
    //     signOutTest();
    // }
}
async function signOutTest(){
    var newUserTest = new User();
    var user = await firebase.auth().currentUser;

    await newUserTest.signOut();
    
    if (user)
        console.log("singed in");
    else
        console.log("not signed in");
}