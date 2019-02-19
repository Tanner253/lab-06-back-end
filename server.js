'use strict'

//load env variables from .env
require('dotenv').config();


//appplication dependencies
const express = require('express');
const cors = require('cors');


//application setup
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());

// function to search lat/lon
function Location(query, res){
  console.log('res in Location()', res);
  this.search_query = query;
  this.formatted_query = res.results[0].formatted_address;
  this.latitude = res.results[0].geometry.location.lat;
  this.longitude = res.results[0].geometry.location.lng;
}

function searchToLatLong(query) {
  const geoData = require('./data/geo.json');
  const location = new Location(query, geoData);
  console.log('location in searchToLatLong()', location);
  return location;
}

// function to get weather data
function Weather(day){
  this.forecast = day.summary;
  this.time = new Date(day.time*1000).toString().slice(0,15);
}

function getWeather(){
  const darkskyData = require('./data/darksky.json');
  let weatherSummaries = [];

  darkskyData.daily.data.forEach(day => {
    weatherSummaries.push(new Weather(day));
  })
  return weatherSummaries;
}

// function to handle errors
function handleError(err, res) {
  console.error(err);
  if (res) res.status(500).send('Sorry, something went wrong');
}

// API routes
app.get('/location', (request, response) => {
  const locationData = searchToLatLong(request.query.data);
  response.send(locationData);
})

app.get('/weather', (request, response) => {
  const weatherData = getWeather();
  response.send(weatherData);
})

app.use('*', (err, res) => handleError(err, res));

//Make sure server is listening for requests
app.listen(PORT, () => console.log(`App is up on ${PORT}`));
