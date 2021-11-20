import React, { Component } from "react";

class Whiteboard extends Component {
	constructor(props) {
		super(props);
		this.state = { roles: [] };
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
		this.getWhiteboardRoles();
	}

	render() {
		return (
			<div style={{ padding: "1rem 0" }}>
				<h2>Whiteboard</h2>
				<h3>Roles:</h3>
				<ul>{this.state.roles}</ul>
			</div>
		);
	}
}

export default Whiteboard;
