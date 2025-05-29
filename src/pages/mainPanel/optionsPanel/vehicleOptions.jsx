import React, { useEffect, useState } from "react";
import { vehicleRoutes } from "../../../api/apiurls";
import { ListItems } from "../../../hooks/listItems";
import { editVehicleOptions } from "../../../hooks/editItem";
import "../../../styles/truckOptions.css";
import { FaCar, FaBell, FaLockOpen, FaLock } from "react-icons/fa";

export function VehicleOptions() {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  useEffect(() => {
    ListItems(`${vehicleRoutes.options.data}/${selectedVehicleId}`, setData, setError);
  }, [selectedVehicleId]);

  const options = [
    {
      label: "Vehículo",
      stateKey: "engineStatus",
      onLabel: "Apagar vehículo",
      offLabel: "Encender vehículo",
      icon: <FaCar style={{ marginRight: "8px" }} />,
    },
    {
      label: "Alarma",
      stateKey: "alarmStatus",
      onLabel: "Desactivar alarma",
      offLabel: "Activar alarma",
      icon: <FaBell style={{ marginRight: "8px" }} />,
    },
    {
      label: "Seguros",
      stateKey: "lockStatus",
      onLabel: "Retirar seguros",
      offLabel: "Colocar seguros",
      // Cambia de ícono dinámicamente dentro del render
    },
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
      editVehicleOptions(`${vehicleRoutes.options.update}/${selectedVehicleId}`, optionKey, newState);
      return { ...prevState, [optionKey]: newState };
    });
  };

  return (
    <div className="g-option-item">
      <h5 style={{ textAlign: "center", marginBottom: "20px" }}>Opciones Remotas</h5>

      {options.map(({ label, stateKey, onLabel, offLabel, icon }) => {
        const dynamicIcon =
          stateKey === "lockStatus" ? (
            states[stateKey] ? (
              <FaLockOpen style={{ marginRight: "8px" }} />
            ) : (
              <FaLock style={{ marginRight: "8px" }} />
            )
          ) : (
            icon
          );

        return (
          <div key={stateKey} className="option-row">
            <div className="option-label">
              {dynamicIcon}
              {states[stateKey] ? onLabel : offLabel}
            </div>
            <label className="tk-op-switch">
              <input type="checkbox" checked={states[stateKey]} onChange={() => handleToggle(stateKey)} />
              <span className="tk-op-slider"></span>
            </label>
          </div>
        );
      })}
    </div>
  );
}
