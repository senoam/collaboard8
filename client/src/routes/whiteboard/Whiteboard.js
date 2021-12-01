import React, { Fragment, useState } from "react";
import { io } from "socket.io-client"
import { useLocation } from "react-router";
import WhiteboardCanvas from "../canvas/WhiteboardCanvas";
import CommentContainer from "../comments/CommentContainer";
import "./Whiteboard.css";

function Whiteboard(props) {
    const location = useLocation();
    const room = location.state.room;

    const [brushColor, setBrushColor] = useState("black");
    const [brushSize, setBrushSize] = useState(10);
    // TODO: We dont have multiple brush types yet
    const [brushType, setBrushType] = useState("pen");

    const brushTypes = ["pen", "eraser", "highlighter"];

<<<<<<< HEAD
	window.socket = io("http://localhost:4000");
	window.socket.emit("join_room", window.room);

	return (
		<Fragment>
			<div className="whiteboard-header">
				<h2>Whiteboard</h2>
				<h2>Room: {room}</h2>
=======
    return (
        <Fragment>
            <div className="whiteboard-header">
                <h2>Whiteboard</h2>
                <h2>Room: {room}</h2>
>>>>>>> e935e49bd2525a4b0143897c3f1dc1e2c3cb385d

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
                    type: brushType
                }}
                room={room}
            />

            <CommentContainer />
        </Fragment>
    );
}

export default Whiteboard;
