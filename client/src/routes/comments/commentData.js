import axios from "axios";
import authHeader from "../../services/auth-header";

export const getParentComments = (socketObj, setCommentMarkers) => {
    axios.get("http://localhost:4200/comments/get/" + socketObj.room).then((res) => {
        setCommentMarkers(res.data.comments);
    });
};

export const getReplyComments = (socketObj, comment, setCommentReplyData) => {
    axios
        .get(
            "http://localhost:4200/comments/get-reply/" + socketObj.room + "/" + comment.comment_id
        )
        .then((res) => {
            setCommentReplyData(res.data.comments);
            return;
        });

    socketObj.socket.on("comment", (comment) => {
        setCommentReplyData(comment);
    });
};

export const sendComment = (socketObj, comment, parent_comment_id) => {
    axios.post("http://localhost:4200/comments/db", comment, { headers: authHeader() });
};
