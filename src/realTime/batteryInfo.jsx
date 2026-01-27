import React, { useEffect, useRef, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { vehiclesTypesRoutes } from "../api/apiurls";
import useMqtt from "../hooks/useMqtt";
import { calculatePercentage } from "../utils/calculatePercentage";
import NoDataCircularProgressbar from "../common/noDataCircularProgressbar";
import CircularProgressbarWithStatus from "../common/circularProgressbarWithStatus";
import { ListItems } from "../hooks/listItems";
import mqttDataHandler from "../hooks/mqttDataHandler";
import { mqttDominio, mqttTopics } from "../mqtt/mqttConfig";
import { FaBatteryHalf } from "react-icons/fa";

export function BatteryInfo({ showAlert = true }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [batteryRange, setBatteryRange] = useState(null);
  const [maxVoltaje, setMaxVoltaje] = useState(0);
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const selectedTypeVehicleId = localStorage.getItem("selectedTypeVehicleId");

  const topic = `${mqttTopics.tmp_gasPressure}${selectedVehicleId}`;
  const { messages, clearMessages } = useMqtt(mqttDominio, topic);

  useEffect(() => {
    if (!selectedTypeVehicleId) return;
    ListItems(
      `${vehiclesTypesRoutes.base}/${selectedTypeVehicleId}`,
      setBatteryRange,
      setError
    );
  }, [selectedTypeVehicleId]);

  const previousVehicleIdRef = useRef(selectedVehicleId);

  useEffect(() => {
    if (previousVehicleIdRef.current !== selectedVehicleId) {
      clearMessages();
      setData(0);
      previousVehicleIdRef.current = selectedVehicleId;
    }
  }, [selectedVehicleId, clearMessages]);

  useEffect(() => {
    if (batteryRange) {
      const maxGas = batteryRange.batteryRange.maxBatteryVoltage || 0;
      setMaxVoltaje(maxGas);
    }
  }, [batteryRange]);

  useEffect(() => {
    mqttDataHandler(messages, setData, "bateriesData");
  }, [messages]);

  const handleRecords = () => {
    if (showAlert) {
      Swal.fire({
        title: "¿Desea ver los registros de la batería?",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/battery-Records");
        }
      });
    } else {
      navigate("/battery-Records");
    }
  };

  const determineStatus = (percentage) => {
    if (!batteryRange) {
      return "No Disponible";
    }

    const {
      optimalBatteryRangeStart,
      regularBatteryRangeStart,
      lowBatteryRangeStart,
      veryLowBatteryRangeStart,
    } = batteryRange.batteryRange;

    if (percentage >= optimalBatteryRangeStart) {
      return "Óptimo";
    } else if (percentage >= regularBatteryRangeStart) {
      return "Regular";
    } else if (percentage >= lowBatteryRangeStart) {
      return "Bajo";
    } else if (percentage >= veryLowBatteryRangeStart) {
      return "Muy Bajo";
    } else {
      return "No Disponible";
    }
  };

  return (
    <div className="g-option-item" onClick={handleRecords}>
      <div className="kpi-card-header">
        <div className="kpi-card-header-main">
          <FaBatteryHalf className="kpi-card-header-icon" />
          <h5 className="kpi-card-title">Baterías</h5>
        </div>
        {Array.isArray(data) && data.length > 0 && batteryRange && (
          <span className="kpi-status-pill ok">Monitoreando</span>
        )}
      </div>

      <div
        className="kpi-card-body"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          justifyContent: "center",
        }}
      >
        {Array.isArray(data) && data.length > 0 ? (
          data.map((battery, index) => {
            const percentage = battery.voltaje
              ? calculatePercentage(battery.voltaje, maxVoltaje)
              : 0;
            const status = determineStatus(percentage);

            return (
              <div
                key={index}
                style={{ width: "45%", minWidth: 100, maxWidth: 140 }}
              >
                <CircularProgressbarWithStatus
                  value={percentage}
                  status={status}
                  size={"100%"}
                >
                  <div className="kpi-gauge-details">
                    <div style={{ fontWeight: 600 }}>
                      {battery.name}
                    </div>
                    <div>Estado: {status}</div>
                    <div>Voltaje: {battery.voltaje} V</div>
                  </div>
                </CircularProgressbarWithStatus>
              </div>
            );
          })
        ) : (
          <NoDataCircularProgressbar />
        )}
      </div>
    </div>
  );
}
