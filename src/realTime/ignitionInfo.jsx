import React, { useEffect, useState } from "react";
import { FaCar, FaCarCrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useMqtt from "../hooks/useMqtt";
import mqttDataHandler from "../hooks/mqttDataHandler";
import { handleRecordsMessage } from "../utils/handleRecordsMessage";
import { mqttDominio, mqttTopics } from "../mqtt/mqttConfig";

export function IgnitionInfo({ showAlert = true }) {
  const navigate = useNavigate();
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  const topic = `${mqttTopics.telData}${selectedVehicleId}`;

  const [ignition, setIgnition] = useState(false);
  const { messages } = useMqtt(mqttDominio, topic);

  useEffect(() => {
    mqttDataHandler(messages, setIgnition, "ignitionInfo");
  }, [messages]);

  // Get current date and time
  const currentDateTime = new Date();
  const formattedDateTime = `${currentDateTime.toLocaleDateString("es-ES").replace(/\//g, "-")} - ${currentDateTime.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  // Card styles based on power state
  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    padding: "10px",
    margin: "10% auto ",
    textAlign: "center",
    borderRadius: "10px",
    boxShadow: ignition ? "0px 4px 15px rgba(0, 255, 0, 0.4)" : "0px 4px 15px rgba(169, 169, 169, 0.4)",
    cursor: "pointer",
    color: "#fff",
    backgroundColor: ignition ? "#4CAF50" : "#A9A9A9",
    border: ignition ? "2px solid #008000" : "2px solid #D3D3D3",
    animation: ignition ? "pulse 1.5s infinite" : "none",
  };

  // Estilos del ícono y texto
  const iconStyle = {
    fontSize: "2.2em",
    marginBottom: "10px",
  };

  const textStyle = {
    fontSize: "1em",
    fontWeight: "bold",
  };

  const dateStyle = {
    marginTop: "10px",
    fontSize: "0.9em",
    color: "#FFD700",
  };

  return (
    <div className="g-option-item" onClick={() => handleRecordsMessage(navigate, showAlert, "/ignition-Records")}>
      <div style={cardStyle}>
        {ignition ? <FaCar style={iconStyle} /> : <FaCarCrash style={iconStyle} />}
        <p style={textStyle}>{ignition ? "Vehículo encendido" : "Vehículo apagado"}</p>
        {/*ignition ? <p style={dateStyle}>{formattedDateTime}</p> : <p>Sin actividad </p>*/}
      </div>
    </div>
  );
}
