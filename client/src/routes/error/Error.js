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
            {props.showHeader && (
                <div className="whiteboard-header">
                    <Link to="/home" className="whiteboard-link">
                        <h1 className="mini-logo">
                            Colla<span className="logo-green">board</span>8
                        </h1>
                    </Link>
                    <button
                        type="button"
                        className="round-button"
                        style={{ gridColumn: 3 }}
                        id="logout-button"
                        onClick={logOut}
                    >
                        <MdLogout />
                    </button>
                </div>
            )}
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
