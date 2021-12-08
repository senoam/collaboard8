import React, { createRef, useEffect } from "react";
import "./WhiteboardCanvas.css";
import axios from "axios";
import { retrieveStroke } from "./tools/strokeData";
import { drawingHandler } from "./tools/DrawingHandler";

function WhiteboardCanvas(props) {
    // To get the actual canvas element, use "this.canvasRef.current"
    window.canvasRef = createRef();
    const socketObj = props.socketObj;

    var handler;

    const trackHistory = () => {
        var mouse_y = 0;
        var window_top = 0;

        window.addEventListener(
            "mouseout",
            (handler = function (e) {
                mouse_y = e.clientY;

                if (mouse_y < window_top) {
                    console.log("Sending a history POST request.");
                    var timestamp = new Date().getTime();

                    const canvas = window.canvasRef.current;
                    var imgURL = canvas.toDataURL();

                    axios
                        .post("http://localhost:4200/history/add-history", {
                            timestamp: timestamp,
                            whiteboard_id: socketObj.room,
                            buffer: imgURL
                        })
                        .then((response) => {
                            console.log("Saved image id: " + response.data.data);
                        });
                }
            }),
            false
        );
    };

    // Component on room change
    useEffect(() => {
        const canvas = window.canvasRef.current;
        drawingHandler(socketObj, canvas);
    }, [socketObj.room]);

    // Component on update
    useEffect(() => {
        const canvas = window.canvasRef.current;
        const context = canvas.getContext("2d");

        context.strokeStyle = props.brush.color;
        context.lineWidth = props.brush.size;
        window.tool = props.brush.type;

        retrieveStroke(socketObj);
    });

    // Component on mount
    useEffect(() => {
        trackHistory();

        return () => {
            window.removeEventListener("mouseout", handler, false);
        };
    }, []);

    window.onbeforeunload = function () {
        return "Are you sure you want to leave this whiteboard?";
    };

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
