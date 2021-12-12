import React, { Fragment, useState, useEffect } from "react";
import { FaMapMarker } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { OffCanvas, OffCanvasMenu } from "react-offcanvas";
import "./Comments.css";
import { CommentContainer } from "./CommentContainer";
import { getParentComments } from "./commentData";

function Comments(props) {
    const socketObj = props.socketObj;

    const [allCommentMarkers, setCommentMarkers] = useState([]);
    const [commentPanelOpen, setCommentPanelOpen] = useState(false);
    const [commentContainerData, setCommentContainerData] = useState({});

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

    //function newComment() {}

    const commentMarkers = allCommentMarkers.map((comment) => {
        const location = comment.comment_location.split(",");
        return (
            <FaMapMarker
                key={comment.comment_id}
                className="comment-marker"
                style={{
                    top: location[0],
                    left: location[1]
                }}
                onClick={() => showComment(comment)}
            />
        );
    });

    return (
        <Fragment>
            <div id="comment-overlay">
                <div id="comment-markers">{commentMarkers}</div>
            </div>
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
