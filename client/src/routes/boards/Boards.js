import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

import authService from "../../services/auth.service";
import BoardTile from "./BoardTile";
import PlusIcon from "./BoardPlusIcon";

import "./Boards.css";

function Boards(props) {
    let navigate = useNavigate();

    const [allBoards, setAllBoards] = useState([]);
    const [isHoverCreateTile, setHoverCreateTile] = useState(false);

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
            .get(`http://localhost:4200/users/id/${currentUser.user_id}/whiteboards`)
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

    const renderCreateTile = () => {
        return (
            <Link
                to="/whiteboard"
                state={{ whiteboardId: undefined }}
                className="Boards-create-tile"
            >
                <div
                    className="Boards-create-button"
                    onMouseEnter={() => setHoverCreateTile(true)}
                    onMouseLeave={() => setHoverCreateTile(false)}
                >
                    <div className="Boards-create-button-container">
                        <PlusIcon
                            class={"Boards-create-button-icon"}
                            onHoverGradient={isHoverCreateTile}
                        />
                        <h2 className="Boards-create-button-label">Create a Board</h2>
                    </div>
                </div>
            </Link>
        );
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
                <h1>Search results</h1>
                <div className="Boards-container">{searchResults}</div>
            </Fragment>
        );
    };

    const renderAllBoards = () => {
        return (
            <Fragment>
                <h1>My Boards</h1>
                <div className="Boards-container">
                    {renderCreateTile()}
                    {renderBoards("owner")}
                </div>
                <h1>Shared with Me</h1>
                <div className="Boards-container">{renderBoards("editor")}</div>
            </Fragment>
        );
    };

    return (
        <Fragment>
            <button type="button" onClick={logOut}>
                Logout
            </button>
            <input onChange={updateSearchMode} type="text" placeholder="Search for a CollaBoard" />
            {searchMode ? renderSearchResults() : renderAllBoards()}
        </Fragment>
    );
}

export default Boards;