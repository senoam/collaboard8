import * as ToolManager from "./ToolManager";

// deals with all stroke database interactions

export const sendStroke = (shape, data_string) => {
    var formData = new FormData();
    formData.append("shape", shape);
    formData.append("data", data_string);
    // TODO(jen): send stroke to database
    window.socket.emit("drawing", window.room, {
        shape: shape,
        data: data_string
    });
    console.log("sending stroke", formData.getAll("data"));
    console.log("sending stroke", formData.getAll("shape"));
};

export const retrieveStroke = () => {
    // TODO(jen): get strokes from database
    window.socket.on("drawing", (stroke) => {
        ToolManager.loadStroke(
            window.canvasRef.current,
            stroke.shape,
            stroke.data
        );
    });
};
