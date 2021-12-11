import React, { useState, useEffect } from "react";
import axios from "axios";

import "./WhiteboardTitleEditor.css";

function WhiteboardTitle(props) {
    const [whiteboardTitle, setWhiteboardTitle] = useState("");
    const maxTitleLength = 100;

    useEffect(() => {
        // Initialize the title
        setWhiteboardTitle(props.initialTitle);
    }, []);

    const updateTitle = (newTitle) => {
        axios
            .put("http://localhost:4200/whiteboard/edit-title", {
                whiteboard_id: props.whiteboardId,
                new_whiteboard_title: newTitle
            })
            .then(() => {
                setWhiteboardTitle(newTitle);
            });
    };

    return (
        <div className="whiteboard-edit-title" title={whiteboardTitle}>
            <label className="whiteboard-edit-title-label vertical-align">
                {/* For some reason, the whiteboard title input moves off the nav bar when there's no content 
                    in .whiteboard-edit-title-text, so there's a hacky period here now lol. */}
                <h3 className="whiteboard-edit-title-text">.{whiteboardTitle}</h3>
                <input
                    className="whiteboard-edit-title-input whiteboard-edit-title-input-hover"
                    type="text"
                    value={whiteboardTitle}
                    maxLength={maxTitleLength}
                    onBlur={() => updateTitle(whiteboardTitle)}
                    onChange={(e) => {
                        const newTitle = e.target.value;
                        setWhiteboardTitle(newTitle);
                    }}
                ></input>
            </label>
        </div>
    );
}

export default WhiteboardTitle;
