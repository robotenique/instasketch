'use strict';
const log = console.log;

/* Retrieve the new session's ID */
const windowURL = new URL(window.location.href);
const sessionId = windowURL.searchParams.get('id');

/* Use the ID to retrieve the title of the session */
const request = new Request('/sessions/' + sessionId, { method: 'get' });

fetch(request).then((res) => {
    if (res.status === 200) {
        return res.json();
    } else {
        alert(`Could not retrieve session with id ${sessionId}`);
    }
}).then((json) => {
    const sessionTitle = json.result['title'];

    /* Variable to access session info container */
    const sessionInfo = document.querySelector('#sessionInfo');

    /* Create session info elements */
    const titleHeader = document.createElement('h1');
    const titleStrong = document.createElement('strong');
    titleStrong.appendChild(document.createTextNode('Session: '));
    titleHeader.appendChild(titleStrong);
    titleHeader.appendChild(document.createTextNode(sessionTitle));

    const instructionsDiv = document.createElement('div');
    instructionsDiv.id = 'instructions';
    const instructions = document.createElement('p');
    const instructionsText = 'Make sure you submit to this session from the sketchbook menu!';
    instructions.appendChild(document.createTextNode(instructionsText));
    instructionsDiv.appendChild(instructions);

    /* Add session info elements */
    sessionInfo.appendChild(titleHeader);
    sessionInfo.appendChild(instructionsDiv);

}).catch((error) => {
    log(error);
})

