const express = require('express');
const weatherRoute = express.Router();
const { setWeatherCity, getWeather } = require('../controller/weatherController')

// get weather
weatherRoute.get('/weather/:city',getWeather);

// set weather to user
weatherRoute.post('/setCity', setWeatherCity);


module.exports = weatherRoute;