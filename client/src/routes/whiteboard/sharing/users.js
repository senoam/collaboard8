import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";

import "./users.css";

function UserList(props) {
    const socketObj = props.socketObj;
    const whiteboardId = socketObj.room;

    const [users, setUsers] = useState([]);

    const removeUser = (id) => {
        axios
            .delete("http://localhost:4200/whiteboard/remove-collaborator", {
                whiteboard_id: whiteboardId,
                user_id: id
            })
            .then((res) => {
                console.log("Deleted user");
            });
    };

    const getUsers = () => {
        axios.get(`http://localhost:4200/whiteboard/id/${whiteboardId}`).then((res) => {
            console.log(res.data.collaborators);

            const rows = res.data.collaborators;
            const usermap = rows.map((row) => (
                <div id="user-container">
                    <div class="user-email">{row.email}</div>
                    <div class="user-role">{row.user_role}</div>
                    <button type="button" onClick={() => removeUser(row.user_id)}>
                        Remove
                    </button>
                </div>
            ));

            setUsers(usermap);
        });
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <Fragment>
            <h1>Collaborators List</h1>
            <body>{users}</body>
        </Fragment>
    );
}

export default UserList;
