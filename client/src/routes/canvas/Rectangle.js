import { logData, getMousePos } from "./utils";
import { sendStroke } from "./strokeData";

export const render = (canvas) => {
    const context = canvas.getContext("2d");
    var data_string = "";
    var isDrawing = false;

    var start = { x: 0, y: 0 };

    var canvasState = context.getImageData(0, 0, canvas.width, canvas.height);

    const onStrokeStart = (e) => {
        start = getMousePos(canvas, e);
        isDrawing = true;

        data_string = logData(data_string, start.x, start.y);
    };

    const onStrokeEnd = (e) => {
        if (!isDrawing) return;
        isDrawing = false;

        const pos = getMousePos(canvas, e);
        draw(context, start.x, start.y, pos.x, pos.y);
        canvasState = context.getImageData(0, 0, canvas.width, canvas.height);

        data_string = logData(data_string, pos.x, pos.y);
        sendStroke("rectangle", data_string);
        data_string = "";
    };

    const onStrokeContinue = (e) => {
        if (!isDrawing) return;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.putImageData(canvasState, 0, 0);

        const pos = getMousePos(canvas, e);
        draw(context, start.x, start.y, pos.x, pos.y);
    };

    canvas.addEventListener("mousedown", onStrokeStart, false);
    canvas.addEventListener("mouseup", onStrokeEnd, false);
    canvas.addEventListener("mouseout", onStrokeEnd, false);
    canvas.addEventListener("mousemove", onStrokeContinue, false);
};

export const load = (canvas, data) => {
    console.log(data);
    const context = canvas.getContext("2d");

    const coords = data.split(";");
    var xy1 = coords[0].split(",");
    var xy2 = coords[1].split(",");

    draw(context, xy1[0], xy1[1], xy2[0], xy2[1]);
};

const draw = (context, x0, y0, x1, y1) => {
    context.beginPath();
    context.fillRect(x0, y0, x1 - x0, y1 - y0);
    context.stroke();
    context.closePath();
};
