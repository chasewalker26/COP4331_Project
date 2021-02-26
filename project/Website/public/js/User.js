class User {
    constructor(username, email, listID)
    {
        this.username = username;
        this.email = email;
        this.listID = listID;
    }

    async signOut(){
        await firebase.auth().signOut().then(() => {
            window.location.replace("LoginForm.html");
        }).catch((error) => {
            console.log(error);
            console.log("sign out unsucessful");
        });
    }
}