var mymap = L.map('mapid', {
        fullscreenControl: true,
        // OR
        fullscreenControl: {
            pseudoFullscreen: false // if true, fullscreen to page width and height
        }
    })
    .setView([21.21603208, 92.15620182], 13);
// .setView([51.505, -0.09], 13);

// L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')
//     .addTo(mymap);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    opacity: 0.70,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
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

$.get("http://localhost:3000/v1/api/fploc", function(data, status) {
        L.geoJSON(data, {
                onEachFeature: function(feature, layer) {
                    layer.bindPopup(feature.properties.Location);
                }
            })
            .addTo(mymap)
    },
    dataType = "json"
);

$.get("http://localhost:3000/v1/api/aoi", function(data, status) {
        L.geoJSON(data, {
                onEachFeature: function(feature, layer) {
                    layer.bindPopup(feature.properties.Location);
                }
            })
            .addTo(mymap)
    },
    dataType = "json"
);

$.get("http://localhost:3000/v1/api/camploc", function(data, status) {
        data.forEach(element => {
            circle = new L.circle([element.Latitude, element.Longitude], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: parseInt(element.Total_HH) / 100
                })
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