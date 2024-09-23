import React, { useEffect, useRef, useState } from "react";
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
import mqttDataHandler from "../../hooks/mqttDataHandler"; // Importa el hook

export function GasInfo({ showAlert = true }) {
  const navigate = useNavigate();

  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  const selectedTypeVehicleId = localStorage.getItem("selectedTypeVehicleId");
  const topic = `${mqttTopics.tmp_gasPressure}${selectedVehicleId}`;

  const { messages, clearMessages } = useMqtt(mqttDominio, topic);

  const [data, setData] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const [maxPressure, setMaxPressure] = useState(0);

  // Obtener los datos del tipo de vehículo
  useEffect(() => {
    ListItems(`${vehiclesTypesURL}/${selectedTypeVehicleId}`, setData);
  }, [selectedTypeVehicleId]);

  // Usar useRef para almacenar el vehículo anterior
  const previousVehicleIdRef = useRef(selectedVehicleId);

  // Limpiar mensajes al cambiar de vehículo seleccionado
  useEffect(() => {
    if (previousVehicleIdRef.current !== selectedVehicleId) {
      clearMessages(); // Llama a la función para limpiar mensajes solo si el vehículo ha cambiado
      setPressure(0)
      setPressure(0)
      previousVehicleIdRef.current = selectedVehicleId; // Actualiza el ref del vehículo anterior
    }
  }, [selectedVehicleId, clearMessages]);


  useEffect(() => {
    if (data) {
      const maxGas = data.gasRange.maxGasPressure || 0;
      setMaxPressure(maxGas);
    }
  }, [data]);

  // Procesar el mensaje de MQTT usando mqttDataHandler
  useEffect(() => {
    mqttDataHandler(messages, setPressure, "gasInfo");
  }, [messages]);

  // Calcula el porcentaje y actualiza el estado
  useEffect(() => {
    if (pressure !== null && maxPressure > 0) {
      const calculatedPercentage = calculatePercentage(pressure, maxPressure);
      setPercentage(calculatedPercentage);
    }
  }, [pressure, maxPressure]);

  const determineStatus = (pressureValue) => {
    if (!data || !data.gasRange) {
      return "No Disponible";
    }

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
