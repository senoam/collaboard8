import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";

import "./users.css";

function UserList(props) {
    const socketObj = props.socketObj;
    const whiteboardId = socketObj.room;

    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const removeUser = (id) => {
        axios
            .delete("http://localhost:4200/whiteboard/remove-collaborator", {
                whiteboard_id: whiteboardId,
                user_id: id
            })
            .then((res) => {
                alert("You have deleted user");
            });
    };

    const getUsers = () => {
        axios.get(`http://localhost:4200/whiteboard/id/${whiteboardId}`).then((res) => {
            console.log(res.data.collaborators);

            const rows = res.data.collaborators;
            const usermap = rows.map((row) => (
                <Fragment>
                    <div className="user-email">{row.email}</div>
                    <div className="user-role">{row.user_role}</div>
                    <div>
                        <button type="button" onClick={() => removeUser(row.user_id)}>
                            Remove
                        </button>
                    </div>
                </Fragment>
            ));

            setUsers(usermap);
        });
    };

    const inputEmail = (event) => {
        setEmail(event.target.value);
    };

    const inputRole = (event) => {
        setRole(event.target.value);
    };

    const handleAdd = (event) => {
        event.preventDefault();
        alert("You have submitted an add collaborator request");
    };

    const addCollab = (email, role) => {
        axios.get(`http://localhost:4200/users/id/${email}`).then((res) => {
            if (res.data) {
                var uid = res.data.user_id;

                console.log(uid);
                axios
                    .post(`http://localhost:4200/whiteboard/add-collaborator`, {
                        whiteboard_id: whiteboardId,
                        user_id: uid,
                        user_role: role
                    })
                    .then((res) => {
                        console.log("Added collaborator");
                        console.log(res.data);
                    });
            }
        });
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <Fragment>
            <h1>Collaborators List</h1>
            <div id="user-container">
                <div id="table-header">Email</div>
                <div id="table-header">User Role</div>
                <div id="table-header">Delete Collaborator from Whiteboard</div>
                {users}
            </div>

            <br></br>
            <form onSubmit={handleAdd}>
                <fieldset>
                    <label>
                        <p>Collaborator Email</p>
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={inputEmail}
                        />
                    </label>
                    <label>
                        <p>Role</p>
                        <select name="role" onChange={inputRole} value={role}>
                            <option value="">Please choose a role</option>
                            <option value="owner">owner</option>
                            <option value="editor">editor</option>
                        </select>
                    </label>
                </fieldset>
                <button type="submit" onClick={() => addCollab(email, role)}>
                    Add Collaborator
                </button>
            </form>
        </Fragment>
    );
}

export default UserList;
