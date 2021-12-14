import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./login.css";

// Authentication and Login https://www.bezkoder.com/react-jwt-auth/

function Login(props) {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:4200/login", {
                email: email,
                password: password
            })
            .then((response) => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                navigate("/home", { state: { userId: response.data.user_id } });
            })
            .catch((err) => {
                alert("Please enter correct login information");
            });
    };

    return (
        <div className="login-wrapper">
            <h1>
                Colla<span className="logo-green">Board</span>8
            </h1>
            <h3>A Collaborative Whiteboarding Tool</h3>
            <hr className="hr-short" />
            <form onSubmit={login}>
                <input
                    type="text"
                    placeholder="Email"
                    className="login-input"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    className="login-input"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <br />
                <div>
                    <button type="submit">Login</button>
                    <p>
                        No Account? <a href="/signup">Sign up</a>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;
