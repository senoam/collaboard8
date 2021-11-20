import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Link } from "react-router-dom";
class App extends Component {
	constructor(props) {
		super(props);
		this.state = { apiResponse: "", dbStatus: "" };
	}

	// I've been trying to make the server url be an env, but couldn't make it work. You can try it out if you guys have time. -sandy
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

	componentDidMount() {
		this.callAPI();
		this.callDB();
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
				<Link to="/whiteboard">Whiteboard</Link>
			</div>
		);
	}
}

export default App;
