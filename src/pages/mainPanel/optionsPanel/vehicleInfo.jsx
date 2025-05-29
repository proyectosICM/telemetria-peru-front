import React, { useEffect, useState } from "react";
import { ListItems } from "../../../hooks/listItems";
import { vehicleRoutes } from "../../../api/apiurls";
import useMqtt from "../../../hooks/useMqtt";
import mqttDataHandler from "../../../hooks/mqttDataHandler";
import { handleRecordsMessage } from "../../../utils/handleRecordsMessage";
import { useNavigate } from "react-router-dom";
import { mqttDominio, mqttTopics } from "../../../mqtt/mqttConfig";
import { BiSolidDashboard } from "react-icons/bi";
import { FaCar, FaTachometerAlt, FaExclamationTriangle } from "react-icons/fa";
import { FaPowerOff, FaSpeedometer, FaRoad } from "react-icons/fa";

export function VehicleInfo({ showAlert = true }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [speed, setSpeed] = useState(null);

  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  const topic = `${mqttTopics.telData}${selectedVehicleId}`;
  const { messages } = useMqtt(mqttDominio, topic);

  // Fetch vehicle data when selectedVehicleId changes
  useEffect(() => {
    ListItems(`${vehicleRoutes.base}/${selectedVehicleId}`, setData, setError);
  }, [selectedVehicleId]);

  // Handle incoming MQTT messages to update speed info
  useEffect(() => {
    mqttDataHandler(messages, setSpeed, "speed");
  }, [messages]); 

  // Comprobar si la velocidad actual supera la velocidad máxima
  const isSpeedExceeded = data?.maxSpeed > 0 && speed > data.maxSpeed;

  return (
    <div className="g-option-item" onClick={() => handleRecordsMessage(navigate, showAlert, "/vehicle-info")}>
      <div style={{ padding: "10px"}}>
        <h5><BiSolidDashboard style={{ marginRight: "5px" }} />Información del Vehículo</h5>
        <span><FaCar style={{ marginRight: "5px" }} /> Placa: {data && data.licensePlate}</span>
        <br />
        <span><FaCar style={{ marginRight: "5px" }} /> Tipo: {data && data.vehicleTypeName}</span>
        <br />
        {/* Mostrar la velocidad actual con el color adecuado según la condición */}
        <span style={{ color: isSpeedExceeded ? "red" : "white" }}> <FaTachometerAlt style={{ marginRight: "5px" }} /> Velocidad Actual: {speed ? `${speed} km` : "0 km"}</span>
        <br />
        {/* Mostrar advertencia solo si se excede la velocidad máxima */}
        {isSpeedExceeded && <p style={{ color: "red" }}>
          <FaExclamationTriangle style={{ marginRight: "5px" }} />
          ¡Límite de velocidad excedido!</p>}
        {/*<span>Tiempo encendido: {data && data.timeOn} segundos</span>*/}
      </div>
    </div>
  );
}
