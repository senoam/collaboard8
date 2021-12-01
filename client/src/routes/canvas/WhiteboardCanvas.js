import React, { createRef, useEffect } from "react";
import "./WhiteboardCanvas.css";
import { retrieveStroke } from "./strokeData";
import { drawFreehand } from "./drawFreehand";

function WhiteboardCanvas(props) {
	// To get the actual canvas element, use "this.canvasRef.current"
	window.canvasRef = createRef();
	window.room = props.room;

	//Blocking function referencing https://stackoverflow.com/questions/41909365/what-are-the-limitation-using-before-unload-event/42914045#42914045
	function block(delay) {
		var start = new Date().getTime();
		while (new Date().getTime() < start + delay);
	  }

	useEffect(() => {
		const canvas = window.canvasRef.current;
		const context = canvas.getContext("2d");

		context.strokeStyle = props.brush.color;
		context.lineWidth = props.brush.size;

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
