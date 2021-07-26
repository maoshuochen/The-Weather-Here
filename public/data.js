function getGeoData(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const timestamp = position.timestamp;
    document.getElementById("latitude").textContent = lat;
    document.getElementById("longitude").textContent = lon;
    return { lat, lon, timestamp };
}

async function getWeather(lat, lon) {
    //Add weather
    const weather_url = `weather/${lat},${lon}`;
    const response = await fetch(weather_url);
    const json = await response.json();
    const summary = json.weather[0].main;
    const temp = json.main.temp;
    document.getElementById("summary").textContent = summary;
    document.getElementById("temp").textContent = temp;
    return json;
}

function submitData() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async function (position) {
            const geo = getGeoData(position);
            const lat = geo.lat;
            const lon = geo.lon;
            const timestamp = geo.timestamp;
            initMap(lat, lon, geo.timestamp);
            const weather = await getWeather(lat, lon);
            // const mood = document.getElementById("mood").value;

            const data = { lat, lon, timestamp, weather };

            // POST
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            };
            const response = await fetch("/api", options);
            // GET
            const json = await response.json();
            console.log(json);
        });
    } else {
        console.error("Geolocation API is not available!");
    }
}
