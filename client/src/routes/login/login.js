import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./login.css";

// const required = (value) => {
// 	if (!value) {
// 		return (
// 			<div className="alert alert-danger" role="alert">
// 				This field is required
// 			</div>
// 		);
// 	}
// };

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
				password: password,
			})
			.then((response) => {
				if (response.data.accessToken) {
					localStorage.setItem("user", JSON.stringify(response.data));
				}
				navigate("/home");
			});
	};

	return (
		<div className="login-wrapper">
			<h2>Login</h2>
			<form onSubmit={login}>
				<label>
					<p>Email Address</p>
					<input
						type="text"
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
				</label>
				<label>
					<p>Password</p>
					<input
						type="password"
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
				</label>
				<br />
				<div>
					<button type="submit">Login</button>
				</div>
			</form>
		</div>
	);
}

export default Login;
