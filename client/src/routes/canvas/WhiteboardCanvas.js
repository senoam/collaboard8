import React, { createRef, useEffect } from "react";
import "./WhiteboardCanvas.css";
import { retrieveStroke } from "./strokeData";
import { drawFreehand } from "./drawFreehand";

function WhiteboardCanvas(props) {
	// To get the actual canvas element, use "this.canvasRef.current"
	window.canvasRef = createRef();
	window.room = props.room;

    useEffect(() => {
        const canvas = window.canvasRef.current;
        const context = canvas.getContext("2d");

        context.strokeStyle = props.brush.color;
        context.lineWidth = props.brush.size;

		var loaded = true;

		retrieveStroke();
		drawFreehand();

		const storeCanvas = () => {
			if (document.visibilityState === 'hidden' && loaded) {
				var timestamp = new Date().getTime();
				var imgURL = canvas.toDataURL("image/png");
				var data = {timestamp: timestamp, room_id: window.room, image: imgURL};
				
				navigator.sendBeacon("http://localhost:4200/history/add-history", JSON.stringify(data));

				console.log("Sent history image data");
			}
		}
	  
		window.addEventListener('visibilitychange', storeCanvas);
	}, []);

	window.onbeforeunload = function() {
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
