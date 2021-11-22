import React, { Component, createRef } from "react";
import "./WhiteboardCanvas.css";

class WhiteboardCanvas extends Component {
	constructor(props) {
		super(props);

		// To get the actual canvas element, use "this.canvasRef.current"
		this.canvasRef = createRef();
	}

	componentDidMount() {
		this.canvasContext = this.canvasRef.current.getContext("2d");

		window.addEventListener("mousemove", this.draw, false);
	}

	componentWillUnmount() {
		window.addEventListener("mousemove", this.draw, false);
	}

	// How to draw: https://stackoverflow.com/a/33063222
	draw = (e) => {
		var pos = this.getMousePos(this.canvasRef.current, e);

		// Brush Color
		this.canvasContext.fillStyle = this.props.brush.color;

		// Brush size
		const bSize = this.props.brush.size;
		this.canvasContext.fillRect(pos.x, pos.y, bSize, bSize);
	};

	getMousePos = (canvas, evt) => {
		var rect = this.canvasRef.current.getBoundingClientRect();
		return {
			x: ((evt.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
			y: ((evt.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
		};
	};

	render() {
		return (
			<canvas
				ref={this.canvasRef}
				className="whiteboard-canvas"
				width="1000"
				height="500"
			></canvas>
		);
	}
}

WhiteboardCanvas.defaultProps = {
	brush: {
		color: "black",
		size: 10,
		type: "pen",
	},
};

export default WhiteboardCanvas;
