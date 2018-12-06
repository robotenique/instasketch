'use strict';

//variables for the profile elements on the page
const profile = document.querySelector("#profile");
const profilePic = document.querySelector("#profilePic");
const profileFirstName = document.querySelector("#firstName");
const profileLastName = document.querySelector("#lastName");
const profileSchool = document.querySelector("#school");
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
pictureUpload.setAttribute("name", "image");
pictureUpload.id = "upload";
pictureUpload.addEventListener('change', changePicture)
const pictureSubmit = document.createElement("input");
pictureSubmit.setAttribute("type", "submit");
pictureSubmit.setAttribute("id", "pictureSubmit");
pictureSubmit.setAttribute("name", "pictureSubmit");
const uploadForm = document.createElement("form");
uploadForm.setAttribute("action", "/teacher-profile/upload");
uploadForm.setAttribute("method", "post");
uploadForm.setAttribute("enctype", "multipart/form-data");
uploadForm.appendChild(pictureUpload);
uploadForm.appendChild(pictureSubmit);
uploadForm.style.display = "none";
document.body.appendChild(uploadForm)

//variables for the profile elements to change
let attribute;
let textToChange;

profile.addEventListener('click', editAttribute);

//the teacher object for the profile - supposed to be populated from the server
let teacher = {}

//load in initial values
document.addEventListener('DOMContentLoaded', function() {
	const url = '/teacher-profile/teacher';

    fetch(url)
    .then((res) => { 
        if (res.status === 200) {
           return res.json() 
       } else {
            alert('Could not get teacher')
       }                
    })
    .then((json) => {
        teacher = json.result;
		profilePic.firstElementChild.setAttribute('src', getProfilePicURL());
		const firstName = document.createTextNode(getProfileFirstName());
		profileFirstName.lastElementChild.appendChild(firstName);
		const lastName = document.createTextNode(getProfileLastName());
		profileLastName.lastElementChild.appendChild(lastName);
		const school = document.createTextNode(getProfileSchool());
		profileSchool.lastElementChild.appendChild(school);
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
	if(e.target.classList.contains('editButton')){
		attribute = e.target.parentElement.parentElement.firstElementChild;
		textToChange = attribute.lastElementChild;
		const attributeName = attribute.firstElementChild.textContent.substring(0, attribute.firstElementChild.textContent.length - 2);
		editText.textContent = "Editing " + attributeName;
		if(!profile.lastElementChild.classList.contains('newForm')){
			profile.appendChild(formRow);
		}
		if(attribute.id === "email"){
			inputField.setAttribute("type", "email");
		}
		else{
			inputField.setAttribute("type", "text");
		}
	}
	else if(e.target.classList.contains('pImg')){
		pictureUpload.click();
	}
}

//change the profile picture
function changePicture(e){
	if (this.files && this.files[0]) {
		const fullType = this.files[0].type;
		if(fullType !== "image/jpeg" && fullType !== "image/png"){
			alert("Only jpeg and png images are allowed!");
			return;
		}
    }
	uploadForm.submit();
}

//confirm the change of an attribute and manipulate the DOM accordingly
function confirmChange(e){
	e.preventDefault();
	const changedValue = document.querySelector("#entryInput").value;
	if(changedValue.trim() === ""){
		alert("Cannot set attributes to be nothing");
		return;
	}
	
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

//sends the updated teacher to the server
function confirmNewAttributes(){
	const url = '/teacher-profile/' + teacher._id;
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'PATCH', 
        body: JSON.stringify(teacher),
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
            console.log('Changed teacher');  
        }
        console.log(res)
    }).catch((error) => {
        console.log(error)
    })
}

//Getter and setters for the teacher object
function getProfilePicURL(){
	return teacher.path;
}

function getProfileFirstName(){
	return teacher.first_name;
}

function getProfileLastName(){
	return teacher.last_name;
}

function getProfileSchool(){
	return teacher.school;
}

function getProfileEmail(){
	return teacher.email;
}

function getProfileProvince(){
	return teacher.province;
}

function setProfilePicURL(picURL){
	teacher.path = picURL;
}

function setProfileFirstName(firstName){
	teacher.first_name = firstName;
}

function setProfileLastName(lastName){
	teacher.last_name = lastName;
}

function setProfileSchool(school){
	teacher.school = school;
}

function setProfileEmail(email){
	teacher.email = email;
}

function setProfileProvince(province){
	teacher.province = province;
}