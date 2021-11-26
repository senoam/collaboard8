import React, { createRef, useEffect } from "react";
import "./WhiteboardCanvas.css";
import { io } from "socket.io-client"

function WhiteboardCanvas(props) {
	// To get the actual canvas element, use "this.canvasRef.current"
	const canvasRef = createRef();
	const room = props.room;
	var isDrawing = false;

	const socket = io("http://localhost:4000");
	socket.emit("join_room", room);

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");

		socket.on("drawing", (data) => {
			var stroke = new Image();
			stroke.onload = function() {
				context.drawImage(stroke, 0, 0);
			};
			stroke.src = data;
		})

		const draw = (x0, y0, x1, y1) => {
			context.beginPath();
			context.moveTo(x0, y0);
			context.lineTo(x1, y1);
			context.strokeStyle = props.brush.color;
			context.lineWidth = props.brush.size;
			context.stroke();
			context.closePath();

			const timeout = setTimeout(() => {
				var strokeData = canvas.toDataURL("image/png");
				socket.emit("drawing", room, strokeData);
			}, 1000);
			return () => clearTimeout(timeout);
		}

		var current;
		const onStrokeStart  = (e) => {
			current = getMousePos(canvas, e);
			isDrawing = true;
		}

		const onStrokeEnd  = (e) => {
			if (!isDrawing) return;
			isDrawing = false;
			const pos = getMousePos(canvas, e);
			draw(current.x, current.y, pos.x, pos.y);
		}

		const onStrokeContinue  = (e) => {
			if (!isDrawing) return;
			const pos = getMousePos(canvas, e);
			draw(current.x, current.y, pos.x, pos.y);
			current = getMousePos(canvas, e);
		}

		canvas.addEventListener('mousedown', onStrokeStart, false);
		canvas.addEventListener('mouseup', onStrokeEnd, false);
		canvas.addEventListener('mouseout', onStrokeEnd, false);
		canvas.addEventListener('mousemove', onStrokeContinue, false);

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
