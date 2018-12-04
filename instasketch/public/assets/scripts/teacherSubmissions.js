'use strict';

//the submissions and the corresponding objects - to be retrieved from server and stored in server
let submissions = []
let drawings = []
let students = []
let teacher = {};

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
		
		const url2 = '/teacher-submissions/for/' + teacher._id;
		fetch(url2)
		.then((res) => { 
			if (res.status === 200) {
			   return res.json() 
		   } else {
				alert('Could not get submissions')
		   }                
		})
		.then((json) => {
			submissions = json.result
			let drawing_ids = []
			for(let submission of submissions){
				drawing_ids.push(submission.drawing_id);
			}
			
			const url3 = '/drawings/specificlist';
			const request = new Request(url3, {
				method: 'post', 
				body: JSON.stringify({ drawing_ids }),
				headers: {
					'Accept': 'application/json, text/plain, */*',
					'Content-Type': 'application/json'
				},
			});
			fetch(request)
			.then((res) => { 
				if (res.status === 200) {
				   return res.json() 
			   } else {
					alert('Could not get drawings')
			   }                
			})
			.then((json) => {
				drawings = json.result;
				
				const url4 = '/teacher-profile/students/' + teacher._id;
				fetch(url4)
				.then((res) => { 
					if (res.status === 200) {
					   return res.json() 
				   } else {
						alert('Could not get students')
				   }                
				})
				.then((json) => {
					students = json.result;
					makeCards();
				}).catch((error) => {
					console.log(error)
				});
			}).catch((error) => {
				console.log(error)
			});
		}).catch((error) => {
			console.log(error)
		});	
    }).catch((error) => {
        console.log(error)
    })
})

//getting the submissions html element and adding children based on the submissions from the server
function makeCards(){
	const allSubmissions = document.querySelector("#submissions");
	for(let submission of submissions){
		const student = getStudent(getDrawing(submission.drawing_id).student_id);
		const drawing = getDrawing(submission.drawing_id);

		//the title, id, author, submit button, and comment area for the submission
		const submissionTitle = document.createElement("h5");
		submissionTitle.className = "card-title";
		submissionTitle.appendChild(document.createTextNode(drawing.title));

		const submissionId = document.createElement("small");
		submissionId.className = "hiddenId";
		submissionId.appendChild(document.createTextNode(submission._id));

		const submissionAuthor = document.createElement("p");
		const authorName = student.first_name + " " + student.last_name;
		submissionAuthor.appendChild(document.createTextNode(authorName));

		const textArea = document.createElement("textarea");
		textArea.className = "commentText";
		textArea.setAttribute("name", "comment");
		textArea.setAttribute("rows", "4");
		textArea.setAttribute("cols", "23");
		textArea.innerText = submission.comments;

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
		const cardImg = document.createElement("div");
		cardImg.innerHTML = drawing.svg;
		
		const cardLink = document.createElement("a");
		cardLink.setAttribute("target", "_blank");
		cardLink.setAttribute("href", "javascript:void(0)");
		cardLink.appendChild(cardImg);
		cardLink.addEventListener("click", function(){ window.open().document.body.innerHTML = drawing.svg; });

		const card = document.createElement("div");
		card.className = "card";
		card.appendChild(cardLink);
		card.appendChild(cardBody);
		allSubmissions.appendChild(card);
	}
}


//submitting a comment when the button is pressed
function submitComment(e){
	const submissionId = e.target.parentElement.children[1].textContent;
	setSubmissionComments(submissionId, e.target.previousElementSibling.value);
	
	//hiding the card afterwards
	const card = e.target.parentElement.parentElement;
	card.id = "hide";
}

//getting the appropriate students and drawings based on their id's
function getStudent(id){
	for(let student of students){
		if(student._id === id){
			return student;
		}
	}
}

function getDrawing(id){
	for(let drawing of drawings){
		if(drawing._id === id){
			return drawing;
		}
	}
}

//Code below requires server calls - modifying the data retrieved from the server
function setSubmissionComments(id, comments){
	for(let submission of submissions){
		if(submission._id === id){
			submission.comments = comments;
			submission.marked = true;
			const url = '/teacher-submissions/' + id;
			const request = new Request(url, {
				method: 'post', 
				body: JSON.stringify(submission),
				headers: {
					'Accept': 'application/json, text/plain, */*',
					'Content-Type': 'application/json'
				},
			});
			fetch(request)
			.then((res) => { 
				if (res.status === 200) {
					const url = '/sessions/incremenet-marked/' + submission.session_id;
					const request = new Request(url, {
						method: 'patch', 
						body: JSON.stringify({}),
						headers: {
							'Accept': 'application/json, text/plain, */*',
							'Content-Type': 'application/json'
						},
					});
					fetch(request)
					.then((res) => { 
						if (res.status === 200) {
							return res.json() 
					   } else {
							alert('Could not set session marked submissions')
					   }                
					})
					.catch((error) => {
						console.log(error)
					});
			   } else {
					alert('Could not set submission commentss')
			   }                
			})
			.catch((error) => {
				console.log(error)
			});
		}
	}
}