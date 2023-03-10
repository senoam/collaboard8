import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdLogout } from "react-icons/md";

import authService from "../../services/auth.service";
import BoardTile from "./BoardTile";
import BoardCreateTile from "./BoardCreateTile";
import Error from "../error/Error";
import authHeader from "../../services/auth-header";
import "./Boards.css";

function Boards(props) {
    let navigate = useNavigate();

    const [allBoards, setAllBoards] = useState([]);

    const [searchMode, setSearchMode] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const user = authService.getCurrentUser();
    const [currentUser, setCurrentUser] = useState("");

    useEffect(() => {
        authorize();
    }, []);

    useEffect(() => {
        if (!!currentUser) getBoards();
    }, [currentUser]);

    const authorize = () => {
        if (!!user) {
            setCurrentUser(user);
        } else {
            // Navigate to the login page
            navigate("/");
        }
    };

    const logOut = () => {
        authService.logout();
        navigate("/");
    };

    const getBoards = () => {
        axios
            .get(`/api/users/id/${currentUser.user_id}/whiteboards`, {
                headers: authHeader()
            })
            .then((res) => {
                const boards = res.data.map((wb) => {
                    return {
                        ...wb
                    };
                });

                setAllBoards(boards);
            });
    };

    const renderBoards = (role) => {
        return allBoards.reduce((result, b) => {
            if (b.user_role === role) {
                result.push(
                    <BoardTile
                        key={b.whiteboard_id}
                        id={b.whiteboard_id}
                        title={b.whiteboard_title}
                    />
                );
            }
            return result;
        }, []);
    };

    const updateSearchMode = (e) => {
        const searchValue = e.target.value;
        setSearchMode(!!searchValue);

        if (searchMode) {
            const results = allBoards.reduce((result, b) => {
                const titleUpperCase = b.whiteboard_title.toUpperCase();

                if (titleUpperCase.search(searchValue.toUpperCase()) !== -1) {
                    result.push(
                        <BoardTile
                            key={b.whiteboard_id}
                            id={b.whiteboard_id}
                            title={b.whiteboard_title}
                        />
                    );
                }
                return result;
            }, []);

            setSearchResults(results);
        }
    };

    const renderSearchResults = () => {
        return (
            <Fragment>
                <h2>Search results</h2>
                <hr className="hr-long" />
                <div className="Boards-container">{searchResults}</div>
            </Fragment>
        );
    };

    const renderConditionalBoards = (role) => {
        const boards = renderBoards(role);
        if (boards.length) {
            return <div className="Boards-container">{boards}</div>;
        } else {
            return (
                <Error
                    message="You have no boards shared with you."
                    style={{ border: "0.2em dotted var(--light)" }}
                />
            );
        }
    };

    const renderAllBoards = () => {
        return (
            <Fragment>
                <h2>My Boards</h2>
                <hr className="hr-long" />
                <div className="Boards-container">
                    <BoardCreateTile userId={user.user_id} />
                    {renderBoards("owner")}
                </div>
                <h2>Shared with Me</h2>
                <hr className="hr-long" />
                {renderConditionalBoards("editor")}
                <div className="Boards-bottom-space" />
            </Fragment>
        );
    };

    return (
        <Fragment>
            <div className="whiteboard-header Boards-bring-to-front">
                <h1 className="mini-logo">
                    <Link to="/home" className="whiteboard-link">
                        Colla<span className="logo-green">board</span>8
                    </Link>
                </h1>
                <input
                    onChange={updateSearchMode}
                    type="text"
                    className="text-input vertical-align"
                    placeholder="Search for a CollaBoard"
                />
                <button className="round-button" id="logout-button" onClick={logOut}>
                    <MdLogout />
                </button>
            </div>
            <div id="boards-list">{searchMode ? renderSearchResults() : renderAllBoards()}</div>
        </Fragment>
    );
}

export default Boards;
