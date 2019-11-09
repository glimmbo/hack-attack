// DEFINING OBJECTS
const mymap = L.map("map").fitWorld();
const playerDot = L.divIcon({ className: "player-dot" });
const pointDot = L.divIcon({ className: "point-dot" });
const otherPointDot = L.divIcon({ className: "other-point-dot" });

L.tileLayer(
  "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken:
      "pk.eyJ1IjoiZ2xpbW1ibyIsImEiOiJjazFjdmYxeTIwMW9kM2JzMTVuZjUxb2o3In0.Cys3Yd0OhmEj1-BfxzVmKg"
  }
).addTo(mymap);

// SET INITIAL VIEW
mymap.locate({
  setView: true,
  timeout: 15000,
  enableHighAccuracy: false, // has problems with timeout on desktop?
  // watch: true, // how to set update interval?
});

// CALLBACKS

let approxCircle
let myPos

function locFound(e) {
  const radius = e.accuracy;
  mpPos = L.marker(e.latlng, {icon: playerDot}).addTo(mymap)
  approxCircle = L.circle(e.latlng, radius).addTo(mymap)
  socket.emit("locationUpdate", e.latlng)
}

function locNotFound(e) {
  console.log(e)
}

function addPoint(e) {
  L.marker(e.latlng, {icon: pointDot}).addTo(mymap)
  socket.emit("pointAdded", {point: e.latlng, player: socket.id})
}

// EVENTS

mymap.on("locationfound", locFound);
mymap.on("locationerror", locNotFound);
mymap.on("click", addPoint)

socket.on("newPoint", data => {
  if (data.player !== socket.id) {
    /*const point = */ L.marker(data.point, {icon: otherPointDot}).addTo(mymap)
    // mymap.flyTo(point, 15)
  }
})