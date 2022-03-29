import React, { useState } from "react";
import { useWeather } from "../context/weatherContext";

const Index = () => {
  const { currentData, setCityName } = useWeather();
  const [inputCity, setInputCity] = useState("");

  const onPress = (e) => {
    if (e.key === "Enter") {
      setCityName(inputCity);
      setInputCity("");
    }
  };

  const currentDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return `${day}-${month + 1}-${year}`;
  };
  // console.log(currentData);
  //24°C
  return (
    <div>
      <div className="search">
        <input
          type="text"
          placeholder="Enter City"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          onKeyPress={onPress}
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            {currentData ? <p>{currentData.name} </p> : <p>Yükleniyor</p>}
          </div>

          <div className="temp">
            {currentData.main ? (
              <h1>{currentData.main.temp.toFixed()}°C</h1>
            ) : (
              <h1>Yükleniyor....</h1>
            )}
          </div>
        </div>

        <div className="bottom">
          <div className="weather">
            {currentData.weather ? (
              <p className="bold">{currentData.weather[0].description}</p>
            ) : (
              <p>Yükleniyor...</p>
            )}
            <p>Weather</p>
          </div>
          <div className="feels">
            {currentData.main ? (
              <p className="bold">{currentData.main.feels_like.toFixed()}°C</p>
            ) : (
              <p>Yükleniyor</p>
            )}
            <p>Feels Like</p>
          </div>
          <div className="date">
            <p className="bold">{currentDate()} </p>
            <p>Date</p>
          </div>
          <div className="humidity">
            <div>
              {currentData.main ? (
                <p className="bold">{currentData.main.humidity}%</p>
              ) : (
                <p>Yükleniyor</p>
              )}
            </div>
            <p>humidity</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
