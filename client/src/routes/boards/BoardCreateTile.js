import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import PlusIcon from "./BoardPlusIcon";

import "./BoardCreateTile.css";
import authHeader from "../../services/auth-header";

function BoardCreateTile(props) {
    let navigate = useNavigate();

    const [isHoverCreateTile, setHoverCreateTile] = useState(false);

    const createNewBoard = () => {
        axios
            .post("/api/whiteboard/create", { user_id: props.userId }, { headers: authHeader() })
            .then((res) => {
                navigate(`/whiteboard/${res.data.whiteboard_id}`);
            });
    };

    return (
        <div className="Boards-create-tile" onClick={createNewBoard}>
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
                    <h3 className="Boards-create-button-label">Create a Board</h3>
                </div>
            </div>
        </div>
    );
}

export default BoardCreateTile;
