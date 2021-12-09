import React, { Fragment, useState, useEffect, useNavigate } from "react";
import { useLocation } from "react-router";
import { io } from "socket.io-client";
import { CgUserAdd } from "react-icons/cg";
import { MdHistory, MdLogout } from "react-icons/md";
import Toggle from "react-toggle";
import axios from "axios";
import ReactModal from "react-modal";

import WhiteboardCanvas from "../canvas/WhiteboardCanvas";
import CommentContainer from "../comments/CommentContainer";
import HistoryCarousel from "../history/Carousel";
import authService from "../../services/auth.service";
import UserList from "./sharing/users";

import "./Whiteboard.css";

function Whiteboard(props) {
    const location = useLocation();
    const [socketObj, setSocketObj] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [whiteboardTitle, setWhiteboardTitle] = useState("");

    const logOut = () => {
        const navigate = useNavigate();
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
                setWhiteboardTitle(res.data.whiteboard_title);

                setSocketObj({
                    socket: io("http://localhost:4000"),
                    room: whiteboardId
                });
            });
        } else {
            // Create a new whiteboard
            axios
                .post("http://localhost:4200/whiteboard/create", { user_id: user.user_id })
                .then((res) => {
                    setWhiteboardTitle("Untitled CollaBoard");

                    setSocketObj({
                        socket: io("http://localhost:4000"),
                        room: res.data.whiteboard_id
                    });
                });
        }
    }, []);

    const [brushColor, setBrushColor] = useState("#000000");
    const [brushSize, setBrushSize] = useState(10);
    const [brushType, setBrushType] = useState("freehand");
    const [openModal, setOpen] = useState(false);
    function toggleModal() {
        setOpen(!openModal);
    }
    const [openUsers, setUsers] = useState(false);
    function toggleUsers() {
        setUsers(!openUsers);
    }

    return (
        !isLoading && (
            <Fragment>
                <div className="whiteboard-header">
                    <h1 className="mini-logo">
                        Colla<span className="logo-green">board</span>8
                    </h1>
                    <h3 className="whiteboard-title">
                        {whiteboardTitle}&nbsp;&nbsp;
                        <MdHistory onClick={toggleModal} />
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
                        <button className="round-button" onClick={toggleUsers}>
                            <CgUserAdd />
                        </button>

                        <ReactModal
                            isOpen={openUsers}
                            ariaHideApp={false}
                            onRequestClose={toggleUsers}
                            shouldCloseOnOverlayClick={true}
                            shouldCloseOnEsc={true}
                        >
                            <UserList socketObj={socketObj} />
                            <button type="button" onClick={toggleUsers}>
                                Close
                            </button>
                        </ReactModal>
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
