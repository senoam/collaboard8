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

    axios.delete("http://localhost:4200/strokes/clean_undo_redo/" + socketObj.room, {
        whiteboard_id: socketObj.room
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

    socketObj.socket.on("undo", () => {
        const canvas = window.canvasRef.current;
        const context = canvas.getContext("2d");

        context.clearRect(0, 0, canvas.width, canvas.height);
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

export function undoStroke(socketObj) {
    const canvas = window.canvasRef.current;
    const context = canvas.getContext("2d");
    axios
        .post("http://localhost:4200/strokes/undo", {
            whiteboard_id: socketObj.room
        })
        .then(() => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            retrieveStroke(socketObj);
        });

    socketObj.socket.emit("undo", socketObj.room);
}

export function redoStroke(socketObj) {
    axios
        .post("http://localhost:4200/strokes/redo", {
            whiteboard_id: socketObj.room
        })
        .then((response) => response.data)
        .then((data) => {
            if (data === "") return; // nothing to redo
            const toolManager = new ToolManager(socketObj);
            toolManager.load(
                data.data_string,
                data.brush_shape,
                data.brush_colour,
                data.brush_size
            );
            socketObj.socket.emit("drawing", socketObj.room, {
                data_string: data.data_string,
                brush_shape: data.brush_shape,
                brush_colour: data.brush_colour,
                brush_size: data.brush_size
            });
        });
}
