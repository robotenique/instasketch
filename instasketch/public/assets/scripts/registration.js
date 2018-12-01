"use strict";

/* When user clicks on teacher option, it shows specific form for professors */
const radioButtons = document.querySelectorAll('input[name="typeuser"]');
const tcode = document.querySelector("#teachercode");
const tcode_display = tcode.style.display;
const teachersList = document.querySelector("#teachers");
const teachersList_display = teachersList.style.display;

$.getJSON('../student-profile/teachers', function(teachers_list) {
  const teacherList = [];
  if (teachers_list.length !== 0) {
    for (const teacher of teachers_list.result) {
      // console.log(teacher);
      teacherList.push({
        first_name: teacher.first_name,
        last_name: teacher.last_name,
        school: teacher.school,
        teacher_id: teacher._id,
        teacher_code: teacher.teacher_code,
        email: teacher.email,
        password: teacher.password,
        province: teacher.province,
        path: teacher.path
      });
    }
  }
  console.log(teacherList);
  for (const [idx, t] of teacherList.entries()) {
    const currOption = $("<option>", {
      'value': t.first_name + ' ' + t.last_name,
      'id': t.teacher_id,
    }).append(t.first_name + ' ' + t.last_name);
    currOption.appendTo(teachersList);
  }
});


// User account
class UserAccount {
  constructor (email, password, firstName, lastName, province, school, position, teachercode, teacher) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.province = province;
    this.school = school;
    this.position = position;
    this.teacher_id = "";
    this.teacher_code = "";
  }
}

/* Appearance of options available to student or teacher.
 * By default, the teacher code input shouldn't appear
 */
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

/* AJAX */
$(document).ready(function() {
  $("#btn1").click(function(e) {
    e.preventDefault();
    const email = $("#email").val();
    const password = $("#pw").val();
    const firstName = $("#firstName").val();
    const lastName = $("#lastName").val();
    const province = $("#province").val();
    const school = $("#school").val();
    const position = "TBA";
    const teacher_id = "TBA";
    const teacher_code = "TBA";
    // new account
    const account = new UserAccount(email, password, firstName, lastName, province, school, position, teacher_id, teacher_code);

    // Get value of the radio button for teacher or student
    for (let i = 0; i < radioButtons.length; i++) {
      if (radioButtons[i].checked) {
        account.position = radioButtons[i].value;
      }
    }

    if (account.position === "teacher") {
      console.log('Registered Teacher');
      const teacherCodeVal = $("#teachercode").val();
      account.teacher_code = teacherCodeVal;
      account.teacher = "None";
      account.teacher_id = teacher_id;

      $.ajax({
        type: "post",
        url: "/registration",
        data: account,
        'content-type': 'application/json',
        success: function(response) {
          console.log("Success creating a teacher object");
          window.location.href = "/login";
        },
        error: function(response) {
          alert("Error creating the teacher");
        }
      });

    } else if (account.position === "student") {
      console.log('Registered Student');
      const teacher_id = $("#teachers").children(":selected").attr("id");
      account.teacher_code = "None";
      account.teacher_id = teacher_id;

      $.ajax({
        type: "post",
        url: "/registration",
        data: account,
        'content-type': 'application/json',
        success: function(response) {
          console.log("Success creating a student object");
          window.location.href = "/login";
        },
        error: function(response) {
          alert("Error creating the student");
        }
      });
    }
    // Here we would send the new account to the server
    console.log(account);
  });
});
