'use strict';

const profile = document.querySelector("#profile");
const profilePic = profile.children[0];
const profileName = profile.children[1];
const profileAddress = profile.children[2];
const profileClass = profile.children[3];
const profileEmail = profile.children[4];

const formRow = document.createElement('div');
formRow.classList.add("row");
formRow.classList.add("newForm");
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

let attribute;
let textToChange;

profile.addEventListener('click', editAttribute);

function editAttribute(e){
	if(e.target.classList.contains('editButton')){
		console.log('button clicked')
		attribute = e.target.parentElement.parentElement.firstElementChild;
		textToChange = attribute.lastElementChild;
		if(!profile.lastElementChild.classList.contains('newForm')){
			profile.appendChild(formRow);
		}
	}
}

function confirmChange(e){
	e.preventDefault();
	const changedValue = document.querySelector("#entryInput").value;
	textToChange.innerText = changedValue;
	profile.removeChild(profile.lastChild);
	inputField.value = '';
}