'use strict';

/** findAccount.js: Mark a student in the database for the teacher to change/create
*  new account for that user.
*/

$(function () {
    $("#search").on("click", function (e){
        e.preventDefault();
        const email = $("#studentEmail").val();
        if(email === "") {
            alert("Email address must be filled out.");
        }
        else {
            $.ajax({
                url: '/registration/markstudent',
                type: 'POST',
                'content-type': 'application/json',
                data: {email: email}, // DON'T JSON.stringfy >:(
                success: function (response) {
                    alert("Your email account was sucessfully marked for maintenance, please inform your teacher!");
                },
                error: function (response) {
                    if(response.status === 404)
                        alert("Incorrect email, please verify and try again");
                    else if(response.status === 500)
                        alert("We got an error when marking your email, please contact your teacher");
                }
            });
        }
    });
})


