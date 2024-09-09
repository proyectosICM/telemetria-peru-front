import React, { useEffect, useState } from "react";
import { mqttTopics, mqttURL, vehiclesAlarmOnURL, vehiclesEngineOnURL, vehiclesLockOnURL, vehiclesURL } from "../../api/apiurls";
import useMqtt from "../../hooks/useMqtt";
import { ListItems } from "../../hooks/listItems";
import { editSingleValue } from "../../hooks/editItem";

export function VehicleOptions() {
  const [data, setData] = useState([]);
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  useEffect(() => {
    ListItems(`${vehiclesURL}/${selectedVehicleId}`, setData);
  }, [selectedVehicleId]);



  const [isAlarmOn, setIsAlarmOn] = useState(false);
  const [isVehicleOn, setIsVehicleOn] = useState(false);
  const [areLocksOn, setAreLocksOn] = useState(false);

  useEffect(() => {
    if (data) {
      setIsAlarmOn(data.alarmStatus);
      setIsVehicleOn(data.engineStatus);
      setAreLocksOn(data.lockStatus)
    }
  }, [data]); 

  const handleToggleAlarm = () => {
    setIsAlarmOn((prevState) => {
      const newState = !prevState;
      editSingleValue(`${vehiclesAlarmOnURL}/${selectedVehicleId}`, 'alarm', newState);
      return newState;
    });
  };

  const handleToggleVehicle = () => {
    setIsVehicleOn((prevState) => {
      const newState = !prevState;
      editSingleValue(`${vehiclesEngineOnURL}/${selectedVehicleId}`, 'engine', newState);
      return newState;
    });
  };

  const handleToggleLocks = () => {
    setAreLocksOn((prevState) => {
      const newState = !prevState;
      editSingleValue(`${vehiclesLockOnURL}/${selectedVehicleId}`, 'lock', newState);
      return newState;
    });
  };

  return (
    <div className="g-option-item">
      <h4>Opciones Remotas</h4>

      <div className="option">
        <span style={{ fontSize: "18px", margin: "5px" }}>{isVehicleOn ? "Apagar vehículo" : "Encender vehículo"}</span>
        <label className="tk-op-switch">
          <input type="checkbox" checked={isVehicleOn} onChange={handleToggleVehicle} />
          <span className="tk-op-slider"></span>
        </label>
      </div>


      <div className="option">
        <span style={{ fontSize: "18px", margin: "5px" }}>{isAlarmOn ? "Desactivar alarma" : "Activar alarma"}</span>
        <label className="tk-op-switch">
          <input type="checkbox" checked={isAlarmOn} onChange={handleToggleAlarm} />
          <span className="tk-op-slider"></span>
        </label>
      </div>

      <div className="option">
        <span style={{ fontSize: "18px", margin: "5px" }}>{areLocksOn ? "Retirar seguros" : "Colocar seguros"}</span>
        <label className="tk-op-switch">
          <input type="checkbox" checked={areLocksOn} onChange={handleToggleLocks} />
          <span className="tk-op-slider"></span>
        </label>
      </div>
    </div>
  );
}
