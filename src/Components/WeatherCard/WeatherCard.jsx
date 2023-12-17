// WeatherCard.js

import React from "react";

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString();
};

const WeatherCard = ({ weatherData }) => {
  const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2);
  };

  const kelvinToFahrenheit = (kelvin) => {
    return ((kelvin - 273.15) * (9 / 5) + 32).toFixed(2);
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 text-white rounded-lg overflow-hidden ">
      <div className="p-6">
        <h1 className="text-3xl font-semibold mb-4">{weatherData.name}</h1>
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="md:flex-1 md:mr-4">
            <p className="text-lg">
              Temperature: {kelvinToCelsius(weatherData.main.temp)}°C /{" "}
              {kelvinToFahrenheit(weatherData.main.temp)}°F
            </p>
            <p className="text-lg">
              Feels Like: {kelvinToCelsius(weatherData.main.feels_like)}°C /{" "}
              {kelvinToFahrenheit(weatherData.main.feels_like)}°F
            </p>
            <p className="text-lg">Pressure: {weatherData.main.pressure} hPa</p>
            <p className="text-lg">Humidity: {weatherData.main.humidity}%</p>
          </div>
          <img
            className="w-16 h-16 md:ml-4 mt-4 md:mt-0"
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            alt="Weather Icon"
          />
        </div>
        <div className="mt-4">
          <p className="text-lg">
            Min Temperature: {kelvinToCelsius(weatherData.main.temp_min)}°C /{" "}
            {kelvinToFahrenheit(weatherData.main.temp_min)}°F
          </p>
          <p className="text-lg">
            Max Temperature: {kelvinToCelsius(weatherData.main.temp_max)}°C /{" "}
            {kelvinToFahrenheit(weatherData.main.temp_max)}°F
          </p>
          <p className="text-lg">
            Visibility: {weatherData.visibility / 1000} km
          </p>
        </div>
      </div>
      <div className="bg-gray-700 p-4">
        <p className="text-lg font-semibold">Wind Information</p>
        <div className="flex items-center justify-between">
          <p className="text-lg">Wind Speed: {weatherData.wind.speed} m/s</p>
          <p className="text-lg">Wind Direction: {weatherData.wind.deg}°</p>
          {weatherData.wind.gust && (
            <p className="text-lg">Wind Gust: {weatherData.wind.gust} m/s</p>
          )}
        </div>
      </div>
      {weatherData.clouds && (
        <div className="bg-gray-600 p-4 mt-4">
          <p className="text-lg font-semibold">Cloudiness</p>
          <p className="text-lg">Cloudiness: {weatherData.clouds.all}%</p>
        </div>
      )}
      {weatherData.rain && (
        <div className=" p-4 mt-4">
          <p className="text-lg font-semibold">Rain Information</p>
          <p className="text-lg">Rain (1h): {weatherData.rain["1h"]} mm</p>
          {weatherData.rain["3h"] && (
            <p className="text-lg">Rain (3h): {weatherData.rain["3h"]} mm</p>
          )}
        </div>
      )}
      {weatherData.snow && (
        <div className=" p-4 mt-4">
          <p className="text-lg font-semibold">Snow Information</p>
          <p className="text-lg">Snow (1h): {weatherData.snow["1h"]} mm</p>
          {weatherData.snow["3h"] && (
            <p className="text-lg">Snow (3h): {weatherData.snow["3h"]} mm</p>
          )}
        </div>
      )}
      <div className=" p-4 mt-4">
        <p className="text-lg font-semibold">Sunrise and Sunset</p>
        <p className="text-lg">
          Sunrise: {formatDate(weatherData.sys.sunrise)}
        </p>
        <p className="text-lg">Sunset: {formatDate(weatherData.sys.sunset)}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
