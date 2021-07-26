async function getData() {
    const response = await fetch("/api");
    const data = await response.json();

    var allLat = 0;
    var allLon = 0;

    for (item of data) {
        const dateString = new Date(item.timestamp).toLocaleString();
        const txt = `Latitude: ${item.lat} <br> 
            Longitude: ${item.lon} <br> 
            Date: ${dateString} <br> 
            Weather: ${item.weather.weather[0].main} <br>  
            Temperature:${item.weather.main.temp}`;
        addMarker(item.lat, item.lon, txt);

        allLat += item.lat;
        allLon += item.lon;
    }

    var aveLat = allLat / data.length;
    var aveLon = allLon / data.length;

    initHistoryMap(aveLat, aveLon);
    console.log(data);
}
