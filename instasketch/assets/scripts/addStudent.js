'use strict';

/* Array of students on the database */
let numOfStudents = 0;
let studentOnRecord = [];

/* Student object */
class Student {
  constructor(email, password, firstName, lastName, school, province, teacher) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.school = school;
    this.province = province;
    this.teacher = teacher;
  }
}

const button = document.querySelector("#btn1");

button.addEventListener("click", register);

function register(e) {
  e.preventDefault;
  if (e.target.id === "btn1") {
    const username = document.querySelector("#email").value;
    const studentPw = document.querySelector("#pw").value;
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const school = document.querySelector("#school").value;
    const province = document.querySelector("#province").value;
    const teacher = document.querySelector("#teachers").value;
    const newStudent = new Student(username, studentPw, firstName, lastName, school, province, teacher);
    numOfStudents += 1;
    /* Add new student onto the database */
    studentOnRecord[numOfStudents] = newStudent;
    console.log(studentOnRecord[numOfStudents]);
    // window.location.href="admin.html";
    window.location.href = "admin_after_add.html";
  }
}
