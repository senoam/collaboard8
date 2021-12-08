import React, { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router";
import { io } from "socket.io-client";
import ReactModal from "react-modal";
import WhiteboardCanvas from "../canvas/WhiteboardCanvas";
import CommentContainer from "../comments/CommentContainer";
import HistoryCarousel from "../history/Carousel";

import "./Whiteboard.css";

function Whiteboard(props) {
    const location = useLocation();
    const socketObj = {
        socket: io("http://localhost:4000"),
        room: location.state.room
    };

    useEffect(() => {
        socketObj.socket.emit("join_room", socketObj.room);
    }, [props.room]);

    const [brushColor, setBrushColor] = useState("black");
    const [brushSize, setBrushSize] = useState(10);
    const [brushType, setBrushType] = useState("freehand");

    const brushTypes = ["freehand", "rectangle", "circle"];

    const [openModal, setOpen] = useState(false);
    function toggleModal() {
        setOpen(!openModal);
    }

    return (
        <Fragment>
            <div className="whiteboard-header">
                <h2>Whiteboard</h2>
                <h2>Room: {socketObj.room}</h2>
                <button type="button" onClick={toggleModal}>
                    See Version History
                </button>

                <ReactModal
                    isOpen={openModal}
                    ariaHideApp={false}
                    onRequestClose={toggleModal}
                    shouldCloseOnOverlayClick={true}
                    shouldCloseOnEsc={true}
                >
                    <HistoryCarousel socketObj={socketObj} />
                    <button type="button" onClick={toggleModal}>
                        Close
                    </button>
                </ReactModal>

                <div className="whiteboard-picker">
                    <label htmlFor="brushColorPicker">Brush color: </label>
                    <input
                        type="color"
                        id="brushColorPicker"
                        name="brushColorPicker"
                        value={brushColor}
                        onChange={(e) => setBrushColor(e.target.value)}
                    />
                </div>

                <div className="whiteboard-picker">
                    <label htmlFor="brushSizePicker">Brush size: </label>
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
                    <label htmlFor="brushTypePicker">Brush type: </label>
                    <select
                        name="brushTypePicker"
                        id="brushTypePicker"
                        onChange={(e) => {
                            setBrushType(e.target.value);
                        }}
                    >
                        {brushTypes.map((t) => (
                            <option key={t} value={t}>
                                {t}
                            </option>
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
                socketObj={socketObj}
            />

            <CommentContainer socketObj={socketObj} />
        </Fragment>
    );
}

export default Whiteboard;
