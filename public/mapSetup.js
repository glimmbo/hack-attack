// DEFINING OBJECTS
const mymap = L.map("map").fitWorld();
const playerDot = L.divIcon({ className: "player-dot" });
const pointDot = L.divIcon({ className: "point-dot" });

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
  timeout: 10000,
  enableHighAccuracy: true,
  // watch: true, // how to set update interval?
});

// CALLBACKS

let approxCircle

function locFound(e) {
  console.log(e)
  const radius = e.accuracy;
  approxCircle = L.circle(e.latlng, radius).addTo(mymap);
  socket.emit("locationUpdate", e.latlng)
}

function locNotFound(e) {
  console.log(e)
  alert(e.message)
}

function addPoint(e) {
  L.marker(e.latlng, pointDot).addTo(mymap)
  socket.emit("pointAdded", e.latlng)
}

// EVENTS

mymap.on("locationfound", locFound);
mymap.on("locationerror", locNotFound);
mymap.on("click", addPoint)

socket.on('newPoint', data => {
  console.log(data)
  L.marker(data, pointDot).addTo(mymap)
  // mymap.setView(point)
})