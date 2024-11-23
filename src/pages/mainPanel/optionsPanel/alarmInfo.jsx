import React, { useEffect, useState } from "react";
import { FaExclamationTriangle, FaRegBellSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { mqttDominio, mqttTopics } from "../../../api/apiurls";
import useMqtt from "../../../hooks/useMqtt";
import mqttDataHandler from "../../../hooks/mqttDataHandler";
import { handleRecordsMessage } from "../../../utils/handleRecordsMessage";

export function AlarmInfo({ showAlert = true }) {
  const navigate = useNavigate();

  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  const topic = `${mqttTopics.telData}${selectedVehicleId}`;
  const { messages, clearMessages } = useMqtt(mqttDominio, topic);
  const [alarm, setAlarm] = useState(false); // Estado de la alarma (activo o inactivo)

  useEffect(() => {
    mqttDataHandler(messages, setAlarm, "alarmInfo");
  }, [messages]);

  
  //console.log(messages)

  // Obtener fecha y hora actual
  const currentDateTime = new Date();
  const formattedDateTime = `${currentDateTime.toLocaleDateString("es-ES").replace(/\//g, "-")} - ${currentDateTime.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  // Estilos del card según si la alarma está activa o no
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
    boxShadow: alarm ? "0px 4px 15px rgba(255, 0, 0, 0.4)" : "0px 4px 15px rgba(169, 169, 169, 0.4)",
    cursor: "pointer",
    color: "#fff",
    backgroundColor: alarm ? "#FF4D4D" : "#A9A9A9", // Rojo si la alarma está activada, gris si está desactivada
    border: alarm ? "2px solid #FF0000" : "2px solid #D3D3D3", // Borde rojo o gris
    animation: alarm ? "pulse 1.5s infinite" : "none", // Pulsación si está activada
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
    <div className="g-option-item" onClick={() => handleRecordsMessage(navigate, showAlert, "/alarm-Records")}>
      <div style={cardStyle}>
        {alarm ? (
          <FaExclamationTriangle style={iconStyle} /> // Ícono de alarma si está activada
        ) : (
          <FaRegBellSlash style={iconStyle} /> // Ícono de alarma desactivada
        )}
        <p style={textStyle}>{alarm ? "¡Alarma activada!" : "Alarma desactivada"}</p>
        {alarm ? <p style={dateStyle}>{formattedDateTime}</p> : <p>Sin incidencia</p>}
      </div>
    </div>
  );
}
