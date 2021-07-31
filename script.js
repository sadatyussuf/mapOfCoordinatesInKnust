const nameOfCoord = document.querySelector('.name')
const locationOfCoord = document.querySelector('.loc')
const heightOfCoord = document.querySelector('.height')
const northOfCoord = document.querySelector('.north')
const eastOfCoord = document.querySelector('.east')
const latOfCoord = document.querySelector('.lat')
const lonOfCoord = document.querySelector('.lon')

const closebtn = document.querySelector('.close')
const popupBox = document.querySelector('.coords_info')



// Preparing the map   [51.505,-0.09]
var mymap = L.map('mapid').setView([6.6745,-1.5716],15)

// Setting up the map
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    // maxZoom: 25,
    // minZoom: 15,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoic2FkYXR5dXNzdWYiLCJhIjoiY2twbGswNzNxMDZmbTJ2cndpbjlkZ24yaCJ9.fVWAfzU_pkkU5EEVtiOsCQ'
}).addTo(mymap);

// mymap.addControl(L.control.locate({
//     locateOptions: {
//         enableHighAccuracy: true
// },

// }));
// const lc = L.control.locate().addTo(mymap);
// lc.start();
// lc.locate();
// console.log(lc.start())





// Dealing with events
// var popup = L.popup();

// function onMapClick(e){
//     popup
//     .setLatLng(e.latlng)
//     .setContent(`You clicked the map at ${e.latlng}`)
//     .openOn(mymap);
// }
// mymap.on('click',onMapClick);




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
        const getName = element.properties.Name
        const getlocation = element.properties.Descprition
        const getnorth = parseFloat(element.properties.Y)
        const geteast = parseFloat(element.properties.X)
        const getlat = parseFloat(element.properties.latitude)
        const getlon = parseFloat(element.properties.longitude)
        
        var coords = element.geometry.coordinates
        var coordsMarker = L.circleMarker(coords.reverse(),geojsonMarkerOptions).addTo(mymap)

        coordsMarker.on('click', function(e) {
            nameOfCoord.textContent = getName
            locationOfCoord.textContent = getlocation
            northOfCoord.textContent = Math.round((getnorth + Number.EPSILON) * 100) / 100
            eastOfCoord.textContent = Math.round((geteast + Number.EPSILON) * 100) / 100
            latOfCoord.textContent = getlat
            lonOfCoord.textContent = getlon

            if ( element.properties.height == 'N/A') {
                heightOfCoord.textContent = element.properties.height
            } else {
                heightOfCoord.textContent = Math.round((parseFloat(element.properties.height) + Number.EPSILON) * 100) / 100
            }

            popupBox.classList.remove('hide')

        } );
        
    });
   
    // updateStarCount(postElement, data);
  });

  

  closebtn.addEventListener('click',()=>{
    popupBox.classList.add('hide')
})


function userLocation(){
    mymap.locate({setView: true, maxZoom: 19});

    function onLocationFound(e) {
        var radius = e.accuracy;
    
        L.marker(e.latlng).addTo(mymap)
            .bindPopup("You are within " + radius + " meters from this point").openPopup();
    
        L.circle(e.latlng, radius).addTo(mymap);
    }
    
    mymap.on('locationfound', onLocationFound)
}



// Adding Markers
// var marker = L.marker([6.6745,-1.5716]).addTo(mymap);

// Adding popups
// marker.bindPopup("<b>Hello World</b><br>I am a popup.")

