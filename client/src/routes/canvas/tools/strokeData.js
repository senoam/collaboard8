import { ToolManager } from "./ToolManager";

// deals with all stroke database and socket interactions

export const sendStroke = (socketObj, shape, data_string) => {
    var formData = new FormData();
    formData.append("shape", shape);
    formData.append("data", data_string);
    // TODO(jen): send stroke to database
    socketObj.socket.emit("drawing", socketObj.room, {
        shape: shape,
        data: data_string
    });
    console.log("sending stroke", formData.getAll("shape"), formData.getAll("data"));
};

export const retrieveStroke = (socketObj) => {
    // TODO(jen): get strokes from database
    const toolManager = new ToolManager(socketObj);
    socketObj.socket.on("drawing", (stroke) => {
        console.log(stroke.shape, stroke.data);
        toolManager.load(stroke.shape, stroke.data);
    });
};
