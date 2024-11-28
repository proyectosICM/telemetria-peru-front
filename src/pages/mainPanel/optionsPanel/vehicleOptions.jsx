import React, { useEffect, useState } from "react";
import { vehiclesOptionsDataURL, vehiclesOptionsUpdateURL } from "../../../api/apiurls";
import { ListItems } from "../../../hooks/listItems";
import { editVehicleOptions } from "../../../hooks/editItem";
import '../../../styles/truckOptions.css'

export function VehicleOptions() {
  const [data, setData] = useState({});
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  useEffect(() => {
    ListItems(`${vehiclesOptionsDataURL}/${selectedVehicleId}`, setData);
  }, [selectedVehicleId]);

  const options = [
    { label: "Vehículo", stateKey: "engine", setState: "setIsVehicleOn", onLabel: "Apagar vehículo", offLabel: "Encender vehículo" },
    { label: "Alarma", stateKey: "alarm", setState: "setIsAlarmOn", onLabel: "Desactivar alarma", offLabel: "Activar alarma" },
    { label: "Seguros", stateKey: "lock", setState: "setAreLocksOn", onLabel: "Retirar seguros", offLabel: "Colocar seguros" },
  ];

  const [states, setStates] = useState({
    engineStatus: false,
    alarmStatus: false,
    lockStatus: false,
  });

  useEffect(() => {
    if (data) {
      setStates({
        engineStatus: data.engineStatus || false,
        alarmStatus: data.alarmStatus || false,
        lockStatus: data.lockStatus || false,
      });
    }
  }, [data]);

  const handleToggle = (optionKey) => {
    setStates((prevState) => {
      const newState = !prevState[optionKey];
      editVehicleOptions(`${vehiclesOptionsUpdateURL}/${selectedVehicleId}`, optionKey, newState);
      return { ...prevState, [optionKey]: newState };
    });
  };

  return (
    <div className="g-option-item">
      <h5>Opciones Remotas</h5>

      {options.map(({ label, stateKey, onLabel, offLabel }) => (
        <div key={stateKey} className="option">
          <span style={{ fontSize: "15px", margin: "5px" }}>
            {states[stateKey] ? onLabel : offLabel}
          </span>
          <label className="tk-op-switch">
            <input
              type="checkbox"
              checked={states[stateKey]}
              onChange={() => handleToggle(stateKey)}
            />
            <span className="tk-op-slider"></span>
          </label>
        </div>
      ))}
    </div>
  );
}
