const nameOfCoord = document.querySelector('.name')
const locationOfCoord = document.querySelector('.loc')
const heightOfCoord = document.querySelector('.height')
const northOfCoord = document.querySelector('.north')
const eastOfCoord = document.querySelector('.east')
const latOfCoord = document.querySelector('.lat')
const lonOfCoord = document.querySelector('.lon')


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
}
mymap.on('click',onMapClick);




var geojsonMarkerOptions = {
        radius: 5,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

db.on('value', (snapshot) => {
    const data = snapshot.val();
    data.forEach(element => {
        // console.log(element)
        var coords = element.geometry.coordinates
        // L.marker(coords.reverse()).addTo(mymap);
        var coordsMarker = L.circleMarker(coords.reverse(),geojsonMarkerOptions).addTo(mymap)
        // coordsMarker.bindPopup(``)
        
        // console.log(coords.reverse())


        coordsMarker.on('click', function(e) {
            nameOfCoord.textContent = element.properties.Name
            locationOfCoord.textContent =element.properties.Descprition
            heightOfCoord.textContent = element.properties.height
            northOfCoord.textContent = element.properties.Y
            eastOfCoord.textContent = element.properties.X
            latOfCoord.textContent = element.properties.latitude
            lonOfCoord.textContent = element.properties.longitude





            // console.log('clicked me')
            // console.log(e)
            // console.log(coords.reverse())
        } );
        
    });
   
    // updateStarCount(postElement, data);


  });

  









 // load GeoJSON from an external file
// * $.getJSON("latlng.geojson",function(data){
    // add GeoJSON layer to the map once the file is loaded

// *    var geojsonMarkerOptions = {
//         radius: 5,
//         fillColor: "#ff7800",
//         color: "#000",
//         weight: 1,
//         opacity: 1,
//         fillOpacity: 0.8
//     };
//     L.geoJson(data  ,{
        
//         pointToLayer: function(feature,latlng){

//             return L.circleMarker(latlng,geojsonMarkerOptions);
//         }
//     }  ).addTo(mymap);
// });





