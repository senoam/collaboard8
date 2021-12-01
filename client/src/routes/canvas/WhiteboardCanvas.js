import React, { createRef, useEffect } from "react";
<<<<<<< HEAD
=======
import { io } from "socket.io-client";
>>>>>>> e935e49bd2525a4b0143897c3f1dc1e2c3cb385d
import "./WhiteboardCanvas.css";
import { retrieveStroke } from "./strokeData";
import { drawFreehand } from "./drawFreehand";

function WhiteboardCanvas(props) {
<<<<<<< HEAD
	// To get the actual canvas element, use "this.canvasRef.current"
	window.canvasRef = createRef();
	window.room = props.room;

	//Blocking function referencing https://stackoverflow.com/questions/41909365/what-are-the-limitation-using-before-unload-event/42914045#42914045
	function block(delay) {
		var start = new Date().getTime();
		while (new Date().getTime() < start + delay);
	  }
=======
    // To get the actual canvas element, use "this.canvasRef.current"
    window.canvasRef = createRef();
    window.room = props.room;
    window.socket = io("http://localhost:4000");
    window.socket.emit("join_room", window.room);
>>>>>>> e935e49bd2525a4b0143897c3f1dc1e2c3cb385d

    useEffect(() => {
        const canvas = window.canvasRef.current;
        const context = canvas.getContext("2d");

        context.strokeStyle = props.brush.color;
        context.lineWidth = props.brush.size;

<<<<<<< HEAD
		retrieveStroke();
		drawFreehand();

		const storeCanvas = () => {
			var timestamp = new Date().getTime();
			var data = {timestamp: timestamp, room_id: window.room};

			navigator.sendBeacon("http://localhost:4200/history/add-history", JSON.stringify(data));
			//var dataURL = canvas.toDataURL("image/png");

			block(1000);
		}
	  
		window.addEventListener('beforeunload', storeCanvas);
		return () => {
			window.removeEventListener('beforeunload', storeCanvas);
		}
	}, []);
=======
        retrieveStroke();
        drawFreehand();
    });
>>>>>>> e935e49bd2525a4b0143897c3f1dc1e2c3cb385d

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
