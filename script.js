// Preparing the map   [51.505,-0.09]
var mymap = L.map('mapid').setView([6.6745,-1.5716],13)

// Setting up the map
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoic2FkYXR5dXNzdWYiLCJhIjoiY2twbGswNzNxMDZmbTJ2cndpbjlkZ24yaCJ9.fVWAfzU_pkkU5EEVtiOsCQ'
}).addTo(mymap);

// Adding Markers
var marker = L.marker([6.6745,-1.5716]).addTo(mymap);

// Adding popups
marker.bindPopup("<b>Hello World</b><br>I am a popup.")


// Dealing with events
var popup = L.popup();

function onMapClick(e){
    popup
    .setLatLng(e.latlng)
    .setContent(`You clicked the map at ${e.latlng}`)
    .openOn(mymap);
    // alert(`You clicked the map at ${e.latlng}`);
}
mymap.on('click',onMapClick);