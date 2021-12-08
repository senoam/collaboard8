import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./login.css";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required
            </div>
        );
    }
};

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
                navigate("/home");
            });
    };

    const getCurrentUser = (e) => {
        return JSON.parse(localStorage.getItem("user"));
    };

    return (
        <div className="login-wrapper">
            <h1>
                Colla<span id="logo-green">Board</span>8
            </h1>
            <h3>A Collaborative Whiteboarding Tool</h3>
            <hr class="short" />
            <form onSubmit={login}>
                <input
                    type="text"
                    placeholder="Email"
                    class="login-input"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    class="login-input"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <br />
                <div>
                    <button type="submit">Login</button>
                    <p>
                        No Account? <a href="#">Sign up</a>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;
