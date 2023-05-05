import React from "react";
import { RadioGroup, Radio } from "react-radio-group";

function SelectVehicle({ name, isDisabled, availableVehicles }) {
  return (
    <div>
      <Radio value={name} disabled={isDisabled} />
      {name} ({availableVehicles})
    </div>
  );
}
function VehicleSelection({ vehicles, planet, handleVehicleSelect, distance }) {
  // console.log(vehicles);
  const radioOptions = (planet != null ? vehicles : []).map((vehicle) => {
    const name = vehicle.name;
    const total_no = vehicle.total_no;
    const availableVehicles =
      vehicle.available !== undefined ? vehicle.available : total_no;
    const isDisabled =
      distance > vehicle.max_distance || availableVehicles === 0;

    return (
      <SelectVehicle
        key={name}
        name={name}
        isDisabled={isDisabled}
        availableVehicles={availableVehicles}
      ></SelectVehicle>
    );
  });
  return (
    <div>
      <RadioGroup name={planet} onChange={handleVehicleSelect}>
        {radioOptions}
      </RadioGroup>
    </div>
  );
}

export default VehicleSelection;
