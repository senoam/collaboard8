import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { MdPersonRemoveAlt1 } from "react-icons/md";

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
                <tr>
                    <td className="user-email">{row.email}</td>
                    <td className="user-role">{row.user_role}</td>
                    <td>
                        <button
                            type="button"
                            className="round-button"
                            onClick={() => removeUser(row.user_id)}
                        >
                            <MdPersonRemoveAlt1 />
                        </button>
                    </td>
                </tr>
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
            <h2>Current collaborators</h2>
            <hr className="hr-long"></hr>
            <br />
            <br />
            <table>
                <tr>
                    <th>Email</th>
                    <th>User Role</th>
                    <th>Remove Collaborator</th>
                </tr>
                {users}
            </table>

            <h2>Add a new collaborator</h2>
            <hr className="hr-long"></hr>
            <br />
            <br />
            <form onSubmit={handleAdd}>
                <label>
                    <h4>Collaborator Email:</h4>
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="example@email.com"
                        value={email}
                        onChange={inputEmail}
                        required
                    />
                </label>
                <label>
                    <h4>Role:</h4>
                    <select name="role" id="role-select" onChange={inputRole} value={role} required>
                        <option value="owner">Owner</option>
                        <option value="editor">Editor</option>
                    </select>
                </label>
                <br />
                <button type="submit" onClick={() => addCollab(email, role)}>
                    Add Collaborator
                </button>
            </form>
        </Fragment>
    );
}

export default UserList;
