
// import firebase from "firebase/app";
// import "firebase/analytics";
// import "firebase/auth";
// import "firebase/firestore";

// const firebaseConfig = {
//     // ...
//   };

class User {
    constructor(username, userID, email)
    {
        this.username = username;
        this.userID = userID;
        this.email = email;
    }

    getInfo() {
        console.log(username + " " + userID + " " + email)
    }
    async signOut(){
        var user = firebase.auth().currentUser;
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
        
        await firebase.auth().signOut();
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
}

var user =[
    {
        email: "alish@mail.ru",
        password: "admin"
    }
]

function getInfo() {

    var email = document.getElementById("email").value
    var password = document.getElementById("password").value

    for(i = 0; i < user.length; i++) {
        if (email == user[i].email && password == user[i].password) {
            console.log(email + "is logged in!")
            return
        }
    }
    console.log("Incorrect!")
}