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
let student = {};
//all possible teachers for this student
let teachers = [];

//load in initial values
document.addEventListener('DOMContentLoaded', function() {
	const url = '/student-profile/student';

    fetch(url)
    .then((res) => { 
        if (res.status === 200) {
           return res.json() 
       } else {
            alert('Could not get students')
       }                
    })
    .then((json) => {
        student = json.result;
		profilePic.firstElementChild.setAttribute('src', getProfilePicURL());
		const firstName = document.createTextNode(getProfileFirstName());
		profileFirstName.lastElementChild.appendChild(firstName);
		const lastName = document.createTextNode(getProfileLastName());
		profileLastName.lastElementChild.appendChild(lastName);
		const school = document.createTextNode(getProfileSchool());
		profileSchool.lastElementChild.appendChild(school);
		getProfileTeacher();
		const email = document.createTextNode(getProfileEmail());
		profileEmail.lastElementChild.appendChild(email);
		const province = document.createTextNode(getProfileProvince());
		profileProvince.lastElementChild.appendChild(province);
    }).catch((error) => {
        console.log(error)
    })
})


//change an attribute in the profile
function editAttribute(e){
	console.log(student);
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
	confirmNewAttributes();
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
	confirmNewAttributes();
}

//sends the updated student to the server
function confirmNewAttributes(){
	const url = '/student-profile/' + student._id;
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'post', 
        body: JSON.stringify(student),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    // Fetch AJAX call
    fetch(request)
    .then(function(res) {
        // Handle response we get from the API
        // Usually check the error codes to see what happened
        if (res.status === 200) {
            console.log('Changed student');  
        }
        console.log(res)
    }).catch((error) => {
        console.log(error)
    })
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

//Getter and setters for the student and teacher objects
function getProfilePicURL(){
	return student.path;
}

function getProfileFirstName(){
	return student.first_name;
}

function getProfileLastName(){
	return student.last_name;
}

function getProfileSchool(){
	return student.school;
}

function getProfileTeacher(){
	const url = '/student-profile/teachers';

    fetch(url)
    .then((res) => { 
        if (res.status === 200) {
           return res.json() 
       } else {
            alert('Could not get students')
       }                
    })
    .then((json) => {
		teachers = json.result;
		for(let i = 0; i < teachers.length; i++){
			if(teachers[i]._id === student.teacher_id){
				const teacher = document.createTextNode(teachers[i].first_name + ' ' + teachers[i].last_name);
				profileTeacher.lastElementChild.appendChild(teacher);
			}
		}
    }).catch((error) => {
        console.log(error)
    })
}

function getProfileEmail(){
	return student.email;
}

function getProfileProvince(){
	return student.province;
}

function setProfilePicURL(picURL){
	student.path = picURL;
}

function setProfileFirstName(firstName){
	student.first_name = firstName;
}

function setProfileLastName(lastName){
	student.last_name = lastName;
}

function setProfileSchool(school){
	student.school = school;
}

function setProfileTeacher(teacherName){
	for (let teacher of teachers){
		if(makeLean(teacher.firstName + teacher.lastName) === makeLean(teacherName)){
			student.teacher_id = teacher._id;
		}
	}
}

function setProfileEmail(email){
	student.email = email;
}

function setProfileProvince(province){
	student.province = province;
}