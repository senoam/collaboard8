import React, { Fragment, useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import authHeader from "../../services/auth-header";

function HistoryCarousel(props) {
    const socketObj = props.socketObj;
    const room = socketObj.room;
    const [imgs, setImgs] = useState([]);

    const getHistory = () => {
        axios
            .post(
                "/api/history/get-history",
                {
                    whiteboard_id: room
                },
                { headers: authHeader() }
            )
            .then((response) => {
                console.log(response.data.data);

                const rows = response.data.data;
                const imgsmap = rows.map((row) => (
                    <div>
                        <img key={row.image_id} src={row.image_data} alt="" />
                        <p className="legend">{row.image_time}</p>
                    </div>
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
            <Carousel>{imgs}</Carousel>
        </Fragment>
    );
}

export default HistoryCarousel;
