import React, { Fragment } from "react";
import axios from "axios";
import { FaMapMarker } from "react-icons/fa";
import "./CommentMarker.css";

function CommentMarker(props) {
    const text = props.text;
    const time = props.time;
    const user_id = props.user_id;
    const location = props.location_string.split(",");

    return (
        <Fragment>
            <FaMapMarker
                className="comment-marker"
                style={{
                    top: location[0],
                    left: location[1]
                }}
            />
        </Fragment>
    );
}

export default CommentMarker;
