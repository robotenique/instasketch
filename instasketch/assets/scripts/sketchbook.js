/* Javascript code for the Sketchbook view */

// The canvas of the sketchbook itself
let canvas;
/* Srack to hold the paths in the canvas (undo + redo functionality)
   MAX items = 30 actions
*/
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

/* Clear Sketch button */
$("#colorpicker > .clear-sketch").on("click", function (e) {
    canvas.clear();
    canvas.backgroundColor = '#ffffff';
    canvas.isDrawingMode = 1;
    canvas.freeDrawingCursor = "crosshair";
    canvas.freeDrawingBrush.color = "red";
    canvas.freeDrawingBrush.width = 10;
    pathQueue = []
    updateColorButtonBorder($("#colorpicker button:first-child"))
    canvas.renderAll();
})

/* Main canvas: Colors, Tools and other event listeners */
$(function () {
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
    $("#tools").on("click", "#redo", function (e) {
        const lastPath = pathStack.pop();
        if (lastPath != undefined) {
            canvas.getObjects('path').forEach((path) => {
                if (path.id === lastPath.id) {
                    canvas.remove(path);
                }
            });
        }
    });
});





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
