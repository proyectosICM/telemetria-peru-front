import React, { useEffect, useRef, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import useMqtt from "../hooks/useMqtt";
import { vehicleRoutes, vehiclesTypesRoutes } from "../api/apiurls";
import { useNavigate } from "react-router-dom";
import { calculatePercentage } from "../utils/calculatePercentage";
import { handleRecordsMessage } from "../utils/handleRecordsMessage";
import NoDataCircularProgressbar from "../common/noDataCircularProgressbar";
import CircularProgressbarWithStatus from "../common/circularProgressbarWithStatus";
import { ListItems } from "../hooks/listItems";
import mqttDataHandler from "../hooks/mqttDataHandler";
import { mqttDominio, mqttTopics } from "../mqtt/mqttConfig";
import { FaGasPump } from "react-icons/fa";

export function FuelInfo({ showAlert = true }) {
  const navigate = useNavigate();

  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const selectedTypeVehicleId = localStorage.getItem("selectedTypeVehicleId");

  const topic = `${mqttTopics.telData}${selectedVehicleId}`;
  const { messages, clearMessages } = useMqtt(mqttDominio, topic);
  const [error, setError] = useState(null);
  const [vehicleData, setVehicleData] = useState(null);
  const [typeVehicleData, setTypeVehicleData] = useState(null);
  const [dataValue, setDataValue] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const [maxPressure, setMaxPressure] = useState(0);

  useEffect(() => {
    if (!selectedVehicleId) return;
    ListItems(
      `${vehicleRoutes.base}/${selectedVehicleId}`,
      setVehicleData,
      setError
    );
  }, [selectedVehicleId]);

  useEffect(() => {
    if (!selectedTypeVehicleId) return;
    ListItems(
      `${vehiclesTypesRoutes.base}/${selectedTypeVehicleId}`,
      setTypeVehicleData,
      setError
    );
  }, [selectedTypeVehicleId]);

  useEffect(() => {
    if (typeVehicleData) {
      const maxValue = typeVehicleData.fuelRange?.maxFuelValue || 0;
      setMaxPressure(maxValue);
    }
  }, [typeVehicleData]);

  const previousVehicleIdRef = useRef(selectedVehicleId);

  useEffect(() => {
    if (previousVehicleIdRef.current !== selectedVehicleId) {
      clearMessages();
      setDataValue(null);
      previousVehicleIdRef.current = selectedVehicleId;
    }
  }, [selectedVehicleId, clearMessages]);

  useEffect(() => {
    mqttDataHandler(messages, setDataValue, "fuelInfo");
  }, [messages]);

  useEffect(() => {
    if (dataValue !== null && maxPressure > 0) {
      const calculatedPercentage = calculatePercentage(
        dataValue,
        maxPressure
      );
      setPercentage(calculatedPercentage);
    }
  }, [dataValue, maxPressure]);

  const determineStatus = (pressureValue, vehicleData, typeVehicleData) => {
    if (
      vehicleData &&
      vehicleData.fuelType === "GAS" &&
      !typeVehicleData?.fuelRange
    ) {
      return "No Disponible";
    }

    if (
      vehicleData &&
      vehicleData.fuelType === "GASOLINA" &&
      !typeVehicleData?.fuelRange
    ) {
      return "No Disponible";
    }

    let optimalRangeStart,
      regularRangeStart,
      lowRangeStart,
      veryLowRangeStart;
    if (vehicleData && vehicleData.fuelType) {
      ({
        optimalFuelRangeStart: optimalRangeStart,
        regularFuelRangeStart: regularRangeStart,
        lowFuelRangeStart: lowRangeStart,
        veryLowFuelRangeStart: veryLowRangeStart,
      } = typeVehicleData.fuelRange);
    }

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

  const status =
    dataValue !== null && typeVehicleData
      ? determineStatus(dataValue, vehicleData, typeVehicleData)
      : "No Disponible";

  const handleClick = () => {
    handleRecordsMessage(navigate, showAlert, "/fuel-Records");
  };

  const fuelLabel =
    vehicleData?.fuelType === "GASOLINA"
      ? "Volumen actual"
      : vehicleData?.fuelType === "GAS"
      ? "Presión actual"
      : vehicleData?.fuelType === "DIESEL"
      ? "Volumen actual"
      : "Valor";

  const fuelUnit =
    vehicleData?.fuelType === "GASOLINA"
      ? "vol"
      : vehicleData?.fuelType === "GAS"
      ? "psi"
      : vehicleData?.fuelType === "DIESEL"
      ? "gal"
      : "";

  const displayValue =
    vehicleData?.fuelType === "DIESEL"
      ? dataValue !== null
        ? (dataValue * 0.264172).toFixed(2)
        : "-"
      : dataValue;

  return (
    <div className="g-option-item" onClick={handleClick}>
      <div className="kpi-card-header">
        <div className="kpi-card-header-main">
          <FaGasPump className="kpi-card-header-icon" />
          <div>
            <h5 className="kpi-card-title">Combustible</h5>
            <div style={{ fontSize: "0.7rem", color: "#9ca3af" }}>
              Tipo: {vehicleData?.fuelType || "-"}
            </div>
          </div>
        </div>
        {status && (
          <span
            className={
              "kpi-status-pill " +
              (status === "Óptimo"
                ? "ok"
                : status === "Regular"
                ? "warn"
                : status === "No Disponible"
                ? ""
                : "danger")
            }
          >
            {status}
          </span>
        )}
      </div>

      <div className="kpi-card-body">
        <div className="kpi-gauge-wrapper">
          {dataValue !== null ? (
            <CircularProgressbarWithStatus
              value={percentage}
              status={status}
              size={"55%"}
            >
              <div className="kpi-gauge-details">
                <div>{fuelLabel}: {displayValue} {fuelUnit}</div>
              </div>
            </CircularProgressbarWithStatus>
          ) : (
            <NoDataCircularProgressbar />
          )}
        </div>
      </div>
    </div>
  );
}
