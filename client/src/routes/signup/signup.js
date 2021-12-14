import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./signup.css";

function Signup(props) {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const signup = (e) => {
        e.preventDefault();
        axios
            .post("/api/signup", {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName
            })
            .then(() => {
                navigate("/");
            });
    };

    return (
        <div className="login-wrapper">
            <h1>
                Colla<span className="logo-green">Board</span>8
            </h1>
            <h3>A Collaborative Whiteboarding Tool</h3>
            <hr className="hr-short" />
            <form onSubmit={signup}>
                <input
                    type="text"
                    placeholder="First name"
                    className="login-input name-input"
                    onChange={(e) => {
                        setFirstName(e.target.value);
                    }}
                    required
                />
                <input
                    type="text"
                    placeholder="Last name"
                    className="login-input name-input"
                    onChange={(e) => {
                        setLastName(e.target.value);
                    }}
                    required
                />
                <br />
                <input
                    type="text"
                    placeholder="Email"
                    className="login-input"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    required
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
                    <button type="submit">Sign up</button>
                    <p>
                        Have an account? <a href="/">Login</a>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Signup;
