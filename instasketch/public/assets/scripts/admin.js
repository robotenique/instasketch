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

/** Default data for students
  * Supposed to retrieve Student data from the server
  */
const student1 = new Student("ab1", "Amrit", "Aujla");
const student2 = new Student("cd2", "Dorothy", "Mckenzie");
const student3 = new Student("ef3", "Joe", "Smith");

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
  addStudentToTable(student1);
  addStudentToTable(student2);
  addStudentToTable(student3);
}
init();

function addStudent(e) {
  e.preventDefault();
  if (e.target.className === "add") {
    // Find the row that the button is existing.
    console.log("new student");
    // addStudent page.
    window.location.href="addStudent.html";
  }
}

/** After adding student, see a new student object added
  * Need to use backend later to update the student database
  * accordingly after adding a new student.
  */
if (document.referrer === "addStudent.html") {
  /* Pretend a new student object added */
  //  const newStudent = new Student("123", "newStudent", "Hello");
  //  addStudentToTable(newStudent);
  alert("back from adding");
}

/* Add students onto the table after retrieving data from  */
function addStudentToTable(student) {
  const studentTable = document.querySelector("#studentTable");
  const tableRow = document.createElement("tr");
  const tableId= document.createElement("td");
  const tableLastName = document.createElement("td");
  const tableFirstName = document.createElement("td");
  const tableButton = document.createElement("td");
  const modifyBtn = document.createElement("button");
  const removeBtn = document.createElement("button");
  modifyBtn.className = "modify";
  removeBtn.className = "remove";
  modifyBtn.appendChild(document.createTextNode("Modify"));
  removeBtn.appendChild(document.createTextNode("Remove"));
  tableId.appendChild(document.createTextNode(student.id));
  tableLastName.appendChild(document.createTextNode(student.lastName));
  tableFirstName.appendChild(document.createTextNode(student.firstName));
  tableButton.appendChild(modifyBtn);
  tableButton.appendChild(removeBtn);
  tableRow.appendChild(tableId);
  tableRow.appendChild(tableLastName);
  tableRow.appendChild(tableFirstName);
  tableRow.appendChild(tableButton);
  studentTable.appendChild(tableRow);
  studentOnRecord[student.id] = student;
  numberOfStudents += 1;
}

/* Direct admin to the modifyStudent.html */
function modifyStudent(e) {
  e.preventDefault();
  if (e.target.className === "modify") {
    console.log("modify");
    // Directs to the page where admin can modify student.
    window.location.href = "modifyStudent.html";
  }
}


/* Remove student from the table and object list */
function removeStudent(e) {
  e.preventDefault();
  // Find if the remove button was clicked
  if (e.target.className === "remove") {
    // find a row that the button was clicked on
    const studentTable = document.querySelector("#studentTable");
    const currRow = e.target.parentElement.parentElement;
    studentTable.removeChild(currRow);
    // Remove student from the studentOnRecord list
    delete studentOnRecord[currRow.childNodes[0].textContent];
    console.log(studentOnRecord);
  }
}
