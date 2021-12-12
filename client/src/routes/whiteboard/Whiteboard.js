import React, { Fragment, useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { IconContext } from "react-icons";
import {
    MdHistory,
    MdLogout,
    MdUndo,
    MdRedo,
    MdClose,
    MdPersonAddAlt1,
    MdComment,
    MdEdit
} from "react-icons/md";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import axios from "axios";
import ReactModal from "react-modal";

import WhiteboardCanvas from "../canvas/WhiteboardCanvas";
import Comments from "../comments/Comments";
import HistoryCarousel from "../history/Carousel";
import authService from "../../services/auth.service";
import WhiteboardTitleEditor from "./WhiteboardTitleEditor";
import { undoStroke, redoStroke } from "../canvas/tools/strokeData";
import UserList from "./sharing/users";
import Error from "../error/Error";

import "./Whiteboard.css";

function Whiteboard(props) {
    const navigate = useNavigate();
    const { whiteboardId } = useParams();

    const [socketObj, setSocketObj] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showError, setShowError] = useState(false);

    const [whiteboardTitle, setWhiteboardTitle] = useState("");

    const childRef = useRef();

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
        axios
            .get(`http://localhost:4200/whiteboard/id/${whiteboardId}`)
            .then((res) => {
                initializeWhiteboard(res.data.whiteboard_title, whiteboardId);
            })
            .catch(() => {
                setShowError(true);
            });
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
    const [openUsers, setUsers] = useState(false);
    const [openComments, setComments] = useState(false);

    function toggleModal() {
        setOpen(!openModal);
    }

    function toggleUsers() {
        setUsers(!openUsers);
    }

    function toggleComments() {
        setComments(!openComments);
    }

    return showError ? (
        <Error message="Please check your whiteboard URL" showHeader={true} />
    ) : (
        !isLoading && (
            <Fragment>
                <div className="whiteboard-header">
                    <h1 className="mini-logo">
                        <Link
                            to="/home"
                            className="whiteboard-link"
                            onClick={() => childRef.current.save()}
                        >
                            Colla<span className="logo-green">board</span>8
                        </Link>
                    </h1>
                    <h3 className="whiteboard-title">
                        <WhiteboardTitleEditor
                            initialTitle={whiteboardTitle}
                            whiteboardId={socketObj.room}
                        />
                        <IconContext.Provider
                            value={{ className: "whiteboard-history-btn", size: 26 }}
                        >
                            <MdHistory onClick={toggleModal} style={{ cursor: "pointer" }} />
                        </IconContext.Provider>
                    </h3>
                    <button
                        type="button"
                        className="round-button"
                        id="logout-button"
                        onClick={logOut}
                    >
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
                    <button type="button" className="round-button modal-exit" onClick={toggleModal}>
                        <MdClose />
                    </button>
                    <HistoryCarousel socketObj={socketObj} />
                </ReactModal>

                <WhiteboardCanvas
                    brush={{
                        color: brushColor,
                        size: brushSize,
                        type: brushType
                    }}
                    socketObj={socketObj}
                    ref={childRef}
                />
                {openComments && <Comments socketObj={socketObj} />}

                <div className="whiteboard-toolbar">
                    <div>
                        <button type="button" className="round-button" onClick={toggleUsers}>
                            <MdPersonAddAlt1 />
                        </button>

                        <ReactModal
                            isOpen={openUsers}
                            ariaHideApp={false}
                            onRequestClose={toggleUsers}
                            shouldCloseOnOverlayClick={true}
                            shouldCloseOnEsc={true}
                        >
                            <button
                                type="button"
                                className="round-button modal-exit"
                                onClick={toggleUsers}
                            >
                                <MdClose />
                            </button>
                            <UserList socketObj={socketObj} onChange={toggleUsers} />
                        </ReactModal>
                    </div>

                    <div id="brush-type-picker">
                        <select
                            id="type-select"
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
                        <label>
                            <Toggle
                                className="comment-toggle"
                                icons={{
                                    checked: <MdComment />,
                                    unchecked: <MdEdit />
                                }}
                                onChange={toggleComments}
                            />
                        </label>
                    </div>
                </div>
            </Fragment>
        )
    );
}

export default Whiteboard;
