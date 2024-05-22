const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const middleware = require("./src/utils/middleware");
const cors = require("cors");
require("./src/model/dbConnection");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

const roomsRouter = require("./src/routes/room.routes");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(middleware.errorHandler);
app.use(middleware.requestLogger);

app.use("/api/rooms", roomsRouter);

app.use(middleware.unknownEndpoint);
module.exports = app;
