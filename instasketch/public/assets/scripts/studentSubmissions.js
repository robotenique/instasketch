'use strict';

//the submissions and the corresponding objects - to be retrieved from server
let submissions = []
let sessions = []
let drawings = []
let student = {}

document.addEventListener('DOMContentLoaded', function() {
	const url = '/student-profile/student';

    fetch(url)
    .then((res) => { 
        if (res.status === 200) {
           return res.json() 
       } else {
            alert('Could not get student')
       }                
    })
    .then((json) => {
        student = json.result;
		
		const url2 = '/student-submissions/for/' + student._id;
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
			let session_ids = []
			for(let submission of submissions){
				session_ids.push(submission.session_id);
			}
			
			const url3 = '/sessions/specificlist';
			const request = new Request(url3, {
				method: 'post', 
				body: JSON.stringify({ session_ids }),
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
					alert('Could not get sessions')
			   }                
			})
			.then((json) => {
				sessions = json.result;
				
				let drawing_ids = []
				for(let submission of submissions){
					drawing_ids.push(submission.drawing_id);
				}
				
				const url4 = '/drawings/specificlist';
				const request2 = new Request(url4, {
					method: 'post', 
					body: JSON.stringify({ drawing_ids }),
					headers: {
						'Accept': 'application/json, text/plain, */*',
						'Content-Type': 'application/json'
					},
				});
				fetch(request2)
				.then((res) => { 
					if (res.status === 200) {
					   return res.json() 
				   } else {
						alert('Could not get drawings')
				   }                
				})
				.then((json) => {
					drawings = json.result;
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

function makeCards(){
	const allSubmissions = document.querySelector("#submissions");
	for(let submission of submissions){
		const drawing = getDrawing(submission.drawing_id);
		
		const submissionTitle = document.createElement("h5");
		submissionTitle.className = "card-title";
		submissionTitle.appendChild(document.createTextNode(drawing.title));
		
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
		cardBody.appendChild(submissionSession);
		cardBody.appendChild(textArea);
		
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

function getDrawing(id){
	for(let drawing of drawings){
		if(drawing._id === id){
			return drawing;
		}
	}
}

function getSession(id){
	for(let session of sessions){
		if(session._id === id){
			return session;
		}
	}
}