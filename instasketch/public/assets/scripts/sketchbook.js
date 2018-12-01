/* Javascript code for the Sketchbook view */
// Current student in the session - supposed to be populated from the server
const currentStudent = {
    id: "123",
    firstName: "Amritpal",
    lastName: "Aujla",
    school: "UofT",
    teacherId: "albus1",
    email: "amritpal.aujla@mail.utoronto.ca",
    password: "blah",
    province: "Ontario",
    pictureURL: "https://dummyimage.com/323x200/ffc163/040838.png"
}


// The canvas of the sketchbook itself
let canvas;

/* Stack to hold the paths in the canvas (undo + redo functionality)
   MAX items = 30 actions */
let pathStack = [];
let undonePathStack = [];


const defaultColor = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00",
                        "#0000FF", "#4B0082", "#9400D3", "#000000"]

                        // Set color values to buttons
$("#colorpicker > button.color").each(function(index) {
    this.value = defaultColor[index];
    $(this).css("background-color", defaultColor[index]);
});

let lastColorBtnClicked = $("#colorpicker button:first-child");
$("#colorpicker button:first-child")
    .css("border-color", "#000000")
    .css("border-width", "3px");

let lastWidthBtnClicked = $("#miscellaneous #medWidthBrush");
$("#miscellaneous #medWidthBrush")
    .css("border-color", "#000000")
    .css("border-width", "3px");

/* Main jquery context */

$.getJSON("/sketchbook/opensessions", function (sessionsResult) {
    /* ------------ Prepare canvas for the first time ------------ */
    canvas = window._canvas = new fabric.Canvas('canvas');
    canvas.backgroundColor = '#ffffff';
    canvas.isDrawingMode = 1;
    canvas.freeDrawingCursor = "crosshair";
    canvas.freeDrawingBrush.color = "red";
    canvas.freeDrawingBrush.width = 10;
    canvas.renderAll();
    /* Add a path to the stack when you draw */
    canvas.on("path:created", function (e) {
        e.path.id = fabric.Object.__uid++
        e.id = e.path.id
        pathStack.push(e);
        // Clear the stack for the 'redo' action
        undonePathStack = [];
     });
    /* Eraser functionality */
    $("#miscellaneous").on("click", ".eraser", function (e) {
        console.log("Eraser selected!");
        canvas.freeDrawingBrush.width = parseInt($(lastWidthBtnClicked).val());
        canvas.freeDrawingBrush.color = "#ffffff";
        updateColorButtonBorder(e.target);
    });
    /* Color selection functionality */
    $("#colorpicker").on("click", ".color", function (e) {
        console.log("Color selected!");
        canvas.freeDrawingBrush.width = parseInt($(lastWidthBtnClicked).val());
        updateColorButtonBorder(e.target);
        canvas.freeDrawingBrush.color = e.target.value;
        canvas.renderAll();
    });
    /* Width selection functionality */
    $("#miscellaneous").on("click", ".widthSelector", function (e) {
        console.log("Width selected!");
        canvas.freeDrawingBrush.width = parseInt($(this).val());
        updateWidthButtonBorder(e.target);
        console.log('canvas.freeDrawingBrush.width', canvas.freeDrawingBrush.width);
        canvas.renderAll();
    });
    /* Undo tool functionality */
    $("#tools").on("click", "#undo", function (e) {
        const lastPath = pathStack.pop();
        if (lastPath != undefined) {
            canvas.getObjects('path').forEach((path) => {
                if (path.id === lastPath.id) {
                    canvas.remove(path);
                    undonePathStack.push(lastPath);
                }
            });
        }
    });
    /* Redo tool functionality */
    $("#tools").on("click", "#redo", function (e) {
        const lastUndonePath = undonePathStack.pop();
        if (lastUndonePath != undefined) {
            canvas.add(lastUndonePath.path);
            pathStack.push(lastUndonePath);
        }
        console.log("Redone!");
    });
    /* Clear sketch button functionality */
    $("#tools").on("click", ".clear-sketch", function (e) {
        canvas.clear();
        canvas.backgroundColor = '#ffffff';
        canvas.isDrawingMode = 1;
        canvas.freeDrawingCursor = "crosshair";
        canvas.freeDrawingBrush.color = "red";
        canvas.freeDrawingBrush.width = 10;
        // Reset here the thickness slider
        pathStack = []
        undonePathStack = []
        updateColorButtonBorder($("#colorpicker button:first-child"));
        updateWidthButtonBorder($("#miscellaneous #medWidthBrush"));
        canvas.renderAll();

    });
    /* ------------ Avaliable sessions Dropdown functionality ------------ */
    // Get sessions below from server (require server call)
    let newSketches = [];

    let sessionsDropdown = $("#availableSessions");
    // List of elements in the sessionsDropdown
    let dropdownList = [];
    // The element of the dropdown list with the 'active' class
    let activeSession = undefined;
    // TODO: Test the sessions
    console.log("SESSION RESULT: ", sessionsResult);
    if(sessionsResult.length !== 0) {
        for (const [idx, s] of sessionsResult.entries()) {
            const currOption = $("<a>", {
                'class': "dropdown-item",
                'href': "javascript:void(0)",
                'id' : s.session_id // the session_id is set as the id of the link!
            }).append(s.session_name);
            dropdownList.push(currOption);
            currOption.appendTo(sessionsDropdown);
        }
    }

    $(sessionsDropdown).on("click", ".dropdown-item", function (e) {
        // If a new inactive session is clicked
        if (!$(this).hasClass("active") && e.target.id !== 'noSessionItem') {
            // Remove the 'active' class from the older item
            $(activeSession != undefined ? activeSession : "#noSessionItem").removeClass("active");
            // Add the active class to the current item
            $(this).addClass("active");
            activeSession = this;
            $("#dropdownMenuButton").text($(this).text());
        }
        // If noSessionItem (inactive) is clicked
        else if (!$(this).hasClass("active") && e.target.id === 'noSessionItem') {
            // Remove the 'active' class from the older item
            $(activeSession != undefined ? activeSession : "#noSessionItem").removeClass("active");
            // Add the active class to the current item
            $(this).addClass("active");
            activeSession = undefined; // This marks that we don't have any session
            $("#dropdownMenuButton").text($(this).text());
        }
    });
    $("#submitAccept").on("click", function () {
        const newSketch = {
            svg : canvas.toSVG(),
            title : $("#drawingTitle").val() !== "" ? $("#drawingTitle").val() : "Untitled Sketch",
            session_id : activeSession != undefined ? activeSession.id : "None", // "None" implies no session!!
            //student_id : currentStudent.id // We can get this in the backend
        }
        // Here we would send the new sketch to the server
        newSketches.push(newSketch);
        $.ajax({
            url: '/sketchbook',
            type: 'POST',
            'content-type': 'application/json',
            data: newSketch, // DON'T JSON.stringfy >:(
            success: function(response){
                console.log("Sucess saving drawing!");
                // Reset canvas by clicking on the clear button
                $("#tools .clear-sketch").trigger("click");
                // Reset title of the drawing
                $("#drawingTitle").val("");
            },
            error: function (response) {
                alert("Error submitting this drawing!");
            }
        });
    });
});

/* ------------------------ AUXILIAR FUNCTIONS ------------------------ */
/* updateColorButtonBorder: Given a new colorButton, this
   function changes the old button style back to normal,
   and apply the new style to the button passed as argument.
*/
function updateColorButtonBorder(newColorButton) {
    /* Don't need to do anything if they're equal */
    if (newColorButton === lastColorBtnClicked)
        return;
    lastColorBtnClicked
        .css("border-color", "#fffff0")
        .css("border-width", "2px");
    $(newColorButton)
        .css("border-color", "#000000")
        .css("border-width", "3px");
    lastColorBtnClicked = $(newColorButton);
}

function updateWidthButtonBorder(newWidthButton) {
    /* Don't need to do anything if they're equal */
    if (newWidthButton === lastWidthBtnClicked)
        return;
    lastWidthBtnClicked
        .css("border-color", "#fffff0")
        .css("border-width", "2px");
    $(newWidthButton)
        .css("border-color", "#000000")
        .css("border-width", "3px");
    lastWidthBtnClicked = $(newWidthButton);
}