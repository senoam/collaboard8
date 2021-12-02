import React, { Fragment, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";

function Carousel(props) {
    const location = useLocation();
    const room = location.state.room;
}

export default Carousel;