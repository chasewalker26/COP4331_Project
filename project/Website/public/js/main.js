// ALWAYS set false when not testing
var isTesting = true;

// function that enables asynchronous fethcing of database data
pullFromFirebase = (datapath) => 
{
    return new Promise((resolve) => 
    {
        firebase.database().ref(datapath).on('value', function(snapshot) 
        {
            const products = snapshot.val();
            if (products != undefined)
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

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}