import React, { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router";
import { io } from "socket.io-client";
import axios from "axios";

import ReactModal from "react-modal";
import WhiteboardCanvas from "../canvas/WhiteboardCanvas";
import CommentContainer from "../comments/CommentContainer";
import HistoryCarousel from "../history/Carousel";

import "./Whiteboard.css";

function Whiteboard(props) {
    const location = useLocation();
    const socketObj = {
        socket: io("http://localhost:4000"),
        room: location.state.whiteboardId
    };

    const [whiteboardTitle, setWhiteboardTitle] = useState("");

    useEffect(() => {
        socketObj.socket.emit("join_room", socketObj.room);

        axios.get(`http://localhost:4200/whiteboard/id/${socketObj.room}`).then((res) => {
            setWhiteboardTitle(res.data.whiteboard_title);
        });
    }, []);

    const [brushColor, setBrushColor] = useState("#000000");
    const [brushSize, setBrushSize] = useState(10);
    const [brushType, setBrushType] = useState("freehand");

    const brushTypes = ["freehand", "rectangle", "circle", "eraser"];

    const [openModal, setOpen] = useState(false);
    function toggleModal() {
        setOpen(!openModal);
    }

    return (
        <Fragment>
            <div className="whiteboard-header">
                <h2>Whiteboard id: {socketObj.room}</h2>
                <h2>Title: {whiteboardTitle}</h2>
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
