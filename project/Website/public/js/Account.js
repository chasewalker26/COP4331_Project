class Account
{
    // Allows the user into site if they have an account
    // This code was provided by google Firebase
    authorizeAccount()
    {
        firebase.auth().onAuthStateChanged(function(user)
        {
            if (user)
                window.location.replace("shoppingList.html");
        });
    }

    // Sign the user in, or create an account
    // This code was provided by google Firebase
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