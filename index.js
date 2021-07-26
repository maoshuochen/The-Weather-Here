// import package
const { request, response } = require("express");
const express = require("express");
const Datastore = require("nedb");
const fetch = require("node-fetch");
require("dotenv").config();

// setup express
const app = express();
app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static("public"));
// app.use(express.static("public/history"));
app.use(express.json({ limit: "2mb" }));

// setup nedb
const database = new Datastore("database.db");
database.loadDatabase();

// route
app.post("/api", (request, response) => {
    //Handle request
    console.log("get request");
    console.log(request.body);
    const data = request.body;
    database.insert(data); //save to database
    response.json(data); //response
});

app.get("/api", (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.json({ error: "no result" });
        }
        response.json(data);
    });
});

app.get("/weather/:latlon", async (request, response) => {
    const latlon = request.params.latlon.split(",");
    const lat = latlon[0];
    const lon = latlon[1];
    const api_key = process.env.API_KEY;
    const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    response.json(json);
});
