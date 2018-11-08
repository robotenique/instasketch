'use strict';

//variables for the profile elements on the page
const profile = document.querySelector("#profile");
const profilePic = document.querySelector("#profilePic");
const profileFirstName = document.querySelector("#firstName");
const profileLastName = document.querySelector("#lastName");
const profileSchool = document.querySelector("#school");
const profileTeacher = document.querySelector("#teacher");
const profileEmail = document.querySelector("#email");
const profileProvince = document.querySelector("#province");

//making the form for changing the profile data
const formRow = document.createElement('div');
formRow.classList.add("row");
formRow.classList.add("newForm");
const editText = document.createElement('span');
editText.className = "editText";
formRow.appendChild(editText);
const editForm = document.createElement('form');
editForm.id = "form";
const inputField = document.createElement('input');
inputField.setAttribute('type', 'text');
inputField.setAttribute('name', 'entryChange');
inputField.setAttribute('placeholder', 'Change to...');
inputField.id = "entryInput";
const inputButton = document.createElement('input');
inputButton.setAttribute('type', 'submit');
inputButton.setAttribute('value', 'Confirm');
inputButton.id = "entryButton";
editForm.appendChild(inputField);
editForm.appendChild(inputButton);
formRow.appendChild(editForm);
editForm.addEventListener('submit', confirmChange);

//make the input object for changing picture
const pictureUpload = document.createElement("input");
pictureUpload.setAttribute("type", "file");
pictureUpload.id = "upload";
pictureUpload.addEventListener('change', changePicture)

//variables for the profile elements to change
let attribute;
let textToChange;

profile.addEventListener('click', editAttribute);

//the student object whose profile is displayed and changing - supposed to be populated from the server
let student = {
	id: "123",
	firstName: "Amritpal",
	lastName: "Aujla",
	school: "UofT",
	teacherId: "albus1",
	email: "amritpal.aujla@mail.utoronto.ca",
	password: "blah",
	province: "Ontario",
	pictureURL: "https://dummyimage.com/323x200/ffc163/040838.png"
}

//the teacher objects for the student's teacher - supposed to be populated from the server
let teacher1 = {
    id: "albus1",
    firstName: "Albus",
    lastName: "Dumbledore",
    email: "albus.dumbledore@utoronto.ca",
    school: "Hogwarts",
    province: "REDACTED",
	pictureURL: "https://dummyimage.com/323x200/ffc163/040838.png",
	password: "blah"
}
let teacher2 = {
	id: "marky1",
	firstName: "Mark",
	lastName: "Kazakevich",
	email: "csc309-2018-09@cs.toronto.edu",
	school: "UofT",
	province: "Ontario",
	pictureURL: "https://www.teach.cs.toronto.edu/~csc309h/fall/static/img/people/mark.jpg",
	password: "password"
}
let teachers = [teacher1, teacher2];

//load in initial values
document.addEventListener('DOMContentLoaded', function() {
	profilePic.firstElementChild.setAttribute('src', getProfilePicURL());
	const firstName = document.createTextNode(getProfileFirstName());
	profileFirstName.lastElementChild.appendChild(firstName);
	const lastName = document.createTextNode(getProfileLastName());
	profileLastName.lastElementChild.appendChild(lastName);
	const school = document.createTextNode(getProfileSchool());
	profileSchool.lastElementChild.appendChild(school);
	const teacher = document.createTextNode(getProfileTeacher());
	profileTeacher.lastElementChild.appendChild(teacher);
	const email = document.createTextNode(getProfileEmail());
	profileEmail.lastElementChild.appendChild(email);
	const province = document.createTextNode(getProfileProvince());
	profileProvince.lastElementChild.appendChild(province);
})


//change an attribute in the profile
function editAttribute(e){
	if(e.target.classList.contains('editButton')){
		attribute = e.target.parentElement.parentElement.firstElementChild;
		textToChange = attribute.lastElementChild;
		const attributeName = attribute.firstElementChild.textContent.substring(0, attribute.firstElementChild.textContent.length - 2);
		editText.textContent = "Editing " + attributeName;
		if(!profile.lastElementChild.classList.contains('newForm')){
			profile.appendChild(formRow);
		}
	}
	else if(e.target.classList.contains('pImg')){
		pictureUpload.click();
	}
}

//change the profile picture
function changePicture(e){
	if (this.files && this.files[0]) {
		const imgURL = URL.createObjectURL(this.files[0]);
		profilePic.firstElementChild.src = imgURL;
		setProfilePicURL(imgURL);
    }
}

//confirm the change of an attribute and manipulate the DOM accordingly
function confirmChange(e){
	e.preventDefault();
	const changedValue = document.querySelector("#entryInput").value;
	
	switch(attribute.firstElementChild.id){
		case 'firstNameText':
			setProfileFirstName(changedValue);
			break;
		case 'lastNameText':
			setProfileLastName(changedValue);
			break;
		case 'schoolText':
			setProfileSchool(changedValue);
			break;
		case 'teacherText':
			if(!isTeacherValid(changedValue)){
				alert("You can only change your teacher to another existing teacher");
				return;
			}
			setProfileTeacher(changedValue);
			break;
		case 'emailText':
			setProfileEmail(changedValue);
			break;
		case 'provinceText':
			setProfileProvince(changedValue);
			break;
	}
	
	textToChange.innerText = changedValue;
	profile.removeChild(profile.lastChild);
	inputField.value = '';
}


//checks if the name entered in teacher space is valid
function isTeacherValid(newName){
	for(let teacher of teachers){
		if(makeLean(teacher.firstName + teacher.lastName) === makeLean(newName)){
			return true;
		}
	}
	return false;
}

//makes str into a string without spaces and all characters lowercase
function makeLean(str){
	return (str.replace(/\s/g, '')).toLowerCase().trim();
}

//Code below requires server calls
function getProfilePicURL(){
	return student.pictureURL;
}

function getProfileFirstName(){
	return student.firstName;
}

function getProfileLastName(){
	return student.lastName;
}

function getProfileSchool(){
	return student.school;
}

function getProfileTeacher(){
	for (let teacher of teachers){
		if(teacher.id === student.teacherId){
			return teacher.firstName + ' ' + teacher.lastName;
		}
	}
}

function getProfileEmail(){
	return student.email;
}

function getProfileProvince(){
	return student.province;
}

function setProfilePicURL(picURL){
	student.pictureURL = picURL;
}

function setProfileFirstName(firstName){
	student.firstName = firstName;
}

function setProfileLastName(lastName){
	student.lastName = firstName;
}

function setProfileSchool(school){
	student.school = firstName;
}

function setProfileTeacher(teacherName){
	for (let teacher of teachers){
		if(makeLean(teacher.firstName + teacher.lastName) === makeLean(teacherName)){
			student.teacherId = teacher.id;
		}
	}
}

function setProfileEmail(email){
	student.email = email;
}

function setProfileProvince(province){
	student.province = province;
}