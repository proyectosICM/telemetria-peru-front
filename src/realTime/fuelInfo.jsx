import React, { useEffect, useRef, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import useMqtt from "../hooks/useMqtt";
import { vehicleRoutes, vehiclesTypesRoutes, fuelTheftAlertsRoutes } from "../api/apiurls";
import { useNavigate } from "react-router-dom";
import { calculatePercentage } from "../utils/calculatePercentage";
import { handleRecordsMessage } from "../utils/handleRecordsMessage";
import NoDataCircularProgressbar from "../common/noDataCircularProgressbar";
import CircularProgressbarWithStatus from "../common/circularProgressbarWithStatus";
import { ListItems } from "../hooks/listItems";
import mqttDataHandler from "../hooks/mqttDataHandler";
import { mqttDominio, mqttTopics } from "../mqtt/mqttConfig";
import { FaGasPump, FaBell } from "react-icons/fa";

function getAuthHeaders() {
  const token = localStorage.getItem("tp_token");
  if (!token) {
    console.error("Token not available. Please log in.");
    throw new Error("Token not available. Please log in.");
  }
  return {
    Authorization: `Bearer ${token}`,
  };
}

// Fecha YYYY-MM-DD en timezone America/Lima
function formatDateYYYYMMDD(date = new Date()) {
  try {
    const fmt = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Lima",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return fmt.format(date); // YYYY-MM-DD
  } catch {
    const parts = new Intl.DateTimeFormat("es-PE", {
      timeZone: "America/Lima",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(date);

    const y = parts.find((p) => p.type === "year")?.value;
    const m = parts.find((p) => p.type === "month")?.value;
    const d = parts.find((p) => p.type === "day")?.value;
    return `${y}-${m}-${d}`;
  }
}

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

  // 🔔 Conteo alertas de hoy
  const [todayAlertsCount, setTodayAlertsCount] = useState(0);

  useEffect(() => {
    if (!selectedVehicleId) return;
    ListItems(`${vehicleRoutes.base}/${selectedVehicleId}`, setVehicleData, setError);
  }, [selectedVehicleId]);

  useEffect(() => {
    if (!selectedTypeVehicleId) return;
    ListItems(`${vehiclesTypesRoutes.base}/${selectedTypeVehicleId}`, setTypeVehicleData, setError);
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
      const calculatedPercentage = calculatePercentage(dataValue, maxPressure);
      setPercentage(calculatedPercentage);
    }
  }, [dataValue, maxPressure]);

  // ====== ALERTAS HOY (conteo) ======
  const fetchTodayAlertsCount = async () => {
    if (!selectedVehicleId) return;

    const today = formatDateYYYYMMDD(new Date());

    const url = fuelTheftAlertsRoutes.search({
      vehicleId: selectedVehicleId,
      period: "day",
      date: today,
      tz: "America/Lima",
      page: 0,
      size: 1, // solo queremos totalElements
    });

    try {
      const res = await axios.get(url, { headers: getAuthHeaders() });

      const count =
        typeof res.data?.totalElements === "number"
          ? res.data.totalElements
          : res.data?.content?.length ?? 0;

      setTodayAlertsCount(count);
    } catch (e) {
      console.error("Error counting today's fuel theft alerts", e);
      setTodayAlertsCount(0);
    }
  };

  useEffect(() => {
    fetchTodayAlertsCount();
    const id = setInterval(fetchTodayAlertsCount, 10_000); // cada 10s
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVehicleId]);

  const determineStatus = (pressureValue, vehicleData, typeVehicleData) => {
    if (vehicleData && vehicleData.fuelType === "GAS" && !typeVehicleData?.fuelRange) {
      return "No Disponible";
    }

    if (vehicleData && vehicleData.fuelType === "GASOLINA" && !typeVehicleData?.fuelRange) {
      return "No Disponible";
    }

    let optimalRangeStart, regularRangeStart, lowRangeStart, veryLowRangeStart;

    if (vehicleData && vehicleData.fuelType && typeVehicleData?.fuelRange) {
      ({
        optimalFuelRangeStart: optimalRangeStart,
        regularFuelRangeStart: regularRangeStart,
        lowFuelRangeStart: lowRangeStart,
        veryLowFuelRangeStart: veryLowRangeStart,
      } = typeVehicleData.fuelRange);
    } else {
      return "No Disponible";
    }

    if (pressureValue >= optimalRangeStart) return "Óptimo";
    if (pressureValue >= regularRangeStart) return "Regular";
    if (pressureValue >= lowRangeStart) return "Bajo";
    if (pressureValue >= veryLowRangeStart) return "Muy Bajo";
    return "No Disponible";
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

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* 🔔 Campana solo si hay alertas hoy */}
          {todayAlertsCount > 0 && (
            <div
              onClick={(e) => {
                e.stopPropagation(); // no dispara click del card
                navigate("/fuel-theft-alerts"); // <-- cambia a tu ruta real
              }}
              title={`Alertas de hoy: ${todayAlertsCount}`}
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <FaBell style={{ fontSize: "18px" }} />
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-8px",
                  minWidth: "18px",
                  height: "18px",
                  padding: "0 5px",
                  borderRadius: "999px",
                  fontSize: "11px",
                  lineHeight: "18px",
                  textAlign: "center",
                  background: "#ef4444",
                  color: "white",
                  fontWeight: 700,
                }}
              >
                {todayAlertsCount > 99 ? "99+" : todayAlertsCount}
              </span>
            </div>
          )}

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
      </div>

      <div className="kpi-card-body">
        <div className="kpi-gauge-wrapper">
          {dataValue !== null ? (
            <CircularProgressbarWithStatus value={percentage} status={status} size={"55%"}>
              <div className="kpi-gauge-details">
                <div>
                  {fuelLabel}: {displayValue} {fuelUnit}
                </div>
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
