import React, { useEffect, useState } from "react";
import { ListItems } from "../../../hooks/listItems";
import { vehicleRoutes } from "../../../api/apiurls";
import useMqtt from "../../../hooks/useMqtt";
import mqttDataHandler from "../../../hooks/mqttDataHandler";
import { handleRecordsMessage } from "../../../utils/handleRecordsMessage";
import { useNavigate } from "react-router-dom";
import { mqttDominio, mqttTopics } from "../../../mqtt/mqttConfig";
import {
  BiSolidDashboard,
} from "react-icons/bi";
import {
  FaCar,
  FaTachometerAlt,
  FaExclamationTriangle,
} from "react-icons/fa";

export function VehicleInfo({ showAlert = true }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [speed, setSpeed] = useState(null);

  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  const topic = `${mqttTopics.telData}${selectedVehicleId}`;
  const { messages } = useMqtt(mqttDominio, topic);

  useEffect(() => {
    if (!selectedVehicleId) return;
    ListItems(
      `${vehicleRoutes.base}/${selectedVehicleId}`,
      setData,
      setError
    );
  }, [selectedVehicleId]);

  useEffect(() => {
    mqttDataHandler(messages, setSpeed, "speed");
  }, [messages]);

  const isSpeedExceeded =
    data?.maxSpeed > 0 && speed != null && speed > data.maxSpeed;

  const handleClick = () => {
    handleRecordsMessage(navigate, showAlert, "/vehicle-info");
  };

  return (
    <div className="g-option-item" onClick={handleClick}>
      <div className="kpi-card-header">
        <div className="kpi-card-header-main">
          <BiSolidDashboard className="kpi-card-header-icon" />
          <div>
            <h5 className="kpi-card-title">Información del vehículo</h5>
            <div style={{ fontSize: "0.7rem", color: "#9ca3af" }}>
              ID: {selectedVehicleId || "-"}
            </div>
          </div>
        </div>
        {speed != null && (
          <span
            className={
              "kpi-status-pill " +
              (isSpeedExceeded ? "danger" : "ok")
            }
          >
            {isSpeedExceeded ? "Sobre límite" : "Dentro del límite"}
          </span>
        )}
      </div>

      <div className="kpi-card-body">
        <div className="kpi-field">
          <span className="kpi-field-label">
            <FaCar style={{ marginRight: 4 }} />
            Placa
          </span>
          <span className="kpi-field-value">
            {data && data.licensePlate ? data.licensePlate : "-"}
          </span>
        </div>

        <div className="kpi-field">
          <span className="kpi-field-label">
            Tipo
          </span>
          <span className="kpi-field-value">
            {data && data.vehicleTypeName ? data.vehicleTypeName : "-"}
          </span>
        </div>

        <div className="kpi-field">
          <span className="kpi-field-label">
            Velocidad actual
          </span>
          <span className="kpi-field-value">
            <FaTachometerAlt style={{ marginRight: 4 }} />
            {speed != null ? `${speed} km/h` : "0 km/h"}
          </span>
        </div>

        {data?.maxSpeed && (
          <div className="kpi-field">
            <span className="kpi-field-label">Velocidad máxima</span>
            <span className="kpi-field-value">
              {data.maxSpeed} km/h
            </span>
          </div>
        )}

        {isSpeedExceeded && (
          <div className="kpi-alert-text">
            <FaExclamationTriangle />
            Límite de velocidad excedido.
          </div>
        )}
      </div>
    </div>
  );
}
