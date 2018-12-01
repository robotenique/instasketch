'use strict';

// User object
class User {
    constructor(email, password, isteacher=false) {
        this.email = email;
        this.password = password;
        this.isteacher = isteacher;
    }
}

// Form validation
function validateForm() {
    let userName = $("#uname").val();
    let password = $("#pw").val();
    if (userName == "") {
        alert("Username must be filled out.");
        return False;
    }
    if (password == "") {
        alsert("Password must be filled out.");
        return False;
    }
}

/** Mock data for valid users for teacher and student.
* Supposed to check the input data with the database on the server.
*/
const validStudent = new User("amritpal.aujla@mail.utoronto.ca", "blah");
const validTeacher = new User("albus.dumbledore@utoronto.ca", "dumble123", true);

// When login button is clicked:
// user object is created (user input: username and password)
$(document).ready(function() {
    $("#btn1").click(function() {
        const email = $("#uname").val();
        const password = $("#pw").val();
        const user = new User(email, password);
        // https://medium.com/coding-design/writing-better-ajax-8ee4a7fb95f
        // Do a POST in the /login route to try to login the user
        $.ajax({
            url: '/login',
            type: 'POST',
            'content-type': 'application/json',
            data: user,
        }).done((data) => {
            if(data.isTeacher)
                window.location.href = "/mysessions";
            else
                window.location.href = "/sketchbook";
            console.log(data);
        }).fail((jqXHR, textStatus, errorThrown) => {
            // If fail
            console.log(textStatus + ': ' + errorThrown);
            alert("Please enter correct email and password.");
        });
    });
});
