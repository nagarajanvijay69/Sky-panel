const userModel = require("../model/userModel");
const weatherResponse = require('../services/weatherAI');

// weather controllers

exports.setWeatherCity = async (req, res) => {
    const { city, _id } = req.body;

    if (!city) return res.status(200).json({ sccess: false, message: "city required" });
    if (!_id) return res.status(200).json({ sccess: false, message: "_id required" });

    try {

        let user = await userModel.findByIdAndUpdate(_id, { weatherCity: city }, { new: true });
        res.status(200).json({ success: true, message: "City stored successfully", user });
    } catch (e) {
        res.status(200).json({ success: false, message: e.message });
    }
}

exports.getWeather = async (req, res) => {
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
                main, description, icon
            }, wind: {
                speed
            }, name
        } = await data;
        const aiResponse = await weatherResponse({
            temp, feels_like, humidity, sunrise, sunset, description,
            speed, name, ai: data, icon, city
        });

        res.status(200).json({
            success: true, data: {
                temp, feels_like, humidity, sunrise, sunset, description,
                speed, name, ai: data, icon, aiResponse
            }
        });

    } catch (e) {
        res.status(200).json({ success: false, message: e.message });
    }
}