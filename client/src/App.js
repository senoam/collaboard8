import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import logo from "./logo.svg";
import "./App.css";
import authService from "./services/auth.service";

function App(props) {
    const [apiResponse, setResponse] = useState("");
    const [dbStatus, setStatus] = useState("");
    const [roles, setRoles] = useState("");

    const [currentUser, setCurrentUser] = useState("");
    const [room_id, setRoom] = React.useState("");

    let navigate = useNavigate();

    const inputRoom = (event) => {
        setRoom(event.target.value);
    };

    const authorize = () => {
        const user = authService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }
    };

    const logOut = () => {
        authService.logout();
        navigate("/");
    };

    const callAPI = () => {
        fetch("http://localhost:4200/testAPI")
            .then((res) => res.text())
            .then((res) => setResponse(res))
            .catch((err) => err);
    };
    const callDB = () => {
        fetch("http://localhost:4200/testAPI/ping")
            .then((res) => res.text())
            .then((res) => setStatus(res))
            .catch((err) => err);
    };

    const getWhiteboardRoles = () => {
        fetch("http://localhost:4200/testAPI/collabrole")
            .then((res) => res.json())
            .then((d) => {
                const rows = d.data;
                const rolesmap = rows.map((row) => (
                    <li key={`role_${row.role_name}`}>{row.role_name}</li>
                ));

                setRoles(rolesmap);
            })
            .catch((err) => err);
    };

    const updateNavigate = (event) => {
        navigate("/whiteboard", { state: { room: room_id } });
    };

    useEffect(() => {
        authorize();
        callAPI();
        callDB();
        getWhiteboardRoles();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">{apiResponse}</p>
            <p className="App-intro">{dbStatus}</p>
            <h3>Whiteboard Roles (Example db call):</h3>
            <ul>{roles}</ul>
            <br></br>
            <input type="text" placeholder="Room Name" value={room_id} onChange={inputRoom} />
            <button type="button" onClick={updateNavigate}>
                Join Room
            </button>
            <button type="button" onClick={logOut}>
                Logout
            </button>
        </div>
    );
}

export default App;
