import React, { createRef, useEffect } from "react";
import "./WhiteboardCanvas.css";
import { retrieveStroke } from "./strokeData";
import { drawFreehand } from "./drawFreehand";

function WhiteboardCanvas(props) {
	// To get the actual canvas element, use "this.canvasRef.current"
	const canvasRef = createRef();
	const room = props.room;

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");

		context.strokeStyle = props.brush.color;
		context.lineWidth = props.brush.size;

		//TODO(jen): remove this later, just used here for demo that it works
		retrieveStroke(canvas);

		drawFreehand(canvas, context);
	});

	return (
		<canvas
			ref={canvasRef}
			className="whiteboard-canvas"
			width="1920"
			height="1080"
		></canvas>
	);
}

export default WhiteboardCanvas;
