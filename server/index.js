import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";
const app = express();
dotenv.config();
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT"],
  },
});

io.on("connection", (socket) => {
  console.log("user connected!: ", socket.id);
  console.log("socket is active  connected!");
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`user connected:${socket.id} and joined room ${data}`);
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected!: ", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
