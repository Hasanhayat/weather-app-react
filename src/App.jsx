import './App.css'
import React, { useState } from "react";
import axios from "axios";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getCityWeather = async () => {
    if (!city) {
      setError("Please enter a city name!");
      return;
    }
    setError(""); // Clear previous error
    const apiKey = "0b3a4560180a457daa0152104242510";
    const URL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
      const response = await axios.get(URL);
      const data = response.data;

      setWeather({
        location: `Location: ${data.location.name}, ${data.location.region}, ${data.location.country}`,
        icon: `https:${data.current.condition.icon}`,
        text: data.current.condition.text,
        tempC: data.current.temp_c,
        tempF: data.current.temp_f,
        feelslike: data.current.feelslike_c,
        humidity: data.current.humidity,
        visibility: data.current.vis_km,
        wind: data.current.wind_kph,
      });
    } catch (err) {
      console.error(err);
      setError("Error fetching weather data. Please check your internet connection or city name.");
      setWeather(null); // Clear weather data on error
    }
  };

  return (
    <div>
      <header>
        <h1>WEATHER APPLICATION</h1>
      </header>

      <main>
        <section className="temp">
          {weather && <img src={weather.icon} alt="Weather Icon" />}
          {weather && <h1 className="tempInCel">{`${weather.tempC}°C`}<sub>({weather.text})</sub></h1>}
        </section>
        <section className="details">
          <ul>
            {weather && (
              <>
                <li>{weather.location}</li>
                <li>{`Fahrenheit: ${weather.tempF} °F`}</li>
                <li>{`Feelslike: ${weather.feelslike} °C`}</li>
                <li>{`Humidity: ${weather.humidity}%`}</li>
                <li>{`Visibility: ${weather.visibility} km`}</li>
                <li>{`Wind Speed: ${weather.wind} kph`}</li>
              </>
            )}
            {error && <li>{error}</li>}
          </ul>
        </section>
      </main>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          getCityWeather();
        }}
        className="container"
      >
        <input
          id="city"
          type="text"
          placeholder="ENTER CITY NAME"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">CHECK WEATHER</button>
      </form>
    </div>
  );
};

export default WeatherApp;
