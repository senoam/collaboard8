import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Whiteboard from "./routes/whiteboard/Whiteboard";
<<<<<<< HEAD
=======
import HistoryCarousel from "./routes/history/Carousel";
>>>>>>> d1a90ff5d8e093e16908c89f99765a6578f51931
import Login from "./routes/login/login";

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />}></Route>
<<<<<<< HEAD
=======
            <Route path="/whiteboard/history" element={<HistoryCarousel />} />
>>>>>>> d1a90ff5d8e093e16908c89f99765a6578f51931
            <Route path="/whiteboard" element={<Whiteboard />} />
            <Route path="/home" element={<App />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById("root")
);
registerServiceWorker();
