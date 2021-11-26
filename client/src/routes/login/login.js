import React from "react";
import "./login.css";

function Login(props) {
	return (
		<div className="login-wrapper">
			<h2>Login</h2>
			<form>
				<label>
					<p>Username</p>
					<input type="text" />
				</label>
				<label>
					<p>Password</p>
					<input type="password" />
				</label>
				<br />
				<div>
					<button type="submit">Submit</button>
				</div>
			</form>
		</div>
	);
}

export default Login;
