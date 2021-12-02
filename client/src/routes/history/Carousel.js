import React, { useEffect, useState } from "react";
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
						console.log(response.data.data);
                        
                        for (var i = 0; i < response.data.data.length; i ++){
                            var fs = require('browserify-fs');

                            fs.readFile('/history/' + response.data.data[i].image_id +'.png', 'base64', (err, data) => {
								if (err) throw err;
								console.log("Image data: " + data);
							  });
                        }
                    });
    };

    useEffect(() => {
		getHistory();
    }, []);

    return (
        <h1>Snapshot History</h1>
    );
}

export default Carousel;