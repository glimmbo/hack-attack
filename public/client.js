// this address will change depending where you are
const socket = io.connect("10.2.122.242:3001");
const button = document.getElementById("players");

const playerLookup = () => {
  socket.emit("players");
};
socket.on("playersResult", data => console.log(data));

const sendLoc = () => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos) {
    const crd = pos.coords;
    socket.emit("location", crd)

    document.getElementById("loc").innerHTML = crd

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }

  function error(err) {
    document.getElementById("loc").innerHTML = err.message
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
};

button.addEventListener("click", sendLoc);
