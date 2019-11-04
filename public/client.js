// this address will change depending where you are
const socket = io.connect('10.2.122.242:3001')
const button = document.getElementById("players")

const playerLookup = () => {
  socket.emit("players")
}

button.addEventListener('click', playerLookup)

socket.on("playersResult", data => console.log(data))