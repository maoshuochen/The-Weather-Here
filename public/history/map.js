var historyMap = L.map("history-map");

function initHistoryMap(latitude, longitude) {
    historyMap.setView([latitude, longitude], 3);
    //UI Layer
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
    ).addTo(historyMap);
}

function addMarker(lat, lon, txt) {
    const marker = L.marker([lat, lon]).addTo(historyMap);
    marker.bindPopup(txt);
    marker.on("mouseover", function (e) {
        this.openPopup();
    });
    marker.on("mouseout", function (e) {
        this.closePopup();
    });
}
