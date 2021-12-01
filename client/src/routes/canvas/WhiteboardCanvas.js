import React, { createRef, useEffect } from "react";
import { io } from "socket.io-client";
import "./WhiteboardCanvas.css";
import { retrieveStroke } from "./strokeData";
import { drawFreehand } from "./drawFreehand";

function WhiteboardCanvas(props) {
    // To get the actual canvas element, use "this.canvasRef.current"
    window.canvasRef = createRef();
    window.room = props.room;
    window.socket = io("http://localhost:4000");
    window.socket.emit("join_room", window.room);

    useEffect(() => {
        const canvas = window.canvasRef.current;
        const context = canvas.getContext("2d");

        context.strokeStyle = props.brush.color;
        context.lineWidth = props.brush.size;

        retrieveStroke();
        drawFreehand();
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
