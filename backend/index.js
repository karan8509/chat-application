const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    credentials: true,
  },
});

app.use(cors({
    origin : "http://localhost:5173",
    credentials: true,

}));
const port = process.env.PORT || 7000;

io.on("connection", (socket) => {
  console.log("new user  ", socket.id);
  socket.on("message-user", (data) => {
  console.log("Message received:", data);

  // Send message to all other clients
  socket.broadcast.emit("message-user", data);
});
});

app.get("/"  , (req , res) => {
    res.json({message : "true"})
})

server.listen(port, () => {
  console.log(`server is running on port  http://localhost:${port}`);
});
