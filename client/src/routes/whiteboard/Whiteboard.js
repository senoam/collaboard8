import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { IconContext } from "react-icons";
import { CgUserAdd } from "react-icons/cg";
import { MdHistory, MdLogout, MdUndo, MdRedo } from "react-icons/md";
import Toggle from "react-toggle";
import axios from "axios";
import ReactModal from "react-modal";

import WhiteboardCanvas from "../canvas/WhiteboardCanvas";
import CommentContainer from "../comments/CommentContainer";
import HistoryCarousel from "../history/Carousel";
import authService from "../../services/auth.service";
import WhiteboardTitleEditor from "./WhiteboardTitleEditor";
import { undoStroke, redoStroke } from "../canvas/tools/strokeData";

import "./Whiteboard.css";

function Whiteboard(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [socketObj, setSocketObj] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [whiteboardTitle, setWhiteboardTitle] = useState("");

    const logOut = () => {
        authService.logout();
        navigate("/");
    };

    useEffect(() => {
        if (socketObj !== null) {
            socketObj.socket.emit("join_room", socketObj.room);
            setIsLoading(false);
        }
    }, [socketObj]);

    useEffect(() => {
        const user = authService.getCurrentUser();

        var whiteboardId = location.state.whiteboardId;

        if (!!whiteboardId) {
            axios.get(`http://localhost:4200/whiteboard/id/${whiteboardId}`).then((res) => {
                initializeWhiteboard(res.data.whiteboard_title, whiteboardId);
            });
        } else {
            // Create a new whiteboard
            axios
                .post("http://localhost:4200/whiteboard/create", { user_id: user.user_id })
                .then((res) => {
                    initializeWhiteboard("Untitled CollaBoard", res.data.whiteboard_id);
                });
        }
    }, []);

    const initializeWhiteboard = (title, id) => {
        setWhiteboardTitle(title);

        setSocketObj({
            socket: io("http://localhost:4000"),
            room: id
        });
    };

    const [brushColor, setBrushColor] = useState("#000000");
    const [brushSize, setBrushSize] = useState(10);
    const [brushType, setBrushType] = useState("freehand");
    const [openModal, setOpen] = useState(false);
    function toggleModal() {
        setOpen(!openModal);
    }

    return (
        !isLoading && (
            <Fragment>
                <div className="whiteboard-header">
                    <Link to="/home" className="whiteboard-link">
                        <h1 className="mini-logo">
                            Colla<span className="logo-green">board</span>8
                        </h1>
                    </Link>
                    <h3 className="whiteboard-title">
                        <WhiteboardTitleEditor
                            initialTitle={whiteboardTitle}
                            whiteboardId={socketObj.room}
                        />
                        <IconContext.Provider
                            value={{ className: "whiteboard-history-btn", size: 26 }}
                        >
                            <MdHistory onClick={toggleModal} />
                        </IconContext.Provider>
                    </h3>
                    <button className="round-button" id="logout-button" onClick={logOut}>
                        <MdLogout />
                    </button>
                </div>

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

                <WhiteboardCanvas
                    brush={{
                        color: brushColor,
                        size: brushSize,
                        type: brushType
                    }}
                    socketObj={socketObj}
                />

                <div className="whiteboard-toolbar">
                    <div>
                        <button className="round-button">
                            <CgUserAdd />
                        </button>
                    </div>

                    <div id="brush-type-picker">
                        <select
                            onChange={(e) => {
                                setBrushType(e.target.value);
                            }}
                        >
                            <option value="freehand">&#9998;</option>
                            <option value="rectangle">&#9633;</option>
                            <option value="circle">&#9675;</option>
                            <option value="eraser">&#8998;</option>
                        </select>
                    </div>

                    <div>
                        <input
                            type="color"
                            value={brushColor}
                            style={{ backgroundColor: brushColor }}
                            onChange={(e) => setBrushColor(e.target.value)}
                        />
                    </div>

                    <div id="brush-size-picker">
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

                    <div id="undo-redo">
                        <MdUndo id="undo" onClick={() => undoStroke(socketObj)} />
                        &nbsp;&nbsp;
                        <MdRedo id="redo" onClick={() => redoStroke(socketObj)} />
                    </div>

                    <div>
                        <Toggle defaultChecked={true} icons={false} />
                    </div>
                </div>

                <CommentContainer socketObj={socketObj} />
            </Fragment>
        )
    );
}

export default Whiteboard;
