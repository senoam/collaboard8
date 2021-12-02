// given a canvas and data_string, loads the freehand drawing
export const load = (canvas, data_string) => {
    const context = canvas.getContext("2d");
    const data = data_string.split(";");
    var current = data[0].split(",");
    for (const coord of data.splice(1)) {
        var pos = coord.split(",");
        draw(context, current[0], current[1], pos[0], pos[1]);
        current = pos;
    }
};

// handles freehand drawing
export const draw = (context, x0, y0, x1, y1) => {
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.stroke();
    context.closePath();
};
