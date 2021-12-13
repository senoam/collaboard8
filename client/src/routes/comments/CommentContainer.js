import React, { useEffect, useState, Fragment } from "react";
import "./CommentContainer.css";
import { MdSend } from "react-icons/md";
import SimpleDateTime from "react-simple-timestamp-to-date";
import { getReplyComments, sendComment } from "./commentData";
import authService from "../../services/auth.service";

export function CommentContainer(props) {
    const socketObj = props.socketObj;
    const user = authService.getCurrentUser();
    const parentComment = props.commentContainerData;
    const [commentReplyData, setCommentReplyData] = useState([]);
    const [replies, setReplies] = useState([]);

    useEffect(() => {
        getReplyComments(socketObj, parentComment, setCommentReplyData);
    }, [socketObj.room, parentComment]);

    const handleCommentSubmit = (e) => {
        // get form values https://stackoverflow.com/questions/3547035/getting-html-form-values
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        document.getElementById("comment-form").reset();
        const comment = {
            whiteboard_id: socketObj.room,
            comment_location: "",
            message_text: formProps.comment,
            user_id: user.user_id,
            parent_comment_id: parentComment.comment_id
        };
        sendComment(socketObj, comment, parentComment.comment_id);
        getReplyComments(socketObj, parentComment, setCommentReplyData);
    };

    const createComment = (comment) => {
        return (
            <Fragment>
                <p>
                    {comment.user_id}{" "}
                    <span className="timestamp">
                        <SimpleDateTime dateSeparator="/" timeSeparator=":">
                            {comment.time_stamp}
                        </SimpleDateTime>
                    </span>
                </p>
                <p>{comment.message_text}</p>
            </Fragment>
        );
    };

    useEffect(() => {
        updateReplies();
    }, [commentReplyData]);

    const updateReplies = () => {
        const commentReplies = commentReplyData.map((comment) => {
            return (
                <Fragment key={comment.comment_id}>
                    <li>{createComment(comment)}</li>
                    <hr className="comment-divider"></hr>
                </Fragment>
            );
        });

        setReplies(commentReplies);
    };

    return (
        <div id="comment-container">
            <div id="comment-parent-container">{createComment(parentComment)}</div>
            <div id="comment-reply-container">
                <ul id="comment-list">{replies}</ul>
            </div>
            <form id="comment-form" onSubmit={handleCommentSubmit}>
                <textarea type="text" name="comment" id="comment-input" maxlength="250" />
                <button type="submit" className="round-button modal-exit">
                    <MdSend />
                </button>
            </form>
        </div>
    );
}

export default CommentContainer;
