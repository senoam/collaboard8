import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Boards from "./routes/boards/Boards";
import Whiteboard from "./routes/whiteboard/Whiteboard";
import HistoryCarousel from "./routes/history/Carousel";
import Login from "./routes/login/login";
import Signup from "./routes/signup/signup";
import PrivateRoute from "./routes/private/private-route";
import LoginAuthRoute from "./routes/private/login-auth-route";

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<LoginAuthRoute />}>
                <Route exact path="/" element={<Login />} />
            </Route>
            <Route path="/whiteboard/history" element={<HistoryCarousel />} />
            <Route exact path="/whiteboard" element={<PrivateRoute />}>
                <Route exact path="/whiteboard" element={<Whiteboard />} />
            </Route>
            <Route exact path="/home" element={<PrivateRoute />}>
                <Route exact path="/home" element={<Boards />} />
            </Route>
            <Route path="/signup" element={<Signup />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById("root")
);
registerServiceWorker();
