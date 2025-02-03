import { useState, useEffect } from "react";
import axios from "axios";

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const capital = country.capital ? country.capital[0] : ''; 

  useEffect(() => {
    if (!capital) return;

    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, [capital, api_key]);

  return (
    <div>
      <h3>{country.name.common}</h3>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="200" />
      <p><strong>Capital:</strong> {capital}</p>
      <p><strong>Area:</strong> {country.area} km²</p>
      <p><strong>Languages:</strong> {Object.values(country.languages).join(", ")}</p>

      {weather && (
        <div>
          <h4>Weather in {capital}</h4>
          <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
          <p><strong>Wind:</strong> {weather.wind.speed} m/s</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
      )}
    </div>
  );
};

export default CountryDetails;
