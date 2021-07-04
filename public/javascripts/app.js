// Creating a new map and setting full screen control
var mymap = L.map('mapid', {
        fullscreenControl: true,
        // OR
        fullscreenControl: {
            pseudoFullscreen: false // if true, fullscreen to page width and height
        }
    })
    .setView([21.21603208, 92.15620182], 13);

// create a new pane with z index for layer overlay indexing
mymap.createPane('circles');
mymap.getPane('circles').style.zIndex = 650;
// create a new pane with z index for layer overlay indexing
mymap.createPane('back');
mymap.getPane('back').style.zIndex = 200;
// create a new pane with z index for layer overlay indexing
mymap.createPane('farback');
mymap.getPane('farback').style.zIndex = 100;

// L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')
//     .addTo(mymap);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    opacity: 0.70,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    pane: 'farback',
    accessToken: 'pk.eyJ1Ijoic21hcnF1ZXMiLCJhIjoiY2pyeGg2M2ZlMGxhNjQ0b2E1ajh5OWl5YiJ9.G074wzH9zGbDUonl3rJWrg'
}).addTo(mymap);

// $.get("http://localhost:3000/v1/api/fploc", function(data, status) {
//         L.geoJSON(data, {
//                 onEachFeature: function(feature, layer) {
//                     layer.bindPopup(feature.properties.Location);
//                 }
//             })
//             .addTo(mymap)
//     },
//     dataType = "json"
// );

$.get("/v1/api/fploc", function(data, status) {
        L.geoJSON(data, {
                style: function(feature) {
                    return {
                        stroke: true,
                        weight: 2,
                        opacity: 0.5,
                        color: '#DA426C'
                    };
                },
                pane: 'back'
            })
            .addTo(mymap)
    },
    dataType = "json"
);

$.get("/v1/api/aoi", function(data, status) {
        L.geoJSON(data, {
                style: function(feature) {
                    return {
                        stroke: true,
                        weight: 2,
                        // opacity: 0.5,
                        // color: '#DA426C'
                    };
                },
                pane: 'back'
            })
            .addTo(mymap)
    },
    dataType = "json"
);
// #582767, #272C8C
$.get("/v1/api/camploc", function(data, status) {
        data.forEach(element => {
            circle = new L.circle([element.Latitude, element.Longitude], {
                    stroke: false,
                    fillColor: '#582767',
                    fillOpacity: 0.7,
                    radius: parseInt(element.Total_HH) / 100
                }, { pane: 'circles' })
                .bringToFront()
                .bindPopup(element.New_Camp_Name)
                .addTo(mymap);
        });
    },
    dataType = "json"
);

mymap.on('fullscreenchange', function() {
    if (mymap.isFullscreen()) {
        console.log('entered fullscreen');
    } else {
        console.log('exited fullscreen');
    }
});