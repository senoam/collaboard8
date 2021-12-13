import axios from "axios";
import authHeader from "../../services/auth-header";

export const getParentComments = (socketObj, setCommentMarkers) => {
    axios.get("http://localhost:4200/comments/get/" + socketObj.room).then(async (res) => {
        var comments = res.data.comments;
        for (var comment of comments) {
            var name = await axios.get("http://localhost:4200/users/get-name/" + comment.user_id);
            name = name.data;
            comment.name = name.first_name + " " + name.last_name;
        }
        setCommentMarkers(comments);
    });
};

export const getReplyComments = (socketObj, comment, setCommentReplyData) => {
    axios
        .get(
            "http://localhost:4200/comments/get-reply/" + socketObj.room + "/" + comment.comment_id
        )
        .then(async (res) => {
            var comments = res.data.comments;
            for (var comment of comments) {
                var name = await axios.get(
                    "http://localhost:4200/users/get-name/" + comment.user_id
                );
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
    axios.post("http://localhost:4200/comments/db", comment, { headers: authHeader() });
};
