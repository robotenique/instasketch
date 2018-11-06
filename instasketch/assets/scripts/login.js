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
    if (userName == "albus.dumbledore@utoronto.ca" && password == "dumble123") {
      console.log("Teacher is logging in.");
      let url = "file:///Users/pigletwithcurls/Desktop/uoft/csc309/ph1_my/instasketch/teacherIndex.html";
      window.location.href = url;
    } else if (userName == "student@mail.utoronto.ca" && password =="student123") {
      console.log("Student is logging in.");
      let url = "file:///Users/pigletwithcurls/Desktop/uoft/csc309/ph1_my/instasketch/studentIndex.html";
      window.location.href = url;
    } else {
      alert("Please enter correct username and password.");
    }

    console.log(user);
  });
});
