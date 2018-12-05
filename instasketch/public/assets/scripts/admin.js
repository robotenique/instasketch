'use strict';

/* Global counts and arrays */
let numberOfStudents = 0; // total number of students
let studentOnRecord = []; // Array of students on the database

/* Student object */
class Student {
  constructor(id, firstName, lastName) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

/** StudentTable represents the student database from the server.
  * Supposed to retrieve Student database from the server
  */
const studentTable = document.querySelector("#studentTable");
const addPart = document.querySelector("#add");
addPart.addEventListener("click", addStudent);
studentTable.addEventListener("click", removeStudent);
studentTable.addEventListener("click", modifyStudent);

/** Set table of students for default
  * Mock data of initial student database.
  * Need to retrieve real database from the server later.
  */
function init() {
  const addPart = document.querySelector("#add");
  const addBtn = document.createElement("button");
  addBtn.className = "add";
  addBtn.appendChild(document.createTextNode("Add"));
  addPart.appendChild(addBtn);
  const studentTable = document.querySelector("#studentTable");
  const tableRow = document.createElement("tr");
  const headId= document.createElement("th");
  const headLastName = document.createElement("th");
  const headFirstName = document.createElement("th");
  const headButton = document.createElement("th");
  headId.appendChild(document.createTextNode("Student Id"));
  headLastName.appendChild(document.createTextNode("Last Name"));
  headFirstName.appendChild(document.createTextNode("First Name"));
  headButton.appendChild(document.createTextNode("Add/Modify/Remove"));
  tableRow.appendChild(headId);
  tableRow.appendChild(headLastName);
  tableRow.appendChild(headFirstName);
  tableRow.appendChild(headButton);
  studentTable.appendChild(tableRow);
}
init();
$.getJSON('../teacher-profile/students', function(students_list) {
  const studentList = [];
  if (students_list !== 0) {
    for (const student of students_list.result) {
      studentList.push({
        first_name: student.first_name,
        last_name: student.last_name,
        school: student.school,
        student_id: student._id,
        teacher_id: student.teacher_id,
        email: student.email,
        password: student.password,
        province: student.province,
        path: student.path,
      });
    }
  }
  console.log(studentList);
  // Put students onto the table on the admin page.
  for (const [idx, s] of studentList.entries()) {
    const currStudent = $("<tr>").append(
      $("<td>").text(s.student_id),
      $("<td>").text(s.last_name),
      $("<td>").text(s.first_name),
      $("<td>").append(
        $("<button>", {
          click: addStudent,
          text: 'Add',
          class: 'add',
        }),
        $("<button>", {
          click: modifyStudent,
          text: 'Modify',
          class: 'modify',
        }),
        $("<button>", {
          click: removeStudent,
          text: 'Remove',
          class: 'remove'
        })
      )).appendTo(studentTable);
  }
});

function addStudent(e) {
  e.preventDefault();
  console.log(e.target.parentElement);
  if (e.target.className === "add") {
    // Find the row that the button is existing.
    console.log("new student");
    // addStudent page.
    window.location.href="/admin/addStudent";
  }
}

/* Direct admin to the modifyStudent.html */
function modifyStudent(e) {
  e.preventDefault();
  if (e.target.className === "modify") {
    console.log("modify");
    // Directs to the page where admin can modify student.
    window.location.href = "/modify-student";
  }
}


/* Remove student from the table and object list */
function removeStudent(e) {
  e.preventDefault();
  // Find if the remove button was clicked
  const currentRow = e.target.parentElement.parentElement;
  const removingID = currentRow.firstChild.textContent;
  if (e.target.className === "remove") {
    // AJAX POST to remove the student from database
    $.ajax({
      type: "delete",
      url: "/admin/remove/" + removingID,
      // data: {id: removingID},
      success: function(response) {
        console.log("SUCCESS REMOVING A STUDENT");
        window.location.href="/admin";
      },
      error: function(response) {
        console.log("PROBLEM REMOVING A STUDENT");
      }
    });
  }
}
