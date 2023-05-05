import "./App.css";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Main from "./component/Main";
import { Routes, Route } from "react-router-dom";
import Found from "./component/Found";

export const getPlanetDistance = (planets, selectedPlanet) => {
  if (!selectedPlanet) return;
  let details = planets.filter((planet) => planet.name === selectedPlanet);
  return Number(details[0].distance);
};

export const getVehicleSpeed = (vehicles, selectedVehicle) => {
  let obj = vehicles.filter((vehicle) => vehicle.name === selectedVehicle);
  let details = !selectedVehicle ? 0 : obj[0].speed;
  return Number(details);
};

export const filterByValue = (arr, value) => {
  if (!value || !arr) return [];
  return arr.filter((val) => val === value);
};

function App() {
  const [token, setToken] = useState(null);
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const [selectedData, setSelectedData] = useState({});

  const getToken = async () => {
    try {
      const newToken = await axios.post(
        "https://findfalcone.geektrust.com/token",
        {},
        { headers: { Accept: "application/json" } }
      );
      setToken(newToken.data.token);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchAPI = async () => {
    try {
      const getPlanets = await axios.get(
        "https://findfalcone.geektrust.com/planets"
      );
      setPlanets(getPlanets.data);

      const getRockets = await axios.get(
        "https://findfalcone.geektrust.com/vehicles"
      );
      setVehicles(getRockets.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  //console.log("Planets", planetSelect);
  //console.log("Rockets", vehicleSelect);

  //console.log(selectedPlanets);
  //console.log("Planets", planets);
  //console.log("Rokcets", rockets);

  useEffect(() => {
    getToken();
    fetchAPI();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Main
              token={token}
              planets={planets}
              vehicles={vehicles}
              selectedData={selectedData}
              setSelectedData={setSelectedData}
              setVehicles={setVehicles}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
