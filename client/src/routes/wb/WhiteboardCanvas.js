import React, { createRef, useEffect } from "react";
import "./WhiteboardCanvas.css";

function WhiteboardCanvas(props) {
	// To get the actual canvas element, use "this.canvasRef.current"
	var canvasRef = createRef();

	useEffect(() => {
		window.addEventListener("mousemove", draw, false);

		return function cleanup() {
			window.removeEventListener("mousemove", draw, false);
		};
	});

	// How to draw: https://stackoverflow.com/a/33063222
	const draw = (e) => {
		var pos = getMousePos(canvasRef.current, e);

		// Brush Color
		canvasRef.current.getContext("2d").fillStyle = props.brush.color;

		// Brush size
		const bSize = props.brush.size;
		canvasRef.current.getContext("2d").fillRect(pos.x, pos.y, bSize, bSize);
	};

	const getMousePos = (canvas, evt) => {
		var rect = canvasRef.current.getBoundingClientRect();
		return {
			x: ((evt.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
			y: ((evt.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
		};
	};

	return (
		<canvas
			ref={canvasRef}
			className="whiteboard-canvas"
			width="1000"
			height="500"
		></canvas>
	);
}

export default WhiteboardCanvas;
