'use strict';

// Variable storing session object info
// Hardcoded for now, will be retrieved from a database for Phase 2
let sessions = [
    {session_id: '100',
     teacher_id: '1123',
     title: 'Shapes',
     date: 'Friday, October 5, 2018',
     submissions_page: 'teacherSubmissions.html',
     marked_submissions: 30,
     total_submissions: 30,
     open: false},
    {session_id: '101',
     teacher_id: '1123',
     title: 'Logos',
     date: 'Monday, October 8, 2018',
     submissions_page: 'teacherSubmissions.html',
     marked_submissions: 20,
     total_submissions: 20,
     open: false},
    {session_id: '102',
     teacher_id: '1123',
     title: 'Plants',
     date: 'Tuesday, October 9, 2018',
     submissions_page: 'teacherSubmissions.html',
     marked_submissions: 40,
     total_submissions: 40,
     open: false},
    {session_id: '103',
     teacher_id: '1123',
     title: 'Automobiles',
     date: 'Wednesday, October 10, 2018',
     submissions_page: 'teacherSubmissions.html',
     marked_submissions: 20,
     total_submissions: 20,
     open: false},
    {session_id: '104',
     teacher_id: '1123',
     title: 'Trains',
     date: 'Thursday, October 11, 2018',
     submissions_page: 'teacherSubmissions.html',
     marked_submissions: 30,
     total_submissions: 30,
     open: true},
    {session_id: '105',
     teacher_id: '1123',
     title: 'Animals',
     date: 'Friday, October 12, 2018',
     submissions_page: 'teacherSubmissions.html',
     marked_submissions: 0,
     total_submissions: 3,
     open: true}
];

// Variable to access sessions row
const sessionsRow = document.querySelector('main').querySelector('.row');

// Add initial sessions in order
for (let i = 0; i < sessions.length; ++i)
    addSessionToDOM(sessions[i]);

// Add session when user clicks blue 'plus' button
function addSession() {
    let newSessionName = prompt('Please enter a name for the new session:', 'New Session');
    if (newSessionName != null && newSessionName != '') {
        // In Phase 2, IDs, date and submissions page link will be generated dynamically
        const session = {
            session_id: '106',
            teacher_id: '1123',
            title: newSessionName,
            date: 'Wednesday, November 7, 2018',
            submissions_page: 'teacherSubmissions.html',
            marked_submissions: 0,
            total_submissions: 0,
            open: true
        };

        addSessionToDOM(session);

        const fullUrl = `newsession.html?id=${session.session_id}&title=${session.title}`;
        window.open(fullUrl, '_blank');
    }
}

// Add session to the front of the row
function addSessionToDOM(session) {
    const card = document.createElement('div');
    card.className = 'card gray-bg';

    const body = document.createElement('div');
    body.className = 'card-body';

    const titleLink = document.createElement('a');
    titleLink.setAttribute('target', '_blank');
    titleLink.setAttribute('href', session.submissions_page);
    const titleHeader = document.createElement('h5');
    titleHeader.className = 'card-title';
    titleHeader.appendChild(document.createTextNode(session.title));
    titleLink.appendChild(titleHeader);
    body.appendChild(titleLink);

    const date = document.createElement('p');
    date.className = 'card-text';
    const dateSmall = document.createElement('small');
    dateSmall.className = 'text-muted';
    dateSmall.appendChild(document.createTextNode(session.date));
    date.appendChild(dateSmall);
    body.appendChild(date);

    const markedMsg = document.createElement('p');
    markedMsg.className = 'card-text';
    const markedMsgSmall = document.createElement('small');
    markedMsgSmall.className = (session.marked_submissions === session.total_submissions) ?
        'text-success' : 'text-danger';
    const markedMsgText = `${session.marked_submissions} out of ${session.total_submissions} submissions have been marked.`;
    markedMsgSmall.appendChild(document.createTextNode(markedMsgText));
    markedMsg.appendChild(markedMsgSmall);
    body.appendChild(markedMsg);

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

    const statusLabel = statusBar.querySelector('p');
    statusLabel.className = 'card-text text-info';
    statusLabel.innerHTML = 'CLOSED';

    statusBar.removeChild(button);
}