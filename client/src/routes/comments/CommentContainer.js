import React, { useEffect } from "react";
import "./CommentContainer.css";
import axios from "axios";

function CommentContainer(props) {
    const socketObj = props.socketObj;

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
            whiteboard_id: socketObj.room,
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
        // add database store
        socketObj.socket.emit("comment", socketObj.room, comment);
    };

    const retrieveComment = (comment) => {
        axios
            .post("http://localhost:4200/comments//get-comments", {
                whiteboard_id: socketObj.room
            })
            .then((res) => {
                console.log(res.data["comments"][0]);
                var comments = res.data["comments"];
                for (let i = 0; i < comments.length; i++) {
                    comment = comments[i]["message_text"];
                    addComment(comment);
                }
            });
        // and database retrieve
        socketObj.socket.on("comment", (comment) => {
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
