import { useState, useEffect } from "react";
import { Days } from "./Days";
import { Route, Routes, HashRouter } from "react-router-dom";
import { DayDetails } from "./DayDetails";

function App() {
  const [weather, setWeather] = useState([]);

  const fetchWeather = async () => {
    const res = await fetch(
      "https://api.openweathermap.org/data/2.5/forecast?lat=41.2&lon=69.2&appid=f45fe9e7e3c6b5f0dd6c7f74c8f1a6b3"
    );
    const data = await res.json();
    return data;
  };

  const successCall = position => {
    console.log(position);
  }

  const errorCall = error => {
    console.log(error);
  }

  const getUserLocation = () => {
    navigator.geolocation.watchPosition(successCall, errorCall)
  }

  useEffect(() => {
    const getWeather = async () => {
      const dayWeather = await fetchWeather();

      const groupedData = dayWeather.list.reduce((days, row) => {
        const date = row.dt_txt.split(" ")[0];
        days[date] = [...(days[date] ? days[date] : []), row];
        return days;
      }, []);
      setWeather(groupedData);
    };
    getWeather();
    getUserLocation();
  }, []);

  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Days weather={weather} />}></Route>
          <Route
            path="/Weather-App-React/:id"
            element={<DayDetails weather={weather} />}
          />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
