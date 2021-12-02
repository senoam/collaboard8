import React, { useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";

function Carousel(props) {
    const location = useLocation();
    const room = location.state.room;
    
    const getHistory = () => {
        axios.post("http://localhost:4200/history/get-history", {
						room_id: room
					})
					.then((response) => {
						console.log(response.data);
                    });
    };

    useEffect(() => {
		getHistory();
    });

    return (
        <h1>Snapshot History</h1>
    );
}

export default Carousel;