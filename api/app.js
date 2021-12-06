require("dotenv").config();
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
var strokesRouter = require("./routes/strokes");
var commentsRouter = require("./routes/comments");
var historyRouter = require("./routes/history");

// Postgres
const client = new pg.Client({
    password: "postgres",
    user: "postgres",
    host: "postgres"
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
app.use("/strokes", strokesRouter);
app.use("/comments", commentsRouter);
app.use("/history", historyRouter);

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
var socketapp = express();
var server = require("http").createServer(socketapp);
var io = require("socket.io")(server, {
    cors: {
        origin: "*"
    }
});

var serv_port = 4000;

server.listen(serv_port, function () {
    console.log("Express server listening on port %d in %s mode", serv_port, socketapp.get("env"));
});

// Connection event, sockets represent user
io.on("connection", (socket) => {
    console.log(`Listening on port: ${socket.id}`);

    socket.on("join_room", (room_id) => {
        socket.join(room_id);
    });

    socket.on("drawing", (room_id, data) => {
        socket.to(room_id).emit("drawing", data);
    });

    socket.on("comment", (room_id, comment) => {
        socket.to(room_id).emit("comment", comment);
    });
});

module.exports = app;
