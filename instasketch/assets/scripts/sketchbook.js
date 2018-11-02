var canvas;
const default_colors = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00",
                        "#0000FF", "#4B0082", "#9400D3", "#000000"]
$("#colorpicker > button.color").each(function(index) {
    this.value = default_colors[index];
    $(this).css("background-color", default_colors[index]);
});
$("#colorpicker > .clear-sketch").on("click", function (e) {
    canvas.clear();
    canvas.backgroundColor = '#ffffff';
    canvas.isDrawingMode = 1;
    canvas.freeDrawingCursor = "crosshair";
    canvas.freeDrawingBrush.color = "black";
    canvas.freeDrawingBrush.width = 10;
    canvas.renderAll();
})

$(function () {
    canvas = window._canvas = new fabric.Canvas('canvas');
    canvas.backgroundColor = '#ffffff';
    canvas.isDrawingMode = 1;
    canvas.freeDrawingCursor = "crosshair";
    canvas.freeDrawingBrush.color = "black";
    canvas.freeDrawingBrush.width = 10;
    canvas.renderAll();

    document.getElementById('colorpicker').addEventListener('click', function (e) {
        console.log(e.target.value);
        if (e.target.classList.contains("eraser")) {
            canvas.freeDrawingBrush.width = 20;

        }
        else if(e.target.classList.contains("color")) {
            canvas.freeDrawingBrush.width = 10;
        }
        canvas.freeDrawingBrush.color = e.target.value;
        canvas.renderAll();
        console.log(canvas.freeDrawingBrush.color);
    });
});