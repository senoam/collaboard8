import React, { useEffect } from "react";
import { io } from "socket.io-client";
import "./CommentContainer.css";
import axios from "axios";

function CommentContainer(props) {
    window.room = props.room;
    window.socket = io("http://localhost:4000");
    window.socket.emit("join_room", window.room);

    useEffect(() => {
        retrieveComment();
    });

    const handleCommentSubmit = (e) => {
        // get form values https://stackoverflow.com/questions/3547035/getting-html-form-values
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        document.getElementById("comment-form").reset();
        addComment(formProps.comment);

        // Get current time https://stackoverflow.com/questions/10645994/how-to-format-a-utc-date-as-a-yyyy-mm-dd-hhmmss-string-using-nodejs
        // Post comment to comments db
        axios.post("http://localhost:4200/comments/db", {
            whiteboard_id: 2,
            comment_location: "23,23",
            message_text: formProps.comment,
            user_id: 2,
            parent_comment_id: 2,
            time_stamp: new Date().toISOString().replace("T", " ").substr(0, 19)
        });

        sendComment(formProps.comment);
    };

    const addComment = (comment) => {
        const commentDom = document.getElementById("comment-list");
        var newComment = document.createElement("li");
        newComment.innerText = comment;
        commentDom.appendChild(newComment);
    };

    const sendComment = (comment) => {
        window.socket.emit("comment", window.room, comment);
    };

    const retrieveComment = (comment) => {
        window.socket.on("comment", (comment) => {
            addComment(comment);
        });
    };

    return (
        <div id="comment-container">
            <h1>Comments</h1>
            <ul id="comment-list"></ul>
            <form id="comment-form" onSubmit={handleCommentSubmit}>
                <input type="text" name="comment" />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default CommentContainer;
