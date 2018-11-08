'use strict';

//the submissions and the corresponding drawings and students - to be retrieved from server and stored in server
let sessionSubmissions = [
	{drawing_id: '123',
     session_id: "a4f5j6k7",
     comments: ""},
	{drawing_id: '456',
     session_id: "a4f5j6k7",
     comments: ""},
	{drawing_id: '789',
     session_id: "a4f5j6k7",
     comments: "Great job!"}
]
let drawings = [
	{drawing_id: '123',
     student_id: '123',
     title: 'Beaver',
     path: 'assets/images/beaver.jpeg',
     submitted: true,
     min_since_edit: 35},
	{drawing_id: '456',
     student_id: '123',
     title: 'Eagle',
     path: 'assets/images/eagle.jpg',
     submitted: true,
     min_since_edit: 55},
	{drawing_id: '789',
     student_id: '456',
     title: 'Horse',
     path: 'assets/images/horse.jpg',
     submitted: true,
     min_since_edit: 12}
]
let students = [
	{id: "123",
	 firstName: "Amritpal",
	 lastName: "Aujla",
	 school: "UofT",
	 teacherId: "albus1",
	 email: "amritpal.aujla@mail.utoronto.ca",
	 password: "blah",
	 province: "Ontario",
	 pictureURL: "https://dummyimage.com/323x200/ffc163/040838.png"
	},
	{id: "456",
	 firstName: "Max",
	 lastName: "Boyko",
	 school: "UofT",
	 teacherId: "albus1",
	 email: "max.boyko@mail.utoronto.ca",
	 password: "blahblah",
	 province: "Ontario",
	 pictureURL: "https://dummyimage.com/323x200/ffc163/040838.png"
	}
]

//getting the submissions html element and adding children based on the submissions from the server
const allSubmissions = document.querySelector("#submissions");
for(let submission of sessionSubmissions){
	const student = getStudent(getDrawing(submission.drawing_id).student_id);
	const drawing = getDrawing(submission.drawing_id);
	
	//the title, id, author, submit button, and comment area for the submission
	const submissionTitle = document.createElement("h5");
	submissionTitle.className = "card-title";
	submissionTitle.appendChild(document.createTextNode(drawing.title));
	
	const submissionId = document.createElement("small");
	submissionId.className = "hiddenId";
	submissionId.appendChild(document.createTextNode(drawing.drawing_id));
	
	const submissionAuthor = document.createElement("p");
	const authorName = student.firstName + " " + student.lastName;
	submissionAuthor.appendChild(document.createTextNode(authorName));
	
	const textArea = document.createElement("textarea");
	textArea.className = "commentText";
	textArea.setAttribute("name", "comment");
	textArea.setAttribute("rows", "4");
	textArea.setAttribute("cols", "23");
	
	const submitButton = document.createElement("button");
	submitButton.appendChild(document.createTextNode("Submit Comment"));
	submitButton.className = "submitButton";
	submitButton.addEventListener("click", submitComment);
	
	const cardBody = document.createElement("div");
	cardBody.className = "card-body";
	cardBody.appendChild(submissionTitle);
	cardBody.appendChild(submissionId);
	cardBody.appendChild(submissionAuthor);
	cardBody.appendChild(textArea);
	cardBody.appendChild(submitButton);
	
	//the image and link to image for the submission
	const cardImage = document.createElement("img");
	cardImage.className = "card-img-top border-bottom";
	cardImage.setAttribute("src", drawing.path);
	cardImage.setAttribute("alt", "Image")
	
	const cardLink = document.createElement("a");
	cardLink.setAttribute("target", "_blank");
	cardLink.setAttribute("href", drawing.path);
	cardLink.appendChild(cardImage);
	
	const card = document.createElement("div");
	card.className = "card";
	card.appendChild(cardLink);
	card.appendChild(cardBody);
	allSubmissions.appendChild(card);
}

//submitting a comment when the button is pressed
function submitComment(e){
	const submissionId = e.target.parentElement.children[1].textContent;
	setSubmissionComments(submissionId, e.target.previousElementSibling.value);
}

//getting the appropriate students and drawings based on their id's
function getStudent(id){
	for(let student of students){
		if(student.id === id){
			return student;
		}
	}
}

function getDrawing(id){
	for(let drawing of drawings){
		if(drawing.drawing_id === id){
			return drawing;
		}
	}
}

//Code below requires server calls - modifying the data retrieved from the server
function setSubmissionComments(id, comments){
	for(let submission of sessionSubmissions){
		if(submission.drawing_id === id){
			submission.comments = comments;
		}
	}
}