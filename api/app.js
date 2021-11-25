require('dotenv').config();
var createError = require("http-errors");
var express = require("express");

var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var pg = require("pg");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var loginRouter = require("./routes/login");
var signupRouter = require("./routes/signup");
var testAPIRouter = require("./routes/testAPI");

// Postgres
const client = new pg.Client({
	password: "postgres",
	user: "postgres",
	host: "postgres",
});
client.connect();

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
	req.db = client; //this db comes from app.js context where you define it
	next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/testAPI", testAPIRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	res.status(err.status || 500);
	res.send("Please check that your query is valid.");
});

// Set up for socket.io
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

let users = [];
const messages = {
	history: [],
};

// Connection event, sockets represent user
io.on("connection", (socket) => {
	/*socket.on('join_server',  (username) => {
		const user = {
			username,
			id: socket.id,
		};
		users.push(user);
		io.emit('new_user', users);
	});*/

	socket.on("join_room", (room_id, callback) => {
		socket.join(room_id);
		callback(messages[room_id]);
	});

	socket.on("drawing", (data, room_id) => {
		socket.to(room_id).emit("drawing", data);
	});

	//Disconnection event, filter out user that leaves room
	socket.on("disconnect", () => {
		users = user.filter((u) => u.id != socket.id);
		io.emit("new_user", users);
	});
});

/*server.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})*/

module.exports = app;
