import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Whiteboard from "./routes/wb/Whiteboard";
import Login from "./routes/login/login";

ReactDOM.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Login />}></Route>
			<Route path="/whiteboard" element={<Whiteboard />} />
			<Route path="/home" element={<App />} />
		</Routes>
	</BrowserRouter>,
	document.getElementById("root")
);
registerServiceWorker();
