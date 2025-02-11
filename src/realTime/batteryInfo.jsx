import React, { useEffect, useRef, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { vehiclesTypesRoutes, vehiclesTypesURL } from "../api/apiurls";
import useMqtt from "../hooks/useMqtt";
import { calculatePercentage } from "../utils/calculatePercentage";
import NoDataCircularProgressbar from "../common/noDataCircularProgressbar";
import CircularProgressbarWithStatus from "../common/circularProgressbarWithStatus";
import { ListItems } from "../hooks/listItems";
import mqttDataHandler from "../hooks/mqttDataHandler";
import { mqttDominio, mqttTopics } from "../mqtt/mqttConfig";

export function BatteryInfo({ showAlert = true }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]); 
  const [error, setError] = useState(null);
  const [batteryRange, setBatteryRange] = useState(null); // Rango de batería dinámico
  const [maxVoltaje, setMaxVoltaje] = useState(0); // Rango de
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const selectedTypeVehicleId = localStorage.getItem("selectedTypeVehicleId");

  const topic = `${mqttTopics.tmp_gasPressure}${selectedVehicleId}`;
  const { messages, clearMessages } = useMqtt(mqttDominio, topic);

  // Obtener los rangos de batería desde la API del tipo de vehículo
  useEffect(() => {
    ListItems(`${vehiclesTypesRoutes.base}/${selectedTypeVehicleId}`, setBatteryRange, setError);
  }, [selectedTypeVehicleId]);

  // Usar useRef para almacenar el vehículo anterior
  const previousVehicleIdRef = useRef(selectedVehicleId);
  // Limpiar mensajes al cambiar de vehículo seleccionado
  useEffect(() => {
    if (previousVehicleIdRef.current !== selectedVehicleId) {
      clearMessages(); // Llama a la función para limpiar mensajes solo si el vehículo ha cambiado
      setData(0);
      previousVehicleIdRef.current = selectedVehicleId; // Actualiza el ref del vehículo anterior
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

  // Función para determinar el estado según los rangos dinámicos
  const determineStatus = (percentage) => {
    if (!batteryRange) {
      return "No Disponible"; // Si los rangos aún no están disponibles
    }
    //console.log("Estyad" + percentage)
    const { optimalBatteryRangeStart, regularBatteryRangeStart, lowBatteryRangeStart, veryLowBatteryRangeStart } = batteryRange.batteryRange;

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
      <h5>Battery Info</h5>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0px", justifyContent: "center" }}>
        {data.length > 0 ? (
          data.map((battery, index) => {
            const percentage = battery.voltaje ? calculatePercentage(battery.voltaje, maxVoltaje) : 0;
            const status = determineStatus(battery.voltaje);

            return (
              <div key={index} style={{ width: "40%", height: "40%", margin: "2%" }}>
                <CircularProgressbarWithStatus value={percentage} status={status} size={"100%"}>
                  <div style={{ textAlign: "center", color: "white", marginTop: "10px" }}>
                    <span style={{ fontSize: "15px" }}>{battery.name}</span>
                    <br />
                    <span style={{ fontSize: "15px" }}>Estado: {status}</span> {/* Texto del estado */}
                    <br />
                    <span style={{ fontSize: "15px" }}>Voltaje: {battery.voltaje}V</span>
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
