import React, { createRef, useEffect } from "react";
import { io } from "socket.io-client";
import "./WhiteboardCanvas.css";
import { retrieveStroke } from "./tools/strokeData";
import { drawingHandler } from "./tools/DrawingHandler";

function WhiteboardCanvas(props) {
    // To get the actual canvas element, use "this.canvasRef.current"
    window.canvasRef = createRef();

    useEffect(() => {
        window.socket = io("http://localhost:4000");
        window.socket.emit("join_room", props.room);

        const canvas = window.canvasRef.current;
        drawingHandler(canvas);
    }, [props.room]);

    useEffect(() => {
        const canvas = window.canvasRef.current;
        const context = canvas.getContext("2d");

        context.strokeStyle = props.brush.color;
        context.lineWidth = props.brush.size;
        window.tool = props.brush.type;

        retrieveStroke();
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
