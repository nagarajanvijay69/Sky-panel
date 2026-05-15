const express = require('express');
const weather = express.Router();
const { userModel } = require('../mongoose/model/model');


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
                    speed, name, ai: data, icon
               }
          });

     } catch (e) {
          res.status(200).json({ success: false, message: e.message });
     }
});


weather.post('/setCity', async (req, res) => {
     const { city, _id } = req.body;
     
     if (!city) return res.status(200).json({ sccess: false, message: "city required" });
     if (!_id) return res.status(200).json({ sccess: false, message: "_id required" });

     try {

          let user = await userModel.findByIdAndUpdate(_id, { weatherCity: city }, {new: true});          
          res.status(200).json({ success: true, message: "City stored successfully", user });
     } catch (e) {
          res.status(200).json({ success: false, message: e.message });
     }
});


module.exports = weather;