function testTest()
{
    return true;
}

function getList(){
    var listItems;

    firebase.database().ref("/ProductList/ListID/").on("value", function(snapshot){
        var lists = snapshot.val();
        listItems = Object.keys(lists);
        console.log(lists);
    });

    setTimeout(function() {
        getProducts(listItems)
    }, 1000);

    return listItems;
}

function getProducts(listItems)
{
    console.log(listItems);
    for (var i = 0; i < listItems.length; i++)
    {
        firebase.database().ref("/ProductList/ListID/" + listItems[i]).on("value", function(snapshot){
            var lists = snapshot.val();
            console.log(lists);
        });
    }
}



module.exports = testTest;