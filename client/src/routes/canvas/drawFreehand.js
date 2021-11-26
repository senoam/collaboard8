import { logData, getMousePos } from "./utils";
import { sendStroke } from "./strokeData";

// handles freehand drawing
export const drawFreehand = (canvas, context) => {
  var data_string = ""
  var isDrawing = false;
  var current;

  const onStrokeStart  = (e) => {
    current = getMousePos(canvas, e);
    isDrawing = true;
    data_string = logData(data_string, current.x, current.y);
  }

  const onStrokeEnd  = (e) => {
    if (!isDrawing) return;
    isDrawing = false;
    const pos = getMousePos(canvas, e);
    draw(context, current.x, current.y, pos.x, pos.y);
    data_string = logData(data_string, pos.x, pos.y);
    sendStroke("freehand", data_string)
    data_string = ""
  }

  const onStrokeContinue  = (e) => {
    if (!isDrawing) return;
    const pos = getMousePos(canvas, e);
    draw(context, current.x, current.y, pos.x, pos.y);
    current = getMousePos(canvas, e);
    data_string = logData(data_string, pos.x, pos.y);
    if (data_string.length > 900) {
      sendStroke("freehand", data_string)
      data_string = ""
    }
  }

  canvas.addEventListener('mousedown', onStrokeStart, false);
  canvas.addEventListener('mouseup', onStrokeEnd, false);
  canvas.addEventListener('mouseout', onStrokeEnd, false);
  canvas.addEventListener('mousemove', onStrokeContinue, false);
}

// given a canvas and data_string, loads the freehand drawing
export const loadFreehand = (canvas, data_string) => {
  const context = canvas.getContext("2d")
  const data = data_string.split(';')
  var current = data[0].split(',')
  for (const coord of data.splice(1)) {
    var pos = coord.split(',');
    draw(context, current[0], current[1], pos[0], pos[1]);
    current = pos;
  }
}

const draw = (context, x0, y0, x1, y1) => {
  context.beginPath();
  context.moveTo(x0, y0);
  context.lineTo(x1, y1);
  context.stroke();
  context.closePath();
}
