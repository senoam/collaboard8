import React, { Fragment, useEffect, useState } from "react";
<<<<<<< HEAD
=======
import { useLocation } from "react-router";
>>>>>>> d1a90ff5d8e093e16908c89f99765a6578f51931
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";

function HistoryCarousel(props) {
<<<<<<< HEAD
    const socketObj = props.socketObj;
    const room = socketObj.room;
=======
    const location = useLocation();
    const room = location.state.room;
>>>>>>> d1a90ff5d8e093e16908c89f99765a6578f51931
    const [imgs, setImgs] = useState([]);

    const getHistory = () => {
        axios
            .post("http://localhost:4200/history/get-history", {
                room_id: room
            })
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
