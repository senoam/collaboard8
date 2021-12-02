import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";

function Carousel(props) {
    const location = useLocation();
    const room = location.state.room;
    const [imgs, setImgs] = useState([]);
    
    const getHistory = () => {
        axios.post("http://localhost:4200/history/get-history", {
						room_id: room
					})
					.then((response) => {
						console.log(response.data.data);
                        
                        const rows = response.data.data;
                        const imgsmap = rows.map((row) => (
                                <img key={row.image_id} src={row.image_data} alt=""></img>
                            ));

                        setImgs(imgsmap);
                    });
    };

    useEffect(() => {
		getHistory();
    }, []);

    return (
        <Fragment>
            <h1>Snapshot History</h1>
            <div>
                {imgs}
            </div>
        </Fragment>
    );
}

export default Carousel;