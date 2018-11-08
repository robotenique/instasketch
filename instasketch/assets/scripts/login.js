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

    /** Decide if it's student or teacher and
      * direct the page to teacher/student version accordingly.
      * This validation would be done in the server, with encription in the password ofc
      */
    if (user.email === validTeacher.email && user.password === validTeacher.password) {
      console.log("Teacher is logging in.");
      window.location.href = "mysessions.html";
    } else if (user.email === validStudent.email && user.password === validStudent.password) {
      console.log("Student is logging in.");
      window.location.href = "sketchbook.html";
    } else {
      alert("Please enter correct email and password.");
    }

    console.log(user);
  });
});
