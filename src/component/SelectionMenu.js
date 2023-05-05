import React, { useState } from "react";
import PlanetSelection from "./PlanetSelection";
import VehicleSelection from "./VehicleSelection";
import { filterByValue, getPlanetDistance } from "../App";

function VehicleDetails({}) {}
function SelectionMenu({
  title,
  planets,
  selectedData,
  setSelectedData,
  vehicles,
  setVehicles,
}) {
  const [planetState, setPlanetState] = useState("");
  const [distanceState, setDistanceState] = useState("");
  const [vehiceState, setVehicleState] = useState(undefined);

  const [planetToggle, setPlanetToggle] = useState(false);
  const [vehicleToggle, setVehicleToggle] = useState(false);

  const handlePlanetSelect = (selectedOption, prevOption) => {
    const selectedPlanet = selectedOption.planet;
    const distance = getPlanetDistance(planets, selectedPlanet);
    selectedData[selectedPlanet] = undefined;
    if (prevOption) {
      delete selectedData[prevOption.planet];
    }
    const updatedVehicles = availableVehicles(selectedData, vehicles);
    setVehicles(updatedVehicles);
    setDistanceState(distance);
    setPlanetToggle(true);
    setPlanetState(selectedOption.planet);
    //console.log(vehicleSelect);
  };

  const PlanetDetails = ({ distance }) => {
    return <p>Distance : {distance}</p>;
  };

  const findByName = (objArr, name) => {
    return objArr.find((obj) => obj.name === name);
  };
  const handleVehicleSelect = (selectedVehicle) => {
    const updatedVehicles = availableVehicles(selectedData, vehicles);
    const sv = findByName(vehicles, selectedVehicle);
    selectedData[planetState] = sv.name;
    setSelectedData((prev) => ({
      ...prev,
      [planetState]: sv.name,
    }));

    //console.log(sv.name);
    setVehicles(updatedVehicles);
  };

  //console.log(selectedData);
  const availableVehicles = (selectedData, vehicles) => {
    const vehicleSelected = Object.values(selectedData);
    return vehicles.map((vehicle) => {
      const selectedVehicleObject = filterByValue(
        vehicleSelected,
        vehicle.name
      );
      const totalSelected = selectedVehicleObject
        ? selectedVehicleObject.length
        : 0;

      vehicle.available =
        vehicle.total_no - (totalSelected ? totalSelected : 0);

      return vehicle;
    });
  };

  return (
    <div>
      <h6>{title}</h6>
      <p> Select a Planet </p>
      <PlanetSelection
        planets={planets}
        selectedData={selectedData}
        handlePlanetSelect={handlePlanetSelect}
      />
      {/* Planet Details */}
      {planetToggle && <PlanetDetails distance={distanceState} />}
      <hr></hr>
      {/*Select Vehicle */}
      {planetToggle && (
        <VehicleSelection
          vehicles={vehicles}
          handleVehicleSelect={handleVehicleSelect}
          planet={planetState}
          distance={distanceState}
        />
      )}
      {/* Vehicle Details */}
      <VehicleDetails />
    </div>
  );
}

export default SelectionMenu;
