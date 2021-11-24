import React, { Fragment, useState } from "react";
import WhiteboardCanvas from "./WhiteboardCanvas";
import "./Whiteboard.css";

function Whiteboard(props) {
	const [brushColor, setBrushColor] = useState("black");
	const [brushSize, setBrushSize] = useState(10);
	// TODO: We dont have multiple brush types yet
	const [brushType, setBrushType] = useState("pen");

	const brushTypes = ["pen", "eraser", "highlighter"];

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
						value={brushColor}
						onChange={(e) => setBrushColor(e.target.value)}
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
						onChange={(e) => setBrushSize(e.target.value)}
					/>
				</div>

				<div className="whiteboard-picker">
					<label for="brushTypePicker">Brush type: </label>
					<select
						name="brushTypePicker"
						id="brushTypePicker"
						onChange={(e) => setBrushType(e.target.value)}
					>
						{brushTypes.map((t) => (
							<option value="t">{t}</option>
						))}
					</select>
				</div>
			</div>

			<WhiteboardCanvas
				brush={{
					color: brushColor,
					size: brushSize,
					type: brushType,
				}}
			/>
		</Fragment>
	);
}

export default Whiteboard;
