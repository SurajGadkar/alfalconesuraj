import React, { useState, useHistory } from "react";
import SelectionMenu from "./SelectionMenu";
import CalculateTime from "./CalculateTime";
import axios from "axios";
import Found from "./Found";
import { Routes, Route } from "react-router-dom";

function Main({
  token,
  planets,
  vehicles,
  selectedData,
  setSelectedData,
  setVehicles,
}) {
  const [found, setFound] = useState({});

  const handleClick = (e) => {
    if (!token) return;
    const planet_names = Object.keys(selectedData);
    const vehicle_names = Object.values(selectedData);

    //console.log({ token, planet_names, vehicle_names });
    findFalcone({ token, planet_names, vehicle_names });
  };

  const findFalcone = async (army) => {
    try {
      const result = await axios.post(
        "https://findfalcone.geektrust.com/find",
        army,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/jsoon",
          },
        }
      );
      //console.log(result.data);
      setFound(result.data);
      return result;
    } catch (e) {
      console.log(e.message);
    }
  };
  //console.log(found);
  return (
    <div>
      <h1>Finding Al Falcone !</h1>
      <div className="container">
        <h2>Select the planets you want to search</h2>
        <div className="selection-menu">
          <div className="row">
            <div className="col-lg-2 card">
              <SelectionMenu
                title={"Destination 1"}
                planets={planets}
                vehicles={vehicles}
                setVehicles={setVehicles}
                selectedData={selectedData}
                setSelectedData={setSelectedData}
              />
            </div>
            <div className="col-lg-2 card">
              <SelectionMenu
                title={"Destination 2"}
                planets={planets}
                vehicles={vehicles}
                setVehicles={setVehicles}
                selectedData={selectedData}
                setSelectedData={setSelectedData}
              />
            </div>
            <div className="col-lg-2 card">
              <SelectionMenu
                title={"Destination 3"}
                planets={planets}
                vehicles={vehicles}
                setVehicles={setVehicles}
                selectedData={selectedData}
                setSelectedData={setSelectedData}
              />
            </div>
            <div className="col-lg-2 card">
              <SelectionMenu
                title={"Destination 4"}
                planets={planets}
                vehicles={vehicles}
                setVehicles={setVehicles}
                selectedData={selectedData}
                setSelectedData={setSelectedData}
              />
            </div>
          </div>
        </div>
        <div className="timetaken">
          <CalculateTime
            planets={planets}
            vehicles={vehicles}
            selectedData={selectedData}
          />
        </div>
        <div className="findFalcone">
          <button className="find-btn" onClick={handleClick}>
            {" "}
            Find Falcone !
          </button>
        </div>

        {found.status && (
          <Found planet={found.planet_name} status={found.status} />
        )}
      </div>
    </div>
  );
}

export default Main;
