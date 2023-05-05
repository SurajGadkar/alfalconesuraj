import React from "react";
import { getPlanetDistance, getVehicleSpeed } from "../App";

function CalculateTime({ planets, vehicles, selectedData }) {
  let time = 0;

  for (const planet in selectedData) {
    const vehicle = selectedData[planet];

    const distance = getPlanetDistance(planets, planet);
    const speed = getVehicleSpeed(vehicles, vehicle);
    time += speed !== 0 ? distance / speed : 0;
    //console.log(distance, speed);
  }

  return <div>Time Taken : {time}</div>;
}

export default CalculateTime;
