import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Boards from "./routes/boards/Boards";
import Whiteboard from "./routes/whiteboard/Whiteboard";
import Login from "./routes/login/login";
import Signup from "./routes/signup/signup";
import PrivateRoute from "./routes/private/private-route";
import LoginAuthRoute from "./routes/private/login-auth-route";
import Error from "./routes/error/Error";

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<LoginAuthRoute />}>
                <Route exact path="/" element={<Login />} />
            </Route>
            <Route exact path="/whiteboard/:whiteboardId" element={<PrivateRoute />}>
                <Route exact path="/whiteboard/:whiteboardId" element={<Whiteboard />} />
            </Route>
            <Route exact path="/home" element={<PrivateRoute />}>
                <Route exact path="/home" element={<Boards />} />
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route exact path="*" element={<PrivateRoute />}>
                <Route
                    path="*"
                    element={<Error message="Please check your URL" showHeader={true} />}
                />
            </Route>
        </Routes>
    </BrowserRouter>,
    document.getElementById("root")
);
registerServiceWorker();
