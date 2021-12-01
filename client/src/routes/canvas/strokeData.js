import { ToolManager } from "./ToolManager";

// deals with all stroke database and socket interactions

export const sendStroke = (shape, data_string) => {
    var formData = new FormData();
    formData.append("shape", shape);
    formData.append("data", data_string);
    // TODO(jen): send stroke to database
    window.socket.emit("drawing", window.room, {
        shape: shape,
        data: data_string
    });
    console.log("sending stroke", formData.getAll("shape"), formData.getAll("data"));
};

export const retrieveStroke = () => {
    // TODO(jen): get strokes from database
    const toolManager = new ToolManager();
    window.socket.on("drawing", (stroke) => {
        toolManager.load(stroke.shape, stroke.data);
    });
};
