import React, { useEffect, useState } from "react";
import { mqttTopics, mqttURL, vehiclesAlarmOnURL, vehiclesEngineOnURL, vehiclesLockOnURL, vehiclesURL } from "../../api/apiurls";
import useMqtt from "../../hooks/useMqtt";
import { ListItems } from "../../hooks/listItems";
import { editSingleValue } from "../../hooks/editItem";

export function VehicleOptions({vehicleId}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    ListItems(`${vehiclesURL}/${vehicleId}`, setData);
  }, [vehicleId]);



  const [isAlarmOn, setIsAlarmOn] = useState(false);
  const [isVehicleOn, setIsVehicleOn] = useState(false);
  const [areLocksOn, setAreLocksOn] = useState(false);

  useEffect(() => {
    if (data) {
      setIsAlarmOn(data.alarmStatus);
      setIsVehicleOn(data.timeOn);
    }
  }, [data]); 

  const handleToggleAlarm = () => {
    setIsAlarmOn((prevState) => !prevState);
    editSingleValue(`${vehiclesAlarmOnURL}/${vehicleId}`, 'alarm', true);
  };

  const handleToggleVehicle = () => {
    setIsVehicleOn((prevState) => !prevState);
    editSingleValue(`${vehiclesLockOnURL}/${vehicleId}`, 'lock', true);
  };

  const handleToggleLocks = () => {
    setAreLocksOn((prevState) => !prevState);
    editSingleValue(`${vehiclesEngineOnURL}/${vehicleId}`, 'engine', true);
  };

  return (
    <div className="option-item">
      <h4>Opciones Remotas</h4>

      <div className="option">
        <span style={{ fontSize: "18px", margin: "5px" }}>{isAlarmOn ? "Desactivar alarma" : "Activar alarma"}</span>
        <label className="switch">
          <input type="checkbox" checked={isAlarmOn} onChange={handleToggleAlarm} />
          <span className="slider"></span>
        </label>
      </div>

      <div className="option">
        <span style={{ fontSize: "18px", margin: "5px" }}>{isVehicleOn ? "Apagar vehículo" : "Encender vehículo"}</span>
        <label className="switch">
          <input type="checkbox" checked={isVehicleOn} onChange={handleToggleVehicle} />
          <span className="slider"></span>
        </label>
      </div>

      <div className="option">
        <span style={{ fontSize: "18px", margin: "5px" }}>{areLocksOn ? "Retirar seguros" : "Colocar seguros"}</span>
        <label className="switch">
          <input type="checkbox" checked={areLocksOn} onChange={handleToggleLocks} />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
}
