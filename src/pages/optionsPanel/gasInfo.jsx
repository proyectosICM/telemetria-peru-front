import React, { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useMqtt from "../../hooks/useMqtt";
import { mqttDominio, mqttTopics, vehiclesTypesURL } from "../../api/apiurls";
import { useNavigate } from "react-router-dom";
import { calculatePercentage } from "../../utils/calculatePercentage";
import { handleRecordsMessage } from "../../utils/handleRecordsMessage";
import NoDataCircularProgressbar from "../../common/noDataCircularProgressbar";
import CircularProgressbarWithStatus from "../../common/CircularProgressbarWithStatus";
import { ListItems } from "../../hooks/listItems";

export function GasInfo({ showAlert = true }) {
  const navigate = useNavigate();

  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const selectedTypeVehicleId = localStorage.getItem("selectedTypeVehicleId");
  
  const [data, setData] = useState(null); // Guardará los datos del tipo de vehículo
  const [pressure, setPressure] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const [maxPressure, setMaxPressure] = useState(0);
  
  // Obtener los datos del tipo de vehículo
  useEffect(() => {
    ListItems(`${vehiclesTypesURL}/${selectedTypeVehicleId}`, setData);
  }, [selectedTypeVehicleId]);

  useEffect(() => {
    //console.log("Datos actualizados:", data);
    if (data) {
      const maxGas = data.gasRange.maxGasPressure || 0;
      setMaxPressure(maxGas);
      console.log(`Max pressure actualizado: ${maxGas}`);
    }
  }, [data]); 


  const topic = `${mqttTopics.tmp_gasPressure}${selectedVehicleId}`;
  const { isConnected, messages } = useMqtt(mqttDominio, topic);

  // Procesar el mensaje de MQTT
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessageStr = messages[messages.length - 1];
      //console.log("Último mensaje recibido:", lastMessageStr);

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

  // Función para determinar el estado del gas basado en los valores dinámicos de gasRange
  const determineStatus = (pressureValue) => {
    if (!data || !data.gasRange) {
      return "No Disponible"; // Si los datos no están disponibles
    }
    //console.log("dT" + pressureValue)
    const { optimalGasRangeStart, regularGasRangeStart, lowGasRangeStart, veryLowGasRangeStart } = data.gasRange;

    if (pressureValue >= optimalGasRangeStart) {
      return "Óptimo";
    } else if (pressureValue >= regularGasRangeStart) {
      return "Regular";
    } else if (pressureValue >= lowGasRangeStart) {
      return "Bajo";
    } else if (pressureValue >= veryLowGasRangeStart) {
      return "Muy Bajo";
    } else {
      return "No Disponible";
    }
  };

  const status = pressure !== null ? determineStatus(pressure) : "No Disponible";

  return (
    <div className="g-option-item" onClick={() => handleRecordsMessage(navigate, showAlert, "/gas-Records")}>
      <h4>Gas Info</h4>
      <div style={{ display: "flex", justifyContent: "center", margin: "auto" }}>
        {pressure !== null ? (
          <CircularProgressbarWithStatus value={percentage} status={status} size={"40%"}>
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
