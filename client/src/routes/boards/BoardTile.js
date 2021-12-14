import React, { Fragment, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdDelete, MdClose } from "react-icons/md";
import authHeader from "../../services/auth-header";
import "./BoardTile.css";

function BoardTile(props) {
    const [showEditBoard, setShowEditBoard] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [snapshot, setSnapshot] = useState(null);
    const [lastEdited, setLastEdited] = useState(null);

    // Defines the height for the overlay
    const [boardTileHeight, setBoardTileHeight] = useState(0);
    const boardTileRef = useRef(null);

    useEffect(() => {
        axios
            .get(`http://localhost:4200/history/thumbnail/${props.id}`, { headers: authHeader() })
            .then((res) => {
                setSnapshot(res.data.image_data);
                setLastEdited(res.data.image_time);
            });
    }, []);

    const getFormattedTime = (dateString) => {
        const dateObj = new Date(dateString);
        return dateObj.toUTCString();
    };

    const handleShowEditBoard = (show) => {
        setShowEditBoard(show);
    };

    const handleDeleteBoard = () => {
        axios
            .delete("http://localhost:4200/whiteboard/delete", {
                data: { whiteboard_id: props.id },
                headers: authHeader()
            })
            .then((res) => {
                if (!!res.data) {
                    setDeleted(true);
                    setShowEditBoard(false);
                }
            });
    };

    // It is called edit board because we might want to implement "add collaborator" on this page.
    const renderEditBoard = () => {
        return (
            <div className="BoardTile BoardTile-edit-overlay" style={{ height: boardTileHeight }}>
                <div
                    className="BoardTile-btn"
                    onClick={() => {
                        handleShowEditBoard(false);
                    }}
                >
                    <MdClose />
                </div>
                <div className="BoardTile-edit-overlay-content">
                    <p>Permanently delete "{props.title}" for everyone?</p>
                    <button onClick={handleDeleteBoard} className="BoardTile-delete-btn">
                        Delete
                    </button>
                </div>
            </div>
        );
    };

    const renderInfo = () => {
        return (
            !deleted && (
                <div className="BoardTile BoardTile-hover" ref={boardTileRef}>
                    <Link
                        to={`/whiteboard/${props.id}`}
                        className="BoardTile-link"
                        title={props.title}
                    >
                        <img
                            className="BoardTile-img"
                            src={snapshot}
                            alt={"Recent snapshot for " + props.title}
                            onLoad={() => setBoardTileHeight(boardTileRef.current.clientHeight)}
                        />
                        {/* The line break makes the Last edited times line up :) */}
                        <h4 className="BoardTile-title">{props.title ? props.title : <br />}</h4>
                        <p className="timestamp">Last edited {getFormattedTime(lastEdited)}</p>
                    </Link>
                    <div
                        className="BoardTile-edit-btn BoardTile-btn"
                        onClick={() => handleShowEditBoard(true)}
                    >
                        <MdDelete />
                    </div>
                </div>
            )
        );
    };

    return <Fragment>{showEditBoard ? renderEditBoard() : renderInfo()}</Fragment>;
}

export default BoardTile;
