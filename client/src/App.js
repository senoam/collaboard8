import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import logo from "./logo.svg";
import "./App.css";

function App(props) {
    const [apiResponse, setResponse] = useState("");
    const [dbStatus, setStatus] = useState("");

    let navigate = useNavigate();

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

    const updateNavigate = (event) => {
        // Hardcoded whiteboardid for John Smith for now until we have the boards page. This id is from the whiteboard.sql.
        navigate("/whiteboard", {
            state: { whiteboardId: "4db898e8-556c-11ec-beb4-0242ac130002" }
        });
    };

    useEffect(() => {
        callAPI();
        callDB();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">{apiResponse}</p>
            <p className="App-intro">{dbStatus}</p>
            <br></br>
            <button type="button" onClick={updateNavigate}>
                Join Room 4db898e8-556c-11ec-beb4-0242ac130002
            </button>
        </div>
    );
}

export default App;
