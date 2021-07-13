// Creating a new map and setting full screen control
var mymap = L.map('mapid', {
        fullscreenControl: true,
        // OR
        fullscreenControl: {
            pseudoFullscreen: false // if true, fullscreen to page width and height
        }
    })
    .setView([21.21603208, 92.15620182], 13);

// Adding fullscrean control
mymap.on('fullscreenchange', function() {
    if (mymap.isFullscreen()) {
        console.log('entered fullscreen');
    } else {
        console.log('exited fullscreen');
    }
});
// Addind info control
var info = L.control();

info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function(props) {
    this._div.innerHTML = '<h4>Refugees Population by Camp</h4>' + (props ?
        '<b>' + props.name + '</b><br/>Upazila: ' + props.upazila + ' | Union: ' + props.union + '</b><br/> Total Individuals: ' + props.population :
        'Hover over a camp');
};

info.addTo(mymap);
// Adding legend control to the map
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML = '<h5>Legend</h5>' +
        '<p><i style="background:#582767"></i>Camps</p>' +
        '<p><i style="background:#DA426C"></i>Roads</p>' +
        '<p><i style="background:#235FD9"></i>District Boundery</p>';
    return div;
};

legend.addTo(mymap);
// Function for heighlited feature
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        stroke: false,
        fillColor: '#038C33',
        fillOpacity: 1
    });
    info.update(layer);
    // console.log(layer.name);
}
// mouse out function
function resetHighlight(e) {
    var layer = e.target;
    layer.setStyle({
        stroke: false,
        fillColor: '#582767',
        fillOpacity: 0.7,
    });
    info.update();
}
// create a new pane with z index for layer overlay indexing
mymap.createPane('circles');
mymap.getPane('circles').style.zIndex = 650;
// create a new pane with z index for layer overlay indexing
mymap.createPane('back');
mymap.getPane('back').style.zIndex = 200;
// create a new pane with z index for layer overlay indexing
mymap.createPane('farback');
mymap.getPane('farback').style.zIndex = 100;
// adding basemap layer by mapbox api
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    opacity: 0.70,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    pane: 'farback',
    accessToken: 'pk.eyJ1Ijoic21hcnF1ZXMiLCJhIjoiY2pyeGg2M2ZlMGxhNjQ0b2E1ajh5OWl5YiJ9.G074wzH9zGbDUonl3rJWrg'
}).addTo(mymap);
// jQuery ajax api call for adding foothpath multiline featureclass
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
// jQuery ajax api call for adding area of interest polygon
$.get("/v1/api/aoi", function(data, status) {
        L.geoJSON(data, {
                style: function(feature) {
                    return {
                        stroke: true,
                        weight: 2,
                        // opacity: 0.5,
                        color: '#235FD9'
                    };
                },
                pane: 'back'
            })
            .addTo(mymap)
    },
    dataType = "json"
);
// jQuery ajax api call for adding camp location
var camploc = $.parseJSON($.ajax({
    url: '/v1/api/camploc',
    dataType: "json",
    async: false
}).responseText);
// Drawing camp location circle to the map
camploc.forEach(element => {
    var circleLyr = L.circle([element.Latitude, element.Longitude], {
            stroke: false,
            fillColor: '#582767',
            fillOpacity: 0.7,
            radius: parseInt(element.Total_HH) / 50
        }, { pane: 'circles' })
        .addTo(mymap);
    // Adding properties to the layer
    circleLyr.name = element.New_Camp_Name;
    circleLyr.upazila = element.Upazila;
    circleLyr.union = element.Union;
    circleLyr.population = element.Total_Individuals;
    circleLyr.on('mouseover', highlightFeature);
    circleLyr.on('mouseout', resetHighlight);
    circleLyr.addTo(mymap);
});