class User {
    constructor(username, email, uid)
    {
        this.username = username;
        this.email = email;
        this.uid = uid;
    }

    async signOut(){
        await firebase.auth().signOut().then(() => 
        {
            window.location.replace("signedOut.html");
        });
    }
}