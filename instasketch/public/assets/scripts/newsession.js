'use strict';
const log = console.log;

/* Retrieve the new session's ID */
const windowURL = new URL(window.location.href);
const sessionId = windowURL.searchParams.get('id');

/* Use the ID to retrieve the title of the session */
let sessionTitle = '';
const request = new Request('/sessions/' + sessionId, { method: 'get' });

fetch(request).then((res) => {
    if (res.status === 200) {
        return res.json();
    } else {
        alert(`Could not retrieve session with id ${sessionId}`);
    }
}).then((json) => {
    sessionTitle = json.result['title'];

    /* Variable to access session info container */
    const sessionInfo = document.querySelector('#sessionInfo');

    /* Create session info elements */
    const titleHeader = document.createElement('h1');
    const titleStrong = document.createElement('strong');
    titleStrong.appendChild(document.createTextNode('Session: '));
    titleHeader.appendChild(titleStrong);
    titleHeader.appendChild(document.createTextNode(sessionTitle));

    const idHeader = document.createElement('h2');
    const idStrong = document.createElement('strong');
    idStrong.appendChild(document.createTextNode('ID: '))
    idHeader.appendChild(idStrong);
    idHeader.appendChild(document.createTextNode(sessionId));

    const instructionsDiv = document.createElement('div');
    instructionsDiv.id = 'instructions';
    const instructions = document.createElement('p');
    const instructionsText = 'Use this ID to submit your drawings to this session!';
    instructions.appendChild(document.createTextNode(instructionsText));
    instructionsDiv.appendChild(instructions);

    /* Add session info elements */
    sessionInfo.appendChild(titleHeader);
    sessionInfo.appendChild(idHeader);
    sessionInfo.appendChild(instructionsDiv);

}).catch((error) => {
    log(error);
})

