/* Javascript code for the Sketchbook view */

// The canvas of the sketchbook itself
let canvas;

/* Stack to hold the paths in the canvas (undo + redo functionality)
   MAX items = 30 actions */
let pathStack = [];


const defaultColor = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00",
                        "#0000FF", "#4B0082", "#9400D3", "#000000"]

$("#colorpicker > button.color").each(function(index) {
    this.value = defaultColor[index];
    $(this).css("background-color", defaultColor[index]);
});

let lastColorBtnClicked = $("#colorpicker button:first-child");
$("#colorpicker button:first-child")
    .css("border-color", "#000000")
    .css("border-width", "3px");

/* Main jquery context */

$(function () {
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
     });
    /* Eraser functionality */
    $("#colorpicker").on("click", ".eraser", function (e) {
        console.log("Eraser selected!");
        canvas.freeDrawingBrush.width = 20;
        canvas.freeDrawingBrush.color = "#ffffff";
        updateColorButtonBorder(e.target);
    });
    /* Color selection functionality */
    $("#colorpicker").on("click", ".color", function (e) {
        console.log("Color selected!");
        canvas.freeDrawingBrush.width = 10;
        updateColorButtonBorder(e.target);
        canvas.freeDrawingBrush.color = e.target.value;
        canvas.renderAll();
    });
    /* Undo tool functionality */
    $("#tools").on("click", "#undo", function (e) {
        const lastPath = pathStack.pop();
        if (lastPath != undefined) {
            canvas.getObjects('path').forEach((path) => {
                if (path.id === lastPath.id) {
                    canvas.remove(path);
                }
            });
        }
    });
    /* Redo tool functionality */
    $("#tools").on("click", "#redo", function (e) {
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
        pathQueue = []
        updateColorButtonBorder($("#colorpicker button:first-child"))
        canvas.renderAll();

    });
    /* ------------ Avaliable sessions Dropdown functionality ------------ */
    // Get sessions below from server (require server call)
    const sessions = [{
        session_id: "1",
        session_name: "Automobiles"
    }, {
        session_id: "2",
        session_name: "Animals"
    }];

    let sessionsDropdown = $("#availableSessions");
    // List of elements in the sessionsDropdown
    let dropdownList = [];
    // The element of the dropdown list with the 'active' class
    let activeSession;

    for (const [idx, s] of sessions.entries()) {
        const currOption = $("<a>", {
            'class': `dropdown-item ${idx === 0 ? "active" : ""}`,
            'href': "javascript:void(0)",
        }).append(s.session_name);
        if (idx === 0) {
            activeSession = currOption;
            $("#dropdownMenuButton").text(currOption.text());
        }
        dropdownList.push(currOption);
        currOption.appendTo(sessionsDropdown);
    }

    $(sessionsDropdown).on("click", ".dropdown-item", function () {
        if (!$(this).hasClass("active")) {
            $(activeSession).removeClass("active");
            $(this).addClass("active");
            activeSession = this;
            $("#dropdownMenuButton").text($(this).text());
        }
    });
    $("#submitSketch").on("click", function () {
        // How to get the original object??
    })
});

/* AUXILIAR FUNCTIONS */
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