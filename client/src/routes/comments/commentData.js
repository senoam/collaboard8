import axios from "axios";
import authHeader from "../../services/auth-header";

export const getParentComments = (socketObj, setCommentMarkers) => {
    axios
        .get("/api/comments/get/" + socketObj.room, { headers: authHeader() })
        .then(async (res) => {
            var comments = res.data.comments;
            for (var comment of comments) {
                var name = await axios.get("/api/users/get-name/" + comment.user_id, {
                    headers: authHeader()
                });
                name = name.data;
                comment.name = name.first_name + " " + name.last_name;
            }
            setCommentMarkers(comments);
        });
};

export const getReplyComments = (socketObj, comment, setCommentReplyData) => {
    axios
        .get("/api/comments/get-reply/" + socketObj.room + "/" + comment.comment_id, {
            headers: authHeader()
        })
        .then(async (res) => {
            var comments = res.data.comments;
            for (var comment of comments) {
                var name = await axios.get("/api/users/get-name/" + comment.user_id, {
                    headers: authHeader()
                });
                name = name.data;
                comment.name = name.first_name + " " + name.last_name;
            }
            setCommentReplyData(comments);
            return;
        });

    socketObj.socket.on("comment", (comment) => {
        setCommentReplyData(comment);
    });
};

export const sendComment = (socketObj, comment) => {
    axios.post("/api/comments/db", comment, { headers: authHeader() });
};
