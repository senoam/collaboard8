// given a canvas and data_string, loads the circle drawing
export const load = (canvas, data) => {
    const context = canvas.getContext("2d");

    const coords = data.split(";");
    var xy1 = coords[0].split(",");
    var xy2 = coords[1].split(",");

    draw(context, xy1[0], xy1[1], xy2[0], xy2[1]);
};

// handles circle drawing
// circle drawing math from https://stackoverflow.com/questions/21594756/drawing-circle-ellipse-on-html5-canvas-using-mouse-events
export const draw = (context, x0, y0, x1, y1) => {
    const radiusX = (x1 - x0) * 0.5;
    const radiusY = (y1 - y0) * 0.5;
    const centerX = parseFloat(x0) + parseFloat(radiusX);
    const centerY = parseFloat(y0) + parseFloat(radiusY);
    const step = 0.01;
    var a = step;
    const pi2 = Math.PI * 2 - step;
    context.beginPath();
    context.moveTo(centerX + radiusX * Math.cos(0), centerY + radiusY * Math.sin(0));
    for (; a <= pi2; a += step) {
        context.lineTo(centerX + radiusX * Math.cos(a), centerY + radiusY * Math.sin(a));
    }
    context.stroke();
    context.closePath();
};
