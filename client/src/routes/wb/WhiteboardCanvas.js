import React, { createRef, useEffect } from "react";
import "./WhiteboardCanvas.css";

function WhiteboardCanvas(props) {
	// To get the actual canvas element, use "this.canvasRef.current"
	const canvasRef = createRef();
	const room = props.room;
	var isDrawing = false;

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");

		const draw = (x0, y0, x1, y1) => {
			context.beginPath();
			context.moveTo(x0, y0);
			context.lineTo(x1, y1);
			context.strokeStyle = props.brush.color;
			context.lineWidth = props.brush.size;
			context.stroke();
			context.closePath();
		}

		var current;
		const onMouseDown  = (e) => {
			current = getMousePos(canvas, e);
			isDrawing = true;
		}

		const onMouseUp  = (e) => {
			if (!isDrawing) return;
			isDrawing = false;
			const pos = getMousePos(canvas, e);
			draw(current.x, current.y, pos.x, pos.y);
		}

		const onMouseMove  = (e) => {
			if (!isDrawing) return;
			const pos = getMousePos(canvas, e);
			draw(current.x, current.y, pos.x, pos.y);
			current = getMousePos(canvas, e);
		}

		canvas.addEventListener('mousedown', onMouseDown, false);
		canvas.addEventListener('mouseup', onMouseUp, false);
		canvas.addEventListener('mouseout', onMouseUp, false);
		canvas.addEventListener('mousemove', onMouseMove, false);

	});

	const getMousePos = (canvas, e) => {
		const rect = canvas.getBoundingClientRect();
		return {
			x: (((e.clientX || e.touches[0].clientX ) - rect.left) / (rect.right - rect.left)) * canvas.width,
			y: (((e.clientY || e.touches[0].clientY) - rect.top) / (rect.bottom - rect.top)) * canvas.height,
		};
	};

	const sendStrokeData = (canvas) => {
		var formData = new FormData();
		formData.append('field', canvas.toDataURL('image/png'), 'sketch.png');
	};

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
