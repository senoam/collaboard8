import { loadFreehand } from "./drawFreehand";

// deals with all stroke database interactions

export const sendStroke = (shape, data_string) => {
  var formData = new FormData();
  formData.append('shape', shape);
  formData.append('data', data_string);
  // TODO(jen): send stroke to database
  window.socket.emit("drawing", window.room, data_string);
  console.log("sending stroke", formData.getAll('data'))
};

export const retrieveStroke = () => {
  // TODO(jen): get strokes from database
  window.socket.on("drawing", (data_string) => {
    loadFreehand(window.canvasRef.current, data_string);
  });
};
