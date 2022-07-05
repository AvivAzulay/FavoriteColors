import express from "express";
import routes from "./routes";
import cors from "cors";
import * as bodyParser from "body-parser";
import { Server } from "socket.io";
import http from "http";
import "./config/sqlConfig";
import path from "path";

const app = express();
const port = 3030;
const server = http.createServer(app);

// Setting up cors-origin
const corsOptions = {
  origin: [
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "http://127.0.0.1:3030",
    "http://localhost:3030",
  ],
  credentials: true,
};

// Setting up socket server
const io = new Server(server, {
  cors: {
    origin: [
      "http://127.0.0.1:3000",
      "http://localhost:3000",
      "http://127.0.0.1:3030",
      "http://localhost:3030",
    ],
    methods: ["GET", "POST"],
  },
});

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(routes);

// Setting up socket connection
io.on("connection", (socket) => {
  socket.on("vote_color", (data) => {
    socket.broadcast.emit("color_voted", data);
  });
});

server.listen(port, () => {
  return console.log(`Express is listening at ${port}`);
});
