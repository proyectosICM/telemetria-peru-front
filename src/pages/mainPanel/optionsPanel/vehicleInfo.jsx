import React, { useEffect, useState } from "react";
import { ListItems } from "../../../hooks/listItems";
import { mqttDominio, mqttTopics, vehiclesURL } from "../../../api/apiurls";
import useMqtt from "../../../hooks/useMqtt";
import mqttDataHandler from "../../../hooks/mqttDataHandler";
import { handleRecordsMessage } from "../../../utils/handleRecordsMessage";
import { useNavigate } from "react-router-dom";

export function VehicleInfo({ showAlert = true }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [speed, setSpeed] = useState(null); 

  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  const topic = `${mqttTopics.tmp_gasPressure}${selectedVehicleId}`;
  const { messages } = useMqtt(mqttDominio, topic);

  // Fetch vehicle data when selectedVehicleId changes
  useEffect(() => {
    ListItems(`${vehiclesURL}/${selectedVehicleId}`, setData);
  }, [selectedVehicleId]);

  // Handle incoming MQTT messages to update speed info
  useEffect(() => {
    mqttDataHandler(messages, setSpeed, "speedInfo");
  }, [messages]);

  // Comprobar si la velocidad actual supera la velocidad máxima
  const isSpeedExceeded = data?.maxSpeed > 0 && speed > data.maxSpeed;

  return (
    <div className="g-option-item" onClick={() => handleRecordsMessage(navigate, showAlert, "/vehicle-info")}>
      <h5>Información del Vehículo</h5>
      <span>Placa: {data && data.licensePlate}</span>
      <br />
      <span>Tipo: {data && data.vehicleTypeName}</span>
      <br />
      {/* Mostrar la velocidad actual con el color adecuado según la condición */}
      <span style={{ color: isSpeedExceeded ? "red" : "white" }}>Velocidad Actual: {speed ? `${speed} km` : "0 km"}</span>
      <br />
      {/* Mostrar advertencia solo si se excede la velocidad máxima */}
      {isSpeedExceeded && <p style={{ color: "red" }}>¡Límite de velocidad excedido!</p>}
      {/*<span>Tiempo encendido: {data && data.timeOn} segundos</span>*/}
    </div>
  );
}
