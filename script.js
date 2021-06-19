// Preparing the map   [51.505,-0.09]
var mymap = L.map('mapid').setView([6.6745,-1.5716],15)

// Setting up the map
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 25,
    minZoom: 15,
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


 // load GeoJSON from an external file
$.getJSON("latlng.geojson",function(data){
    // add GeoJSON layer to the map once the file is loaded

    var geojsonMarkerOptions = {
        radius: 5,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
    L.geoJson(data  ,{
        
        pointToLayer: function(feature,latlng){

            return L.circleMarker(latlng,geojsonMarkerOptions);
        }
    }  ).addTo(mymap);
});