import axios from "axios";
import { ToolManager } from "./ToolManager";

// deals with all stroke database and socket interactions

export const sendStroke = (socketObj, shape, data_string) => {
    socketObj.socket.emit("drawing", socketObj.room, {
        brush_shape: shape,
        data_string: data_string
    });
    console.log("sending stroke", shape, data_string);

    axios.post("http://localhost:4200/strokes/save", {
        whiteboard_id: socketObj.room,
        data_string: data_string,
        brush_shape: shape
    });
};

export const retrieveStroke = (socketObj) => {
    const toolManager = new ToolManager(socketObj);
    socketObj.socket.on("drawing", (stroke) => {
        console.log(stroke.brush_shape, stroke.data_string);
        toolManager.load(stroke.brush_shape, stroke.data_string);
    });

    axios.get("http://localhost:4200/strokes/get/" + socketObj.room).then((response) => {
        for (var stroke of response.data) {
            toolManager.load(stroke.brush_shape, stroke.data_string);
        }
    });
};
