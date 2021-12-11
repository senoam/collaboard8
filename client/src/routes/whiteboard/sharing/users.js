import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { MdPersonRemoveAlt1 } from "react-icons/md";

import "./users.css";

function UserList(props) {
    const socketObj = props.socketObj;
    const whiteboardId = socketObj.room;

    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("owner");

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

    const renderUserRow = (email, user_role, user_id) => {
        return (
            <Fragment key={email}>
                <tr>
                    <td className="user-email">{email}</td>
                    <td className="user-role">{user_role}</td>
                    <td>
                        <button
                            type="button"
                            className="round-button"
                            onClick={() => removeUser(user_id)}
                        >
                            <MdPersonRemoveAlt1 />
                        </button>
                    </td>
                </tr>
            </Fragment>
        );
    };

    const getUsers = () => {
        axios.get(`http://localhost:4200/whiteboard/id/${whiteboardId}`).then((res) => {
            const rows = res.data.collaborators;
            const usermap = rows.map((row) => renderUserRow(row.email, row.user_role, row.user_id));

            setUsers(usermap);
        });
    };

    const inputEmail = (event) => {
        setEmail(event.target.value);
    };

    const inputRole = (event) => {
        setRole(event.target.value);
    };

    const addCollab = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:4200/users/id/${email}`).then((res) => {
            if (res.data) {
                var uid = res.data.user_id;

                axios
                    .post(`http://localhost:4200/whiteboard/add-collaborator`, {
                        whiteboard_id: whiteboardId,
                        user_id: uid,
                        user_role: role
                    })
                    .then((res) => {
                        const newUser = res.data;
                        if (newUser) {
                            if (!newUser.preExists) {
                                setUsers([...users, renderUserRow(email, role, uid)]);
                                alert(`${email} added to whiteboard`);
                            } else {
                                alert(`${email} is already a collaborator`);
                            }
                        } else {
                            alert(`Please check user role`);
                        }
                    })
                    .catch(() => {
                        alert("Please provide a valid email and collaborator role");
                    });
            } else {
                alert(`${email} is not a CollaBoard8 user`);
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
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>User Role</th>
                        <th>Remove Collaborator</th>
                    </tr>
                </thead>
                <tbody>{users}</tbody>
            </table>

            <h2>Add a new collaborator</h2>
            <hr className="hr-long"></hr>
            <br />
            <br />
            <form onSubmit={addCollab}>
                <label>
                    <h4>Collaborator Email:</h4>
                    <input
                        type="text"
                        className="text-input"
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
                <button type="submit">Add Collaborator</button>
            </form>
        </Fragment>
    );
}

export default UserList;
