import React, { Component, Fragment } from "react";
import WhiteboardCanvas from "./WhiteboardCanvas";
import "./Whiteboard.css";

class Whiteboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bColor: "black",
			bSize: 10,
			bType: "pen",
		};

		this.brushTypes = ["pen", "eraser", "highlighter"];
	}

	render() {
		return (
			<Fragment>
				<div className="whiteboard-header">
					<h2>Whiteboard</h2>

					<div className="whiteboard-picker">
						<label for="brushColorPicker">Brush color: </label>
						<input
							type="color"
							id="brushColorPicker"
							name="brushColorPicker"
							value={this.state.bColor}
							onChange={(e) => this.setState({ bColor: e.target.value })}
						/>
					</div>

					<div className="whiteboard-picker">
						<label for="brushSizePicker">Brush size: </label>
						<input
							type="range"
							id="brushSizePicker"
							min="0"
							max="100"
							name="brushSizePicker"
							onChange={(e) => this.setState({ bSize: e.target.value })}
						/>
					</div>

					<div className="whiteboard-picker">
						<label for="brushTypePicker">Brush type: </label>
						<select name="brushTypePicker" id="brushTypePicker">
							{this.brushTypes.map((t) => (
								<option value="t">{t}</option>
							))}
						</select>
					</div>
				</div>

				<WhiteboardCanvas
					brush={{
						color: this.state.bColor,
						size: this.state.bSize,
						type: this.state.bType,
					}}
				/>
			</Fragment>
		);
	}
}

export default Whiteboard;
