const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/map", (req, res, next) => {
  res.sendFile(__dirname + "/public/map.html");
});

// fucntion to give array of connected socket ids
const connectedClients = () => {
    return Object.keys(io.sockets.connected)
};

io.on("connection", socket => {
    console.log(connectedClients())
    socket.on("players", () => {
        socket.emit("playersResult", connectedClients())
    })
    socket.on("location", data => console.log(data))
})

app.listen(3000, () => {
    console.log('app listening on 3000')
});
  
http.listen(3001, function(socket) {
    console.log("io listening on 3001");
});