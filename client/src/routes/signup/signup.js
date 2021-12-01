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
			.post("http://localhost:4200/signup", {
				email: email,
				password: password,
                firstName: firstName,
                lastName: lastName,
			}).then(() => {
                navigate("/")
            });
	};

    return (
		<div className="signup-wrapper">
			<h2>Signup</h2>
			<form onSubmit={signup}>
                <label>
					<p>First Name</p>
					<input
						type="text"
						onChange={(e) => {
							setFirstName(e.target.value);
						}}
					/>
				</label>
                <label>
					<p>Last Name</p>
					<input
						type="text"
						onChange={(e) => {
							setLastName(e.target.value);
						}}
					/>
				</label>
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

export default Signup;