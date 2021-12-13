import React, { Fragment, useState, useEffect } from "react";
import { FaMapMarker, FaTimesCircle } from "react-icons/fa";
import { MdClose, MdSend } from "react-icons/md";
import { OffCanvas, OffCanvasMenu } from "react-offcanvas";
import "./Comments.css";
import { CommentContainer } from "./CommentContainer";
import { getParentComments, sendComment } from "./commentData";
import authService from "../../services/auth.service";

function Comments(props) {
    const socketObj = props.socketObj;
    const user = authService.getCurrentUser();

    const [allCommentMarkers, setCommentMarkers] = useState([]);
    const [commentPanelOpen, setCommentPanelOpen] = useState(false);
    const [commentContainerData, setCommentContainerData] = useState({});
    const [newCommentMarker, setNewCommentMarker] = useState(null);

    useEffect(() => {
        getParentComments(socketObj, setCommentMarkers);
    }, []);

    function toggleCommentPanel() {
        setCommentPanelOpen(!commentPanelOpen);
    }

    function showComment(comment) {
        setCommentPanelOpen(true);
        setCommentContainerData(comment);
    }

    const createMarker = (e) => {
        const x = e.clientX;
        const y = e.clientY;
        const x_marker = x - 8; // scale for the empty space around commentMarkers
        const y_marker = y - 18;
        const location_string = x_marker.toString() + "," + y_marker.toString();

        const handleCommentSubmit = (e) => {
            const formData = new FormData(e.target);
            const formProps = Object.fromEntries(formData);
            const comment = {
                whiteboard_id: socketObj.room,
                comment_location: location_string,
                message_text: formProps.comment,
                user_id: user.user_id,
                parent_comment_id: 0 // no parent
            };
            sendComment(socketObj, comment);
        };
        const newComment = (
            <Fragment>
                <FaTimesCircle
                    className="comment-marker"
                    style={{
                        left: x_marker,
                        top: y_marker
                    }}
                    onClick={() => setNewCommentMarker(null)}
                />
                <form
                    onSubmit={handleCommentSubmit}
                    id="new-comment-form"
                    style={{
                        left: x,
                        top: y
                    }}
                >
                    <h4>New Comment</h4>
                    <textarea type="text" name="comment" id="comment-input" maxLength="250" />
                    <button type="submit" className="round-button modal-exit">
                        <MdSend />
                    </button>
                </form>
            </Fragment>
        );
        setNewCommentMarker(newComment);
    };

    const commentMarkers = allCommentMarkers.map((comment) => {
        const location = comment.comment_location.split(",");
        return (
            <FaMapMarker
                key={comment.comment_id}
                className="comment-marker"
                style={{
                    left: location[0],
                    top: location[1]
                }}
                onClick={() => showComment(comment)}
            />
        );
    });

    return (
        <Fragment>
            <div id="comment-overlay" onMouseDown={createMarker}></div>
            <div id="comment-markers">{commentMarkers}</div>
            <div id="new-comment">{newCommentMarker}</div>
            <OffCanvas
                width={300}
                transitionDuration={300}
                effect={"parallax"}
                isMenuOpened={commentPanelOpen}
                position={"right"}
            >
                <OffCanvasMenu>
                    <button
                        type="button"
                        className="round-button modal-exit"
                        onClick={toggleCommentPanel}
                    >
                        <MdClose />
                    </button>
                    <CommentContainer
                        socketObj={socketObj}
                        commentContainerData={commentContainerData}
                    />
                </OffCanvasMenu>
            </OffCanvas>
        </Fragment>
    );
}

export default Comments;
