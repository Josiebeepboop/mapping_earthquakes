// Add console.log to check to see if our code is working.
console.log("working");

// // Create the map object with a center and zoom level.
// let map = L.map('mapid').setView([40.7, -94.5], 4);

// // Grabbing our GeoJSON data
// L.geoJSON(airports, {
//   // We turn each feature into a marker on the map.
//   pointToLayer: function(feature,latlng) {
//     console.log(feature);
//     return L.marker(latlng).bindPopup("<h2>"+ feature.properties.name+"</h2><h><h3>" + feature.properties.city + ", " + feature.properties.country + "</h3>");
//   }
// }).addTo(map);

// // Grabbing our GeoJSON data
// L.geoJSON(airports, {
//   // We turn each feature into a marker on the map.
//   onEachFeature: function(feature,layer) {
//     console.log(layer);
//     layer.bindPopup("<h3> Airport Code: "+ feature.properties.faa + "</h3> <h> <h3> Airport name: " + feature.properties.name + "</h3>");
//   }
// }).addTo(map);

  // We create the tile layer that will be the background of our map.
  let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v12',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});
// // Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps
let baseMaps = {
  Street: streets,
  Dark: dark
};

// Create the map object with a center, zoom level, and default layer.
let map = L.map("mapid", {
  center: [
    30,30
  ],
  zoom: 2,
  layers: [streets]
});

// Pass our map layers into layers control and add the layers control to the map
L.control.layers(baseMaps).addTo(map);

// Coordinates for each point to be used in the line.
let airportData = "https://raw.githubusercontent.com/Josiebeepboop/mapping_earthquakes/main/majorAirports.json";
// console.log(airports);

// Grabbing our GeoJSON data with d3
d3.json(airportData).then(function(data) {
  console.log(data);
  //Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
      onEachFeature: function(feature,layer) {
        console.log(layer);
        layer.bindPopup("<h3> Airport Code: "+ feature.properties.faa + "</h3> <h> <h3> Airport name: " + feature.properties.name + "</h3>");
      }}).addTo(map);
});
