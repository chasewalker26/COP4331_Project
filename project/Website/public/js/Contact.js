// event listener from submit
class Contact {
    constructor(userEmail,message,devEmail) {
        this.userEmail = userEmail;
        this.message = message;
        this.devEmail = devEmail;     
    }
}


function sendMail(from_name) {
    //await initializeAppUser();
    (function () {
        // https://dashboard.emailjs.com/admin/integration
        emailjs.init('user_qBNYciotCBLgcKwufO8iz');
    })();
    from_name = appUser.username;
    from_email = appUser.email;
    from_uid = appUser.uid;
    var from_message = document.getElementById('message').value;
    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();
        // these IDs from the previous steps
        emailjs.send('service_7igsl3v', 'template_q3vcveq',{
            name: from_name,
            message: from_message,
            email: from_email,
            uid: from_uid
        })
            .then(function () {
                console.log('SUCCESS!');
                //show alert
                document.querySelector('.sub-alert').style.display = "block";
                //hide alert after 3 seconds
                setTimeout(function(){
                    document.querySelector('.sub-alert').style.display = "none";
                },3000)
                //reset form after send
                document.getElementById('contact-form').reset();
            }, function (error) {
                console.log('FAILED...', error);
            });
    });

}

