var mymap = L.map("mapid");
var marker, circle;

function initMap(latitude, longitude) {
    mymap.setView([latitude, longitude], 3);
    //UI Layer
    marker = L.marker([latitude, longitude]).addTo(mymap);
    // Tile Layer
    L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
            attribution:
                'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: "mapbox/dark-v10",
            tileSize: 512,
            zoomOffset: -1,
            accessToken:
                "pk.eyJ1IjoiNTcwOTkyMjQzIiwiYSI6ImNqbmtlaWR6cjE5aDEzcG9zZmR2NGhwcHAifQ.qN03wf14dQ8iSKZf6HzUOg",
        }
    ).addTo(mymap);
}

function updateMap(latitude, longitude) {
    mymap.setView([latitude, longitude]);
    marker.setLatLng([latitude, longitude]);
    circle.setLatLng([latitude, longitude]);
}
