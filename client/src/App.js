import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Link } from "react-router-dom";
class App extends Component {
	constructor(props) {
		super(props);
		this.state = { apiResponse: "", dbStatus: "" };
	}

	callAPI() {
		fetch("http://localhost:4200/testAPI")
			.then((res) => res.text())
			.then((res) => this.setState({ apiResponse: res }))
			.catch((err) => err);
	}

	callDB() {
		fetch("http://localhost:4200/testAPI/ping")
			.then((res) => res.text())
			.then((res) => this.setState({ dbStatus: res }))
			.catch((err) => err);
	}

	getWhiteboardRoles() {
		fetch("http://localhost:4200/testAPI/collabrole")
			.then((res) => res.json())
			.then((d) => {
				const rows = d.data;
				const roles = rows.map((row) => (
					<li key={`role_${row.role_name}`}>{row.role_name}</li>
				));

				this.setState({ roles: roles });
			})
			.catch((err) => err);
	}

	componentDidMount() {
		this.callAPI();
		this.callDB();
		this.getWhiteboardRoles();
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<p className="App-intro">{this.state.apiResponse}</p>
				<p className="App-intro">{this.state.dbStatus}</p>
				<h3>Whiteboard Roles (Example db call):</h3>
				<ul>{this.state.roles}</ul>
				<Link to="/whiteboard">Whiteboard</Link>
			</div>
		);
	}
}

export default App;
