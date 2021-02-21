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