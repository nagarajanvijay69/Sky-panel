const express = require('express');
const weather = express.Router();


weather.get('/weather/:city', async (req, res) => {
     const city = req.params.city;
     if (!city) return res.status(200).json({ success: false, message: "City is required" });

     try {
          let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPEN_WEATHER_MAP}`);
          let data = await response.json();

          const {
               main: {
                    temp, feels_like, humidity
               }, sys: {
                    sunrise, sunset
               }, weather: {
                    main, discription, icon
               }, wind: {
                    speed
               }, name
          } = await data;

          res.status(200).json({
               success: true, data: {
                    temp, feels_like, humidity, sunrise, sunset, discription,
                    speed, name, ai: data
               }
          });

     } catch (e) {
          res.status(200).json({ success: false, message: e.message });
     }
});


module.exports = weather;