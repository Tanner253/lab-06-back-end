'use strict'

//load env variables from .env
require('dotenv').config();


//appplication dependencies
const express = require('express');


//application setup
const PORT = process.env.PORT || 3000;
const app = express();

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

// API routes
app.get('/location', (request, response) => {
  const locationData = searchToLatLong(request.query.data);
  response.send(locationData);
})

// Error handler
function handleError(err, res) {
  console.error(err);
  if (res) res.status(500).send('Sorry, something went wrong');
}

//Make sure server is listening for requests
app.listen(PORT, () => console.log(`App is up on ${PORT}`));
