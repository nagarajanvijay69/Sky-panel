const express = require('express');
const weather = express.Router();
const { setWeatherCity, getWeather } = require('../controller/weatherController')

// get weather
weather.get('/weather/:city',getWeather);

// set weather to user
weather.post('/setCity', setWeatherCity);


module.exports = weather;