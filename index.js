const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/public/map.html");
});

const connectedClients = () => {
  return Object.keys(io.sockets.connected);
};

io.on("connection", socket => {
  console.log('Client connected! Currently connected:', connectedClients());

  socket.on("locationUpdate", data => {
    console.log(`${socket.id}'s location:`, data)
  });

  socket.on("pointAdded", data => {
    console.log('newPoint coords:', data)
    socket.emit("newPoint", data)
  })
});

http.listen(3000, socket => {
  console.log("listening on 3000");
});
