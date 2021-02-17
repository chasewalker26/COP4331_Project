
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