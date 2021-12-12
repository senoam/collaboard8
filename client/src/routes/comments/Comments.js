import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import "./Comments.css";
import CommentMarker from "./CommentMarker";

function Comments(props) {
    const socketObj = props.socketObj;

    const [allCommentMarkers, setCommentMarkers] = useState([]);

    useEffect(() => {
        getComments();
    }, []);

    const getComments = () => {
        axios.get("http://localhost:4200/comments/get/" + socketObj.room).then((res) => {
            setCommentMarkers(res.data.comments);
        });
    };

    const commentMarkers = allCommentMarkers.map((comment) => {
        return (
            <CommentMarker
                key={comment.comment_id}
                text={comment.message_text}
                time={comment.timestamp}
                user_id={comment.user_id}
                location_string={comment.comment_location}
            />
        );
    });

    return (
        <Fragment>
            <div id="comment-overlay">
                <div id="comment-markers">{commentMarkers}</div>
            </div>
        </Fragment>
    );
}

export default Comments;
