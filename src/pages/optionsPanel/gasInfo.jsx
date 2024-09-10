import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useMqtt from "../../hooks/useMqtt";
import { mqttDominio, mqttTopics } from "../../api/apiurls";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export function GasInfo({ showAlert = true }) {
  const navigate = useNavigate();
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const topic = `${mqttTopics.tmp_gasPressure}${selectedVehicleId}`;

  const { isConnected, messages, sendMessage } = useMqtt(mqttDominio, topic);
  const [pressure, setPressure] = useState(0);
  const [percentage, setPercentage] = useState(0); // Estado para el porcentaje
  const maxPressure = 200;

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessageStr = messages[messages.length - 1];
      console.log("Último mensaje recibido:", lastMessageStr);
      try {
        const lastMessage = JSON.parse(lastMessageStr);
        setPressure(lastMessage);
        const calculatedPercentage = (lastMessage / maxPressure) * 100;
        setPercentage(calculatedPercentage);
      } catch (error) {
        console.error("Error parsing MQTT message", error);
        console.log("Mensaje recibido no válido:", lastMessageStr);
      }
    }
  }, [messages]);

  const handleRecords = () => {
    if (showAlert) {
      Swal.fire({
        title: "¿Desea ver los registros del gas?",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/gas-Records");
          console.log("Mostrar registros");
        }
      });
    } else {
      navigate("/gas-Records");
    }
  };

  // Determinar el estado basado en el porcentaje
  const determineStatus = (percentage) => {
    if (percentage > 75) {
      return "Óptimo";
    } else if (percentage > 50) {
      return "Regular";
    } else if (percentage > 25) {
      return "Bajo";
    } else {
      return "Muy Bajo";
    }
  };

  const status = determineStatus(percentage);

  return (
    <div className="g-option-item" onClick={handleRecords}>
      <h4>Gas Info</h4>
      <div style={{ display: "flex", width: "40%", height: "40%", margin: "auto" }}>
        <CircularProgressbar
          value={percentage}
          maxValue={100}
          text={`${Math.round(percentage)}%`} // Redondear el porcentaje
          styles={buildStyles({
            rotation: 0.5,
            strokeLinecap: "butt",
            trailColor: "#eee",
            textSize: "16px",
            pathTransitionDuration: 0.5,
            pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
            textColor: "white",
            backgroundColor: "#3e98c7",
          })}
        />
      </div>
      <span>Estado: {status}</span>
      <br />
      <span>Presión Actual: {pressure} psi</span>
      <br />
      <span>Cambios realizados en el día: 10 cambios</span>
    </div>
  );
}
