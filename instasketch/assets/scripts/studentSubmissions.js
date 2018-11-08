'use strict';

//the submissions and the corresponding drawings and students - to be retrieved from server
let studentSubmissions = [
	{submission_id: '123',
	 drawing_id: '123',
     session_id: "a4f5j6k7",
     comments: "Well Done!"},
	{submission_id: '456',
	 drawing_id: '456',
     session_id: "a4f5j6k7",
     comments: "Amazing!"},
	{submission_id: '789',
	 drawing_id: '789',
     session_id: "a4f5j6k7",
     comments: "Work on it a little more!"}
]
let sessions = [
	{session_id: 'a4f5j6k7',
     teacher_id: 'albus1',
     title: 'Animals',
     date: 'Friday, October 5, 2018',
     submissions_page: 'teacherSubmissions.html',
     marked_submissions: 3,
     total_submissions: 3,
     open: false}
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
     student_id: '123',
     title: 'Horse',
     path: 'assets/images/horse.jpg',
     submitted: false,
     min_since_edit: 12}
]
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

const allSubmissions = document.querySelector("#submissions");
for(let submission of studentSubmissions){
	const drawing = getDrawing(submission.drawing_id);
	
	const submissionTitle = document.createElement("h5");
	submissionTitle.className = "card-title";
	submissionTitle.appendChild(document.createTextNode(drawing.title));
	
	const submissionId = document.createElement("small");
	submissionId.appendChild(document.createTextNode(drawing.drawing_id));
	
	const submissionSession = document.createElement("p");
	const sessionName = getSession(submission.session_id).title;
	submissionSession.appendChild(document.createTextNode(sessionName));
	
	const textArea = document.createElement("textarea");
	textArea.className = "commentText";
	textArea.setAttribute("name", "comment");
	textArea.setAttribute("rows", "4");
	textArea.setAttribute("cols", "23");
	textArea.value = submission.comments;
	textArea.disabled = true;
	
	const cardBody = document.createElement("div");
	cardBody.className = "card-body";
	cardBody.appendChild(submissionTitle);
	cardBody.appendChild(submissionId);
	cardBody.appendChild(submissionSession);
	cardBody.appendChild(textArea);
	
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

function getDrawing(id){
	for(let drawing of drawings){
		if(drawing.drawing_id === id){
			return drawing;
		}
	}
}

function getSession(id){
	for(let session of sessions){
		if(session.session_id === id){
			return session;
		}
	}
}