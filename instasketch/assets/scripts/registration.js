"use strict";

/* When user clicks on teacher option, it shows specific form for professors */
const radioButtons = document.querySelectorAll('input[name="typeuser"]');
const tcode = document.querySelector("#teachercode");
const tcode_display = tcode.style.display;
const teachersList = document.querySelector("#teachers");
const teachersList_display = teachersList.style.display;

/* User account */
class UserAccount {
  constructor (email, password, firstName, lastName, province, school, position, teachercode, teacher) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.province = province;
    this.school = school;
    this.position = position;
    // this.teachercode = "";
    // this.teacher = "";
  }
}

// By default, the teacher code input shouldn't appear
tcode.style.display = "none";
let prev = null;
for(let i = 0; i < radioButtons.length; i++) {
    radioButtons[i].onclick = function() {
        (prev)? console.log(prev.value):null;
        if(this !== prev) {
            prev = this;
        }
        if (this.value != "teacher") {
          tcode.style.display = "none";
          teachersList.style.display = teachersList_display;
        }
        else {
          tcode.style.display = tcode_display;
          teachersList.style.display = "none";
        }
    };
}

$(document).ready(function() {
  $("#btn1").click(function() {
    const email = $("#email").val();
    const password = $("#pw").val();
    const firstName = $("#firstName").val();
    const lastName = $("#lastName").val();
    const province = $("#province").val();
    const school = $("#school").val();
    const position = "TBA";
    const teacher = "TBA";
    const teacherCode = "TBA";

    /** Supposed to create a new UserAccount object and add it
      * onto the database on the server. This is a mock example.
      */
    const account = new UserAccount(email, password, firstName, lastName, province, school, position, teacherCode, teacher);

    // Get value of the radio button for teacher or student
    for (let i = 0; i < radioButtons.length; i++) {
      if (radioButtons[i].checked) {
        account.position = radioButtons[i].value;
      }
    }

    if (account.position == "teacher") {
      alert('Registered Teacher');
      const teacherCodeVal = $("#teachercode").val();
      account.teacherCode = teacherCodeVal;
      account.teacher = "None";
    } else if (account.position == "student") {
      alert('Registered Student');
      const teacherVal = $("#teachers").val();
      account.teacher = teacherVal;
      account.teacherCode = "None";
    }
    // Here we would send the new account to the server
    console.log(account);

    /* Mock example of going back to index page after registration.*/
    window.location.href = "index.html";
  });
});
