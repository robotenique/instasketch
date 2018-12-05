'use strict';

/* Array of students on the database */
let numOfStudents = 0;
let studentOnRecord = [];

/* Student object */
class Student {
  constructor(email, password, firstName, lastName, school, province, teacher_id) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.school = school;
    this.province = province;
    this.position = "student";
    this.teacher_id = teacher_id;
  }
}

const teachersList = document.querySelector("#teachers");

/** Retrieve all teachesr from the database.
  * Admin (teacher) can add student of any teacher.
  */
$.getJSON('/student-profile/teachers', function(teachers_list) {
  const teacherList = [];
  console.log(teachers_list);
  if (teachers_list.length !== 0) {
    for (const teacher of teachers_list.result) {
      console.log(teacher);
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
    const position = "student";
    const teacher_id = $("#teachers").children(":selected").attr("id");

    // new Student account
    const account = new Student(email, password, firstName, lastName, school, province, teacher_id);

    console.log('teachers list', $("#teachers").children());
    account.teacher_id = teacher_id;
    console.log(teacher_id)
    $.ajax({
      type: "post",
      url: "/admin/addStudent",
      data: account,
      'content-type': 'application/json',
      success: function(response) {
        console.log("Success creating a student object");
        window.location.href = "/admin";
      },
      error: function(response) {
        alert("Error creating the student");
      }
    });
  });
  // Here we would send the new account to the server
});
