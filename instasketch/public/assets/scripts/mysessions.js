'use strict';
const log = console.log;

// Static arrays for constructing formatted date strings
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Variable to access sessions row
const sessionsRow = document.querySelector('main').querySelector('.row');

// Variable storing session object info
let sessions = [];

// Retrieve list of sessions for currently logged in teacher
const allSessionsRequest = new Request('/sessions/completelist', { method: 'get' });

fetch(allSessionsRequest).then((res) => {
    if (res.status === 200) {
        return res.json();
    } else {
        alert('Could not retrieve sessions for current user');
    }
}).then((json) => {
    sessions = json.result;

    // Sort list of sessions in increasing order of date
    sessions.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Add initial sessions in order
    for (let i = 0; i < sessions.length; ++i)
        addSessionToDOM(sessions[i]);

}).catch((error) => {
    log(error);
})

// Add session when user clicks blue 'plus' button
function addSession() {
    let newSessionName = prompt('Please enter a name for the new session:', 'New Session');
    if (newSessionName != null && newSessionName != '') {
        // Create a new session with the given name
        const newSessionRequest = new Request('/sessions/new', {
            method: 'post',
            body: JSON.stringify({'title': newSessionName}),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        });

        let newSession = null;

        fetch(newSessionRequest).then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert('Could not create new session');
            }
        }).then((json) => {
            newSession = json.result;
            addSessionToDOM(newSession);

            // Pass the id to the New Session page via the URL.
            const fullUrl = `/newsession?id=${newSession._id}`;
            window.open(fullUrl, '_blank');

        }).catch((error) => {
            log(error);
        })
    }
}

// Add session to the front of the row
function addSessionToDOM(session) {
    const card = document.createElement('div');
    card.className = 'card gray-bg';

    const body = document.createElement('div');
    body.className = 'card-body';

    // Add (invisible to user) session id element to body
    const sessionId = document.createElement('h5');
    sessionId.className = 'hiddenId';
    sessionId.appendChild(document.createTextNode(session._id));
    body.appendChild(sessionId);

    // Add header to body
    const titleHeader = document.createElement('h5');
    titleHeader.className = 'card-title';
    titleHeader.appendChild(document.createTextNode(session.title));
    body.appendChild(titleHeader);

    // Create formatted date string from date object
    const dateObj = new Date(session.date);
    const dayOfWeek = daysOfWeek[dateObj.getDay()];
    const month = months[dateObj.getMonth()];
    const dayOfMonth = dateObj.getDate();
    const year = dateObj.getFullYear();
    const dateStr = `${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`;

    // Add date to body
    const date = document.createElement('p');
    date.className = 'card-text';
    const dateSmall = document.createElement('small');
    dateSmall.className = 'text-muted';
    dateSmall.appendChild(document.createTextNode(dateStr));
    date.appendChild(dateSmall);
    body.appendChild(date);

    // Add submissions marked message to body
    const markedMsg = document.createElement('p');
    markedMsg.className = 'card-text';
    const markedMsgSmall = document.createElement('small');
    markedMsgSmall.className = (session.marked_submissions === session.total_submissions) ?
        'text-success' : 'text-danger';
    const markedMsgText = `${session.marked_submissions} out of ${session.total_submissions} submissions have been marked.`;
    markedMsgSmall.appendChild(document.createTextNode(markedMsgText));
    markedMsg.appendChild(markedMsgSmall);
    body.appendChild(markedMsg);

    // Add status bar to body
    const statusBar = document.createElement('div');
    statusBar.className = 'status-bar';

    const statusLabel = document.createElement('p');
    statusLabel.className = 'card-text ' + (session.open ? 'text-primary' : 'text-info');
    const statusText = session.open ? 'OPEN' : 'CLOSED';
    statusLabel.appendChild(document.createTextNode(statusText));
    statusBar.appendChild(statusLabel);

    if (session.open) {
        const button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.setAttribute('title', 'Close this session');
        button.addEventListener('click', closeSession);

        button.className = 'btn btn-primary';
        button.appendChild(document.createTextNode('Close'));
        statusBar.appendChild(button);
    }

    body.appendChild(statusBar);
    card.appendChild(body);

    // Add session card to the front of the row
    const currentCards = sessionsRow.querySelectorAll('.card');
    if (!currentCards)
        sessionsRow.appendChild(card);
    else
        sessionsRow.insertBefore(card, currentCards[0]);
}

// Close an open session when user clicks its 'Close' button
function closeSession(e) {
    const button = e.target;
    const statusBar = button.parentElement;
    const cardBody = statusBar.parentElement;

    const sessionId = cardBody.querySelector('.hiddenId').innerHTML;

    const closeRequest = new Request('/sessions/close-session/' + sessionId, { method: 'PATCH' });

    fetch(closeRequest).then((res) => {
        if (res.status === 200) {
            return res.json();
        } else {
            alert('Could not set session status to closed');
        }
    }).then((json) => {
        const statusLabel = statusBar.querySelector('p');
        statusLabel.className = 'card-text text-info';
        statusLabel.innerHTML = 'CLOSED';

        statusBar.removeChild(button);
    }).catch((error) => {
        log(error);
    })
}