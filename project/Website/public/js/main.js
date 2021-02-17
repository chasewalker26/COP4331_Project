console.assert(test() == 1, "failed");

function test(){
    var lists;
    var listItems;
    firebase.database().ref("/ProductList/ListID/ProductID/").on("value", function(snapshot){
        lists = snapshot.val();
        listItems = Object.keys(lists);

        for (var i = 0; i < listItems.length; i++)
        {
            console.log(listItems[i] + " : " + lists[listItems[i]]);
        }
    });
}