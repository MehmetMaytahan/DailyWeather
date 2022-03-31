import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";

const WeatherContext = createContext();
// https://api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}
// https://api.openweathermap.org/data/2.5/weather?q=${city}&cnt=7&units=metric&appid=${key}

const key = "22f31d7932b13634d43111743814955a";

const WeatherProvider = ({ children }) => {
  const [cityName, setCityName] = useState("istanbul");
  const [currentData, setCurrentData] = useState(true);
  const [err, setErr] = useState(false);

  useEffect(() => {
    getDataWeather(cityName);
  }, [cityName]);

  const getDataWeather = async (cityName) => {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`
      );
      setCurrentData(data);
    } catch (error) {
      setErr(true);
    }
  };

  const values = { cityName, currentData, setCityName, err };
  return (
    <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
  );
};

const useWeather = () => useContext(WeatherContext);

export { useWeather, WeatherProvider };
