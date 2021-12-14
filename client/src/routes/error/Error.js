import React, { Fragment } from "react";
import { RiGhostLine } from "react-icons/ri";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { MdLogout } from "react-icons/md";

import authService from "../../services/auth.service";

import "./Error.css";

function Error(props) {
    let navigate = useNavigate();

    const logOut = () => {
        authService.logout();
        navigate("/");
    };

    return (
        <Fragment>
            <div className="Error-container" style={props.style}>
                <IconContext.Provider value={{ className: "Error-ghost", size: "5em" }}>
                    <RiGhostLine />
                </IconContext.Provider>
                <h3>Nothing to see here!</h3>
                <p>{props.message}</p>
            </div>
        </Fragment>
    );
}

export default Error;
