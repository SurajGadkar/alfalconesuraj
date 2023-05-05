import React, { useState } from "react";
import Select from "react-select";

function PlanetSelection({ planets, selectedData, handlePlanetSelect }) {
  const [selected, setSelected] = useState({});

  const handleChange = (option) => {
    setSelected(option);
    handlePlanetSelect(option, selected);
  };

  const options = planets.map((planet) => {
    const name = planet.name;
    const value = { planet: name, label: name };
    return name in selectedData ? { isDisabled: true, ...value } : value;
  });

  //console.log(selectedData);

  return (
    <div>
      <Select
        value={selected}
        options={options}
        onChange={handleChange}
      ></Select>
    </div>
  );
}

export default PlanetSelection;
