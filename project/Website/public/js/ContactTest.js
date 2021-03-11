if (isTesting == true)
{
    window.onload = async function()
    {
        await redirectIfNotFirebaseUser(); // runtime function to ensure a user is signed in
        runTests();
  }
}

function runTests(){
  contactTest();
  // sendMail();
  $("#submitContact").click()
}



function contactTest(){
  var data = false;
  var contact = new Contact("sender@email.com", "Hello there", "receiver@email.com");

  var expectedContact = 
  {
    "userEmail": "sender@email.com",
    "message": "Hello there",
    "devEmail": "receiver@email.com"
  }

  if (JSON.stringify(contact) == JSON.stringify(expectedContact))
    data = true;

  console.assert(data == true, "contactTest() FAILED");
}

