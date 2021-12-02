import React, { useEffect } from "react";
import { io } from "socket.io-client"
import "./CommentContainer.css";

function CommentContainer(props) {
    useEffect(() => {
        window.socket = io("http://localhost:4000");
        window.socket.emit("join_room", props.room);
    }, [props.room]);

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
      sendComment(formProps.comment);
    };
  
    const addComment = (comment) => {
      const commentDom = document.getElementById("comment-list");
      var newComment = document.createElement("li")
      newComment.innerText = comment
      commentDom.appendChild(newComment)
    }
  
    const sendComment = (comment) => {
      window.socket.emit("comment", window.room, comment);
    }
  
    const retrieveComment = (comment) => {
      window.socket.on("comment", (comment) => {
        addComment(comment)
    });
  }

	return (
		<div id="comment-container">
      <h1>Comments</h1>
      <ul id="comment-list">
      </ul>
      <form id="comment-form" onSubmit={handleCommentSubmit}>
      <input type="text" name="comment"/>
      <button type="submit">Send</button>
      </form>
    </div>
	);
}

export default CommentContainer;
