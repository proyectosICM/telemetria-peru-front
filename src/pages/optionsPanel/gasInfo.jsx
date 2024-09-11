import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useMqtt from "../../hooks/useMqtt";
import { mqttDominio, mqttTopics } from "../../api/apiurls";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { calculatePercentage } from "../../utils/calculatePercentage";
import { handleRecordsMessage } from "../../utils/handleRecordsMessage";
import { getStatusColor } from "../../utils/getStatusColorCPB";
import NoDataCircularProgressbar from "../../common/noDataCircularProgressbar";
import CircularProgressbarWithStatus from "../../common/CircularProgressbarWithStatus";

export function GasInfo({ showAlert = true }) {
  const navigate = useNavigate();
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const topic = `${mqttTopics.tmp_gasPressure}${selectedVehicleId}`;

  const { isConnected, messages } = useMqtt(mqttDominio, topic);
  const [pressure, setPressure] = useState(null); // Cambiado a null para manejar la ausencia de datos
  const [percentage, setPercentage] = useState(0);
  const maxPressure = 200;

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessageStr = messages[messages.length - 1];
      console.log("Último mensaje recibido:", lastMessageStr);

      try {
        if (lastMessageStr.startsWith("gasInfo:")) {
          const pressureValue = parseFloat(lastMessageStr.split(":")[1].trim());
          setPressure(pressureValue);
          const calculatedPercentage = calculatePercentage(pressureValue, maxPressure);
          setPercentage(calculatedPercentage);
        } else {
          const lastMessage = JSON.parse(lastMessageStr);
          if (lastMessage.gasInfo !== undefined) {
            const gasInfo = lastMessage.gasInfo;
            setPressure(gasInfo);
            const calculatedPercentage = calculatePercentage(gasInfo, maxPressure);
            setPercentage(calculatedPercentage);
          } else {
            setPressure(null); // No hay datos de gas
          }
        }
      } catch (error) {
        console.error("Error parsing MQTT message", error);
        console.log("Mensaje recibido no válido:", lastMessageStr);
        setPressure(null); // No hay datos de gas
      }
    }
  }, [messages]);

  const determineStatus = (percentage) => {
    if (percentage > 60) {
      return "Óptimo";
    } else if (percentage > 50) {
      return "Regular";
    } else if (percentage > 30) {
      return "Bajo";
    } else {
      return "Muy Bajo";
    }
  };

  const status = pressure !== null ? determineStatus(percentage) : "No Disponible";
  const statusColor = getStatusColor(status);

  return (
    <div className="g-option-item" onClick={() => handleRecordsMessage(navigate, showAlert, "/gas-Records")}>
      <h4>Gas Info</h4>
      <div style={{ display: "flex", justifyContent: "center", margin: "auto" }}>
        {pressure !== null ? (
          <CircularProgressbarWithStatus value={percentage} status={status} size={"40%"} >
            {pressure !== null && (
              <>
                <span style={{ fontSize: "15px" }}>Estado: {status}</span>
                <br />
                <span style={{ fontSize: "15px" }}>Presión Actual: {pressure} psi</span>
                <br />
                <span style={{ fontSize: "15px" }}>Cambios realizados en el día: 10</span>
              </>
            )}
          </CircularProgressbarWithStatus>
        ) : (
          <NoDataCircularProgressbar />
        )}
      </div>
    </div>
  );
}
