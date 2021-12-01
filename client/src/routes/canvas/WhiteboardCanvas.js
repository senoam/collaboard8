import React, { createRef, useEffect } from "react";
import "./WhiteboardCanvas.css";
import { io } from "socket.io-client"
import axios from "axios";
import { retrieveStroke } from "./strokeData";
import { drawFreehand } from "./drawFreehand";

function WhiteboardCanvas(props) {
	// To get the actual canvas element, use "this.canvasRef.current"
	window.canvasRef = createRef();
	window.room = props.room;
	window.socket = io("http://localhost:4000");
	window.socket.emit("join_room", window.room);

	var room_id = props.room;

	const trackHistory = () => {
		var mouse_y = 0;
		var window_top = 0;

		window.addEventListener("mouseout", function(e) {
			mouse_y = e.clientY;

			if (mouse_y < window_top){
				console.log("Sending a history POST request.");
				var timestamp = new Date().getTime();
				console.log("Timestamp: " + timestamp + " Room: " + room_id);

				//var imgURL = canvas.toDataURL("image/png");
				axios.post("http://localhost:4200/history/add-history", {
						timestamp: timestamp,
						room_id: room_id
					})
					.then((response) => {
						console.log(response);

						var fs = require('browserify-fs');

						//Image encoding referenced from https://stackoverflow.com/questions/43487543/writing-binary-data-using-node-js-fs-writefile-to-create-an-image-fil
						const canvas = window.canvasRef.current;
        				var imgURL = canvas.toDataURL();
						var data = imgURL.replace(/^data:image\/\w+;base64,/, "");
						var buffer = Buffer.from(data, 'base64');

						fs.mkdir('/history', function() {
							fs.writeFile('/history/' + response.data +'.png', buffer, (err) => {
								if (err) throw err;
								console.log("Saved snapshot image data");
							  });
						});
					});
			}
		}, false);
	};

    useEffect(() => {
        const canvas = window.canvasRef.current;
        const context = canvas.getContext("2d");

        context.strokeStyle = props.brush.color;
        context.lineWidth = props.brush.size;

		retrieveStroke();
		drawFreehand();
		trackHistory();
	}, []);

	window.onbeforeunload = function() {
		return "Are you sure you want to leave this whiteboard?";
	};

    return (
        <canvas
            ref={window.canvasRef}
            className="whiteboard-canvas"
            width="1920"
            height="1080"
        ></canvas>
    );
}

export default WhiteboardCanvas;
