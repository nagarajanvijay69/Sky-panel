const express = require('express');
const weatherRoute = express.Router();
const { setWeatherCity, getWeather, getWeathers } = require('../controller/weatherController')

// get weather
weatherRoute.get('/weather/:city',getWeather);
weatherRoute.get('/weathers/:city',getWeathers);

// set weather to user
weatherRoute.post('/setCity', setWeatherCity);


module.exports = weatherRoute;