import React, { useEffect, useState } from "react";
import { vehicleRoutes } from "../../../api/apiurls";
import { ListItems } from "../../../hooks/listItems";
import { editVehicleOptions } from "../../../hooks/editItem";
import "../../../styles/truckOptions.css";
import {
  FaCar,
  FaBell,
  FaLockOpen,
  FaLock,
} from "react-icons/fa";

export function VehicleOptions() {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  useEffect(() => {
    if (!selectedVehicleId) return;
    ListItems(
      `${vehicleRoutes.options.data}/${selectedVehicleId}`,
      setData,
      setError
    );
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
      // icon dinámico abajo
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
      editVehicleOptions(
        `${vehicleRoutes.options.update}/${selectedVehicleId}`,
        optionKey,
        newState
      );
      return { ...prevState, [optionKey]: newState };
    });
  };

  return (
    <div className="g-option-item">
      <div className="kpi-card-header">
        <div className="kpi-card-header-main">
          <FaCar className="kpi-card-header-icon" />
          <h5 className="kpi-card-title">Opciones remotas</h5>
        </div>
      </div>

      <div className="kpi-card-body" style={{ gap: 8 }}>
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
                <span>
                  {states[stateKey] ? onLabel : offLabel}
                </span>
              </div>
              <label className="tk-op-switch">
                <input
                  type="checkbox"
                  checked={states[stateKey]}
                  onChange={() => handleToggle(stateKey)}
                />
                <span className="tk-op-slider"></span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
