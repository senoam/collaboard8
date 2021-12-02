import { ToolManager } from "./ToolManager";
import { getMousePos } from "./utils";

export const drawingHandler = (socketObj, canvas) => {
    const context = canvas.getContext("2d");
    var data_string = "";
    var isDrawing = false;

    var start;
    var previous;
    var current;

    var canvasState = context.getImageData(0, 0, canvas.width, canvas.height);
    const toolManager = new ToolManager(socketObj);

    const onStrokeStart = (e) => {
        // Save the canvas state before adding our own work
        canvasState = context.getImageData(0, 0, canvas.width, canvas.height);

        isDrawing = true;
        start = getMousePos(canvas, e);
        current = start;
        previous = current;
        data_string = toolManager.log("start", data_string, start.x, start.y);
    };

    const onStrokeEnd = (e) => {
        if (!isDrawing) return;
        isDrawing = false;

        current = getMousePos(canvas, e);
        toolManager.draw(context, start, previous, current);

        canvasState = context.getImageData(0, 0, canvas.width, canvas.height);

        data_string = toolManager.log("end", data_string, current.x, current.y);
    };

    const onStrokeContinue = (e) => {
        if (!isDrawing) return;

        if (!toolManager.saveAllStrokes) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.putImageData(canvasState, 0, 0);
        }

        current = getMousePos(canvas, e);
        toolManager.draw(context, start, previous, current);
        previous = current;

        data_string = toolManager.log("continue", data_string, current.x, current.y);
    };

    canvas.addEventListener("mousedown", onStrokeStart, false);
    canvas.addEventListener("mouseup", onStrokeEnd, false);
    canvas.addEventListener("mouseout", onStrokeEnd, false);
    canvas.addEventListener("mousemove", onStrokeContinue, false);
};
