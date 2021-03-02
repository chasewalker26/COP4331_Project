class Account
{
    // Allows the user into site if they are signed in
    // (not tested since third-party function from Google)
    authorizeAccount()
    {
        firebase.auth().onAuthStateChanged(function(user)
        {
            if (user)
                window.location.replace("shoppingList.html");
        });
    }

    // Signs in existing user, or creates thrir firebase account
    // (not tested since third-party function from Google)
    signIn()
    {
        var provider = new firebase.auth.GoogleAuthProvider;

        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

        firebase.auth().signInWithPopup(provider).then((result) => 
        {
            console.log(result);
            window.location.replace("shoppingList.html");
        }).catch((error) =>
        {
            console.log(error);
        });
    }
}