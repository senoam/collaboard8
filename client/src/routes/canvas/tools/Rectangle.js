// given a canvas and data_string, loads the rectangle drawing
export const load = (canvas, data) => {
    const context = canvas.getContext("2d");

    const coords = data.split(";");
    var xy1 = coords[0].split(",");
    var xy2 = coords[1].split(",");

    draw(context, xy1[0], xy1[1], xy2[0], xy2[1]);
};

// handles rectangle drawing
export const draw = (context, x0, y0, x1, y1) => {
    context.beginPath();
    context.rect(x0, y0, x1 - x0, y1 - y0);
    context.stroke();
    context.closePath();
};
