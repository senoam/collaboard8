import axios from "axios";
import { ToolManager } from "./ToolManager";

// deals with all stroke database and socket interactions

export const sendStroke = (socketObj, brush_shape, data_string) => {
    const canvas = window.canvasRef.current;
    const context = canvas.getContext("2d");
    const brush_colour = context.strokeStyle;
    const brush_size = context.lineWidth;

    socketObj.socket.emit("drawing", socketObj.room, {
        data_string: data_string,
        brush_shape: brush_shape,
        brush_colour: brush_colour,
        brush_size: brush_size
    });

    axios.post("http://localhost:4200/strokes/save", {
        whiteboard_id: socketObj.room,
        data_string: data_string,
        brush_shape: brush_shape,
        brush_colour: brush_colour,
        brush_size: brush_size
    });
};

export const retrieveStroke = (socketObj) => {
    const toolManager = new ToolManager(socketObj);
    socketObj.socket.on("drawing", (stroke) => {
        toolManager.load(
            stroke.data_string,
            stroke.brush_shape,
            stroke.brush_colour,
            stroke.brush_size
        );
    });

    axios.get("http://localhost:4200/strokes/get/" + socketObj.room).then((response) => {
        for (var stroke of response.data) {
            toolManager.load(
                stroke.data_string,
                stroke.brush_shape,
                stroke.brush_colour,
                stroke.brush_size
            );
        }
    });
};
