"use strict";

/* When user clicks on teacher option, it shows specific form for professors */
const radioButtons = document.querySelectorAll('input[name="typeuser"]');
const tcode = document.querySelector("#teachercode");
const tcode_display = tcode.style.display;
const teachersList = document.querySelector("#teachers");
const teachersList_display = teachersList.style.display;
// By default, the teacher code input shouldn't appear
tcode.style.display = "none";
let prev = null;
for(let i = 0; i < radioButtons.length; i++) {
    radioButtons[i].onclick = function() {
        (prev)? console.log(prev.value):null;
        if(this !== prev) {
            prev = this;
        }
        if (this.value != "teacher") {
			tcode.style.display = "none";
			teachersList.style.display = teachersList_display;			
        } 
        else {
			tcode.style.display = tcode_display;
			teachersList.style.display = "none";			
        }
    };
}
