import React, { useEffect, useState } from "react";
import { FaExclamationTriangle, FaRegBellSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useMqtt from "../hooks/useMqtt";
import mqttDataHandler from "../hooks/mqttDataHandler";
import { handleRecordsMessage } from "../utils/handleRecordsMessage";
import { mqttDominio, mqttTopics } from "../mqtt/mqttConfig";
import { cardDisabledStatusStyle, cardGoodStatusStyle, iconStyle, textStyle } from "./cardStyles";

export function AlarmInfo({ showAlert = true }) {
  const navigate = useNavigate();

  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  const topic = `${mqttTopics.telData}${selectedVehicleId}`;
  const { messages, clearMessages } = useMqtt(mqttDominio, topic);
  const [alarm, setAlarm] = useState(false); // Estado de la alarma (activo o inactivo)
  const [error, setError] = useState(null);
  useEffect(() => {
    mqttDataHandler(messages, setAlarm, "alarmInfo");
  }, [messages]);


  // Obtener fecha y hora actual
  const currentDateTime = new Date();
  const formattedDateTime = `${currentDateTime.toLocaleDateString("es-ES").replace(/\//g, "-")} - ${currentDateTime.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  return (
    <div className="g-option-item" onClick={() => handleRecordsMessage(navigate, showAlert, "/alarm-Records")}>
      <div style={alarm ? cardGoodStatusStyle : cardDisabledStatusStyle}>
        {alarm ? (
          <FaExclamationTriangle style={iconStyle} /> // Ícono de alarma si está activada
        ) : (
          <FaRegBellSlash style={iconStyle} /> // Ícono de alarma desactivada
        )}
        <p style={textStyle}>{alarm ? "¡Alarma activada!" : "Alarma desactivada"}</p>
        {/*alarm ? <p style={dateStyle}>{formattedDateTime}</p> : <p>Sin incidencia</p>*/}
      </div>
    </div>
  );
}
