'use strict';
const log = console.log;

// Variable to access drawings row
const drawingsRow = document.querySelector('main').querySelector('.row');

// Retrieve list of drawings for currently logged in student
const allDrawingsRequest = new Request('/drawings/completelist', { method: 'get' });

fetch(allDrawingsRequest).then((res) => {
    if (res.status === 200) {
        return res.json();
    } else {
        alert('Could not retrieve drawings for current user!');
    }
}).then((json) => {
    const drawings = json.result;

    // Sort list of drawings in increasing order of date
    drawings.sort((a, b) => new Date(a.creation_date) - new Date(b.creation_date));

    // Add drawings in order
    for (let i = 0; i < drawings.length; ++i)
        addDrawing(drawings[i]);

}).catch((error) => {
    log(error);
})

// Add drawing to the front of the row
function addDrawing(drawing) {
    const card = document.createElement('div');
    card.className = 'card';

    const body = document.createElement('div');
    body.className = 'card-body';

    // Create image with link to full screen version
    const image = document.createElement('div');
    image.className = 'card-img-top';
    image.innerHTML = drawing.svg;
    
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'javascript:void(0)');
    link.appendChild(image);

    link.addEventListener('click', () => {
        window.open().document.body.innerHTML = drawing.svg;
    })

    body.appendChild(link);

    // Add image title to body
    const titleHeader = document.createElement('h5');
    titleHeader.className = 'card-title';
    const titleText=  document.createTextNode(drawing.title);
    titleHeader.appendChild(titleText);
    body.appendChild(titleHeader);

    // Add submission status to body
    const submissionStatus = document.createElement('p');
    submissionStatus.className = 'card-text';
    const submissionStatusSmall = document.createElement('small');
    submissionStatusSmall.className = drawing.submitted ? 'text-success' : 'text-danger';
    const submissionStatusText = drawing.submitted ? 'Submitted' : 'Not submitted';
    submissionStatusSmall.appendChild(document.createTextNode(submissionStatusText));
    submissionStatus.appendChild(submissionStatusSmall);
    body.appendChild(submissionStatus);

    // Add creation time message to body
    const creationTime = document.createElement('p');
    creationTime.className = 'card-text';
    const creationTimeSmall = document.createElement('small');
    creationTimeSmall.className = 'text-muted';
    creationTimeSmall.appendChild(document.createTextNode(getTimeDiffText(drawing)));
    creationTime.appendChild(creationTimeSmall);
    body.appendChild(creationTime);

    card.appendChild(body);

    const currentCards = drawingsRow.querySelectorAll('.card');
    if (!currentCards)
        drawingsRow.appendChild(card);
    else
        drawingsRow.insertBefore(card, currentCards[0]);
}

function getTimeDiffText(drawing) {
    const currentTime = new Date();
    const creationTime = new Date(drawing.creation_date);
    const timeDiff = currentTime.getTime() - creationTime.getTime();

    const timeDiffInMinutes = Math.floor(timeDiff / 60000);
    if (timeDiffInMinutes < 60)
        return (timeDiffInMinutes === 1) ? 
            `Created ${timeDiffInMinutes} minute ago` : 
            `Created ${timeDiffInMinutes} minutes ago`;

    const timeDiffInHours = Math.floor(timeDiffInMinutes / 60);
    if (timeDiffInHours < 24)
        return (timeDiffInHours === 1) ? 
            `Created ${timeDiffInHours} hour ago` : 
            `Created ${timeDiffInHours} hours ago`;

    const timeDiffInDays = Math.floor(timeDiffInHours / 24);
    return (timeDiffInDays === 1) ? 
        `Created yesterday` : 
        `Created ${timeDiffInDays} days ago`;
}
