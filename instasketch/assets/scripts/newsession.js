'use strict';

/* In Phase 2 this will retrieve passed in data from My Sessions, for now we
 * will use hardcoded values */
// const windowURL = new URL(window.location.href);
// const sessionId = windowURL.searchParams.get('id');
// const sessionTitle = windowURL.searchParams.get('title');
const sessionId = '106';
const sessionTitle = 'Planes';

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
