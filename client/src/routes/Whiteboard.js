import React, { Component } from "react";

class Whiteboard extends Component {
	constructor(props) {
		super(props);
		this.state = { apiResponse: "", dbStatus: "" };
	}

	render() {
		return (
			<div style={{ padding: "1rem 0" }}>
				<h2>Whiteboard</h2>
			</div>
		);
	}
}

export default Whiteboard;
