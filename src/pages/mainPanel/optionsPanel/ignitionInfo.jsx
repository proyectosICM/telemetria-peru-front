import React, { useEffect, useState } from "react";
import { FaCar, FaCarCrash } from "react-icons/fa"; // Íconos para encendido y apagado
import { useNavigate } from "react-router-dom";
import { mqttDominio, mqttTopics } from "../../../api/apiurls";
import useMqtt from "../../../hooks/useMqtt";
import mqttDataHandler from "../../../hooks/mqttDataHandler";
import { handleRecordsMessage } from "../../../utils/handleRecordsMessage";

export function IgnitionInfo({ showAlert = true }) {
  const navigate = useNavigate();

  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  const topic = `${mqttTopics.telData}${selectedVehicleId}`;
  const { messages, clearMessages } = useMqtt(mqttDominio, topic);
  const [ignition, setIgnition] = useState(true); // Estado de ignición (encendido o apagado)

  useEffect(() => {
    mqttDataHandler(messages, setIgnition, "ignitionInfo");
  }, [messages]);

  console.log(messages)
  // Obtener fecha y hora actual
  const currentDateTime = new Date();
  const formattedDateTime = `${currentDateTime.toLocaleDateString("es-ES").replace(/\//g, "-")} - ${currentDateTime.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  // Estilos del card según el estado de encendido
  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    padding: "20px",
    margin: "10px auto",
    textAlign: "center",
    borderRadius: "10px",
    boxShadow: ignition ? "0px 4px 15px rgba(0, 255, 0, 0.4)" : "0px 4px 15px rgba(169, 169, 169, 0.4)",
    cursor: "pointer",
    color: "#fff",
    backgroundColor: ignition ? "#4CAF50" : "#A9A9A9", // Verde si está encendido, gris si está apagado
    border: ignition ? "2px solid #008000" : "2px solid #D3D3D3", // Borde verde o gris
    animation: ignition ? "pulse 1.5s infinite" : "none", // Pulsación si está encendido
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
    color: "#FFD700", // Amarillo dorado para contraste
  };

  return (
    <div className="g-option-item" onClick={() => handleRecordsMessage(navigate, showAlert, "/ignition-Records")}>
      <h4>Información de Ignición</h4>
      <div style={cardStyle}>
        {ignition ? (
          <FaCar style={iconStyle} /> // Ícono de encendido
        ) : (
          <FaCarCrash style={iconStyle} /> // Ícono de apagado
        )}
        <p style={textStyle}>{ignition ? "Vehículo encendido" : "Vehículo apagado"}</p>
        {ignition ? <p style={dateStyle}>{formattedDateTime}</p> : <p>Sin actividad reciente</p>}
      </div>
    </div>
  );
}
