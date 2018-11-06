'use strict';

// User object
class User {
  constructor (userName, password) {
    this.userName = userName;
    this.password = password;
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

// When login button is clicked:
// user object is created (user input: username and password)
$(document).ready(function() {
  $("#btn1").click(function() {
    const userName = $("#uname").val();
    const password = $("#pw").val();
    const user = new User(userName, password);

    // Decide if it's student or teacher and
    // direct the page to teacher/student version accordingly.
    if (user.userName == "albus.dumbledore@utoronto.ca" && user.password == "dumble123") {
      console.log("Teacher is logging in.");
      window.location.href = "teacherIndex.html";
    } else if (user.userName == "student@mail.utoronto.ca" && user.password =="student123") {
      console.log("Student is logging in.");
      window.location.href = "studentIndex.html";
    } else {
      alert("Please enter correct username and password.");
    }

    console.log(user);
  });
});
