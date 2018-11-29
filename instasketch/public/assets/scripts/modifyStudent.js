'use strict';

const finishButton = document.querySelector("#btn1");

finishButton.addEventListener("click", goBack);

/** After finish button, user goes back to admin page.
  * Modification needs to happen in this file.
  * goBack(e) should apply the changes that user made on the page
  * and bring those modified data to the database on the server.
  */
function goBack(e) {
  e.preventDefault;
  if (e.target.type === "submit") {
    // window.history.back();  <- cannot use this for now due to lack of backend
    window.location.href = "admin.html";
  }
}
