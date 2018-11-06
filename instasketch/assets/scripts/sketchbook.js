/* Javascript code for the Sketchbook view */

// The canvas of the sketchbook itself
let canvas;
// Queue to hold the paths in the canvas (undo + redo functionality)
let pathQueue = [];

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

$(function () {
    canvas = window._canvas = new fabric.Canvas('canvas');
    canvas.backgroundColor = '#ffffff';
    canvas.isDrawingMode = 1;
    canvas.freeDrawingCursor = "crosshair";
    canvas.freeDrawingBrush.color = "red";
    canvas.freeDrawingBrush.width = 10;
    canvas.renderAll();

    document.getElementById('colorpicker').addEventListener('click', function (e) {
        //console.log(e.target.value);
        if (e.target.classList.contains("eraser")) {
            canvas.freeDrawingBrush.width = 20;
            canvas.freeDrawingBrush.color = "#ffffff";
            updateColorButtonBorder(e.target)

        }
        else if(e.target.classList.contains("color")) {
            canvas.freeDrawingBrush.width = 10;
            updateColorButtonBorder(e.target)
            canvas.freeDrawingBrush.color = e.target.value;
            canvas.renderAll();
        }
        else if(e.target.id === "undo"){
            console.log(pathQueue);
            const lastPath = pathQueue.shift();
            //console.dir(lastPath.id);
            //console.log(lastPath);
            if (lastPath != undefined) {
                canvas.getObjects('path').forEach((path) => {
                    console.log(path.id);
                    if (path.id === lastPath.id) {
                        console.log(path.id);
                    }
                });
            }
        }

        //console.log(canvas.freeDrawingBrush.color);
    });
    canvas.on("path:created", function (e) {
        console.log('path:created');
        console.log(e);
        e.path.id = fabric.Object.__uid++
        e.id = e.path.id
        pathQueue.push(e);
        console.log("ADICIONADO PATH DE ID: ", e.id)
        console.log(pathQueue);
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
