// event listener from submit
class Contact {
    constructor(userEmail,message,devEmail) {
        this.userEmail = userEmail;
        this.message = message;
        this.devEmail = devEmail;     
    }
}


function sendMail() {
    //await initializeAppUser();
    (function () {
        // https://dashboard.emailjs.com/admin/integration
        emailjs.init('user_qBNYciotCBLgcKwufO8iz');
    })();
    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();
        // these IDs from the previous steps
        emailjs.sendForm('service_7igsl3v', 'template_q3vcveq', 'contact-form')
            .then(function () {
                console.log('SUCCESS!');
            }, function (error) {
                console.log('FAILED...', error);
            });
    });
}

