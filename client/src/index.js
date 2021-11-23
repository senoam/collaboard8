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
			<Route path="/" element={<App />}></Route>
			<Route path="/whiteboard" element={<Whiteboard />} />
			<Route path="/login" element={<Login />} />
		</Routes>
	</BrowserRouter>,
	document.getElementById("root")
);
registerServiceWorker();
