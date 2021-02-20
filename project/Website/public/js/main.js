// ALWAYS set false when not testing
var testing = true;

// [REQUIRED FOR TESTING]
// Enables export of testing functions and initializes firebase with prewritten
// Node.js firebase functions from Google's documentation
if (testing == true)
{
    // module.exports = getList;

    // Initializes firebase using Node.js for tests
    firebase = require("firebase/app");
    require("firebase/database");

    var firebaseConfig = {
        apiKey: "AIzaSyAgxD_jRTQ-5PDtrWjsNd5KazN5LNYBU-U",
        authDomain: "cop4331-project.firebaseapp.com",
        databaseURL: "https://cop4331-project-default-rtdb.firebaseio.com",
        projectId: "cop4331-project",
        storageBucket: "cop4331-project.appspot.com",
        messagingSenderId: "620770546311",
        appId: "1:620770546311:web:9e858d72e45d8d89cd9e22",
        measurementId: "G-NRS2BW86XT"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

// function that enables asynchronous fethcing of database data
pullFromFirebase = (datapath) => 
{
    return new Promise((resolve) => 
    {
        firebase.database().ref(datapath).once('value').then(function(snapshot) 
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