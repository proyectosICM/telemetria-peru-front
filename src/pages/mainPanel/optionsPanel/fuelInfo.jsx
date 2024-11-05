import React, { useEffect, useRef, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useMqtt from "../../../hooks/useMqtt";
import { mqttDominio, mqttTopics, vehiclesTypesURL, vehiclesURL } from "../../../api/apiurls";
import { useNavigate } from "react-router-dom";
import { calculatePercentage } from "../../../utils/calculatePercentage";
import { handleRecordsMessage } from "../../../utils/handleRecordsMessage";
import NoDataCircularProgressbar from "../../../common/noDataCircularProgressbar";
import CircularProgressbarWithStatus from "../../../common/circularProgressbarWithStatus";
import { ListItems } from "../../../hooks/listItems";
import mqttDataHandler from "../../../hooks/mqttDataHandler";


export function FuelInfo({ showAlert = true }) {
  const navigate = useNavigate();

  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const selectedTypeVehicleId = localStorage.getItem("selectedTypeVehicleId");

  const topic = `${mqttTopics.tmp_gasPressure}${selectedVehicleId}`;
  const { messages, clearMessages } = useMqtt(mqttDominio, topic);

  const [vehicleData, setVehicleData] = useState(null);
  const [typeVehicleData, setTypeVehicleData] = useState(null);
  const [dataValue, setDataValue] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const [maxPressure, setMaxPressure] = useState(0);

  useEffect(() => {
    ListItems(`${vehiclesURL}/${selectedVehicleId}`, setVehicleData);
  }, [selectedVehicleId]);

  useEffect(() => {
    ListItems(`${vehiclesTypesURL}/${selectedTypeVehicleId}`, setTypeVehicleData);
  }, [selectedTypeVehicleId]);

  useEffect(() => {
    if (typeVehicleData) {
      const maxGas = typeVehicleData.gasRange?.maxGasPressure || 0; // Usar el operador de encadenamiento opcional
      setMaxPressure(maxGas);
    }
  }, [typeVehicleData]);

  // Usar useRef para almacenar el vehículo anterior
  const previousVehicleIdRef = useRef(selectedVehicleId);

  // Limpiar mensajes al cambiar de vehículo seleccionado
  useEffect(() => {
    if (previousVehicleIdRef.current !== selectedVehicleId) {
      clearMessages();
      setDataValue(null);
      previousVehicleIdRef.current = selectedVehicleId;
    }
  }, [selectedVehicleId, clearMessages]);

  // Procesar el mensaje de MQTT usando mqttDataHandler
  useEffect(() => {
    mqttDataHandler(messages, setDataValue, "fuelInfo");
  }, [messages]);
 
  // Calcula el porcentaje y actualiza el estado
  useEffect(() => {
    if (dataValue !== null && maxPressure > 0) {
      const calculatedPercentage = calculatePercentage(dataValue, maxPressure);
      setPercentage(calculatedPercentage);
    }
  }, [dataValue, maxPressure]);

  const determineStatus = (pressureValue, vehicleData, typeVehicleData) => {
    // Verificar la disponibilidad de los rangos según el tipo de combustible
    if (vehicleData && vehicleData.fuelType === "GAS" && !typeVehicleData?.gasRange) {
      return "No Disponible";
    }

    if (vehicleData && vehicleData.fuelType === "GASOLINA" && !typeVehicleData?.gasolineRange) {
      return "No Disponible";
    }

    // Definir las variables de rango según el tipo de combustible
    let optimalRangeStart, regularRangeStart, lowRangeStart, veryLowRangeStart;
    console.log(typeVehicleData)
    if (vehicleData.fuelType === "GAS") {
      ({
        optimalGasRangeStart: optimalRangeStart,
        regularGasRangeStart: regularRangeStart,
        lowGasRangeStart: lowRangeStart,
        veryLowGasRangeStart: veryLowRangeStart,
      } = typeVehicleData.gasRange);
    } else if (vehicleData.fuelType === "GASOLINA") {
      ({
        optimalGasolineRangeStart: optimalRangeStart,
        regularGasolineRangeStart: regularRangeStart,
        lowGasolineRangeStart: lowRangeStart,
        veryLowGasolineRangeStart: veryLowRangeStart,
      } = typeVehicleData.gasolineRange);
    }
    console.log(optimalRangeStart)
    // Verificar el estado del rango de presión
    if (pressureValue >= optimalRangeStart) {
      return "Óptimo";
    } else if (pressureValue >= regularRangeStart) {
      return "Regular";
    } else if (pressureValue >= lowRangeStart) {
      return "Bajo";
    } else if (pressureValue >= veryLowRangeStart) {
      return "Muy Bajo";
    } else {
      return "No Disponible";
    }
  };

  const status = dataValue !== null && typeVehicleData ? determineStatus(dataValue, vehicleData, typeVehicleData) : "No Disponible";

  return (
    <div className="g-option-item" onClick={() => handleRecordsMessage(navigate, showAlert, "/fuel-Records")}>
      <h4>Combustible Info</h4>
      <span>Tipo: {vehicleData && vehicleData.fuelType}</span>
      <div style={{ display: "flex", justifyContent: "center", margin: "10px auto" }}>
        {dataValue !== null ? (
          <CircularProgressbarWithStatus value={percentage} status={status} size={"40%"}>
            {dataValue !== null && (
              <>
                <span style={{ fontSize: "15px" }}>Estado: {status}</span>
                <br />
                <span style={{ fontSize: "15px" }}>
                  {vehicleData.fuelType === "GASOLINA"
                    ? "Volumen Actual: "
                    : vehicleData.fuelType === "GAS"
                    ? "Presión Actual: "
                    : "Otro valor si es necesario"}{" "}
                  {dataValue} {vehicleData.fuelType === "GAS" ? "psi" : ""}
                </span>
                <br />
                {/* <span style={{ fontSize: "15px" }}>Cambios realizados en el día: 10</span> */}
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