import React, { useEffect, useState } from "react";
import { ListItems } from "../../hooks/listItems";
import { mqttDominio, mqttTopics, vehiclesURL } from "../../api/apiurls";
import useMqtt from "../../hooks/useMqtt";
import mqttDataHandler from "../../hooks/mqttDataHandler";

export function VehicleInfo() {
  const [data, setData] = useState([]);
  const [speed, setSpeed] = useState([]);

  // Activar si se desea optener la ubicacion
  // const [latitude, setLatitude] = useState([]);
  // const [longitude, setLongitude] = useState([]);

  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  const topic = `${mqttTopics.tmp_gasPressure}${selectedVehicleId}`;
  const { messages } = useMqtt(mqttDominio, topic);

  useEffect(() => {
    ListItems(`${vehiclesURL}/${selectedVehicleId}`, setData);
  }, [selectedVehicleId]);

  useEffect(() => {
    mqttDataHandler(messages, setSpeed, "speedInfo");
  }, [messages]);
  
  return (
    <div className="g-option-item">
      <h4>Informacion</h4>
      <p>Placa: {data && data.licensePlate}</p>
      <p>Tipo: {data && data.vehicleTypeName} </p>
      <p>Velocidad Actual: {`${speed} km`} </p>
      <p>Tiempo encendido: {data && data.timeOn} segundos</p>
    </div>
  );
}
