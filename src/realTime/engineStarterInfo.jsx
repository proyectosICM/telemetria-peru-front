import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mqttTopics } from "../mqtt/mqttConfig";
import useMqtt from "../hooks/useMqtt";
import { mqttDominio } from "../api/apiurls";

export function EngineStarterInfo({ showAlert = true }) {
  const navigate = useNavigate();

  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  const topic = `${mqttTopics.telData}${selectedVehicleId}`;
  const { messages, clearMessages } = useMqtt(mqttDominio, topic);
  const [error, setError] = useState(null);

/*
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
*/
  return(
    <div className="g-option-item">
        <h5>Arrancador</h5>
    </div>
  );
}
