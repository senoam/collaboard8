import React, { createRef, useEffect } from "react";
import "./WhiteboardCanvas.css";
import { retrieveStroke } from "./tools/strokeData";
import { drawingHandler } from "./tools/DrawingHandler";

function WhiteboardCanvas(props) {
    // To get the actual canvas element, use "this.canvasRef.current"
    window.canvasRef = createRef();
    const socketObj = props.socketObj;
    //socketObj.socket.emit("join_room", socketObj.room);

    useEffect(() => {
        const canvas = window.canvasRef.current;
        drawingHandler(socketObj, canvas);
    }, [socketObj.room]);

    useEffect(() => {
        const canvas = window.canvasRef.current;
        const context = canvas.getContext("2d");

        context.strokeStyle = props.brush.color;
        context.lineWidth = props.brush.size;
        window.tool = props.brush.type;

        retrieveStroke(socketObj);
    });

    return (
        <canvas
            ref={window.canvasRef}
            className="whiteboard-canvas"
            width="1920"
            height="1080"
        ></canvas>
    );
}

export default WhiteboardCanvas;
