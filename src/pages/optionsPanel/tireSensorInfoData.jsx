import React, { useEffect, useRef, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { mqttDominio, mqttTopics, vehiclesTypesURL } from "../../api/apiurls";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useMqtt from "../../hooks/useMqtt";
import { calculatePercentage } from "../../utils/calculatePercentage";
import { handleRecordsMessage } from "../../utils/handleRecordsMessage";
import { getStatusColor } from "../../utils/getStatusColorCPB";
import NoDataCircularProgressbar from "../../common/noDataCircularProgressbar";
import CircularProgressbarWithStatus from "../../common/circularProgressbarWithStatus";
import { ListItems } from "../../hooks/listItems";
import mqttDataHandler from "../../hooks/mqttDataHandler";

export function TireInfoData({ showAlert = true }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const selectedTypeVehicleId = localStorage.getItem("selectedTypeVehicleId");
  const [maxPressure, setMaxPressure] = useState(0);
  const topic = `${mqttTopics.tmp_gasPressure}${selectedVehicleId}`;
  const { messages, clearMessages } = useMqtt(mqttDominio, topic);
  const [pressureRange, setPressureRange] = useState(0);

  useEffect(() => {
    ListItems(`${vehiclesTypesURL}/${selectedTypeVehicleId}`, setPressureRange, setError);
  }, [selectedTypeVehicleId]);

  useEffect(() => {
    //console.log("Datos actualizados:", data);
    if (pressureRange) {
      const maxPressureData = pressureRange.tirePressureRange.maxTirePressure || 0;
      setMaxPressure(maxPressureData);
    }
  }, [pressureRange]);

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
    mqttDataHandler(messages, setData, "tiresData");
  }, [messages]);

  const determineStatus = (percentage) => {
    const { optimalTirePressureRangeStart, regularTirePressureRangeStart, lowTirePressureRangeStart, veryLowTirePressureRangeStart } =
      pressureRange.tirePressureRange;
    if (percentage >= optimalTirePressureRangeStart) {
      return "Óptimo";
    } else if (percentage >= regularTirePressureRangeStart) {
      return "Regular";
    } else if (percentage >= lowTirePressureRangeStart) {
      return "Bajo";
    } else if (percentage >= veryLowTirePressureRangeStart) {
      return "Muy Bajo";
    } else {
      return "No Disponible";
    }
  };

  return (
    <div className="g-option-item" onClick={() => handleRecordsMessage(navigate, showAlert, "/tire-sensors-details")}>
      <h4>Tire Info</h4>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0px", justifyContent: "center" }}>
        {data.length > 0 ? (
          data.map((tire, index) => {
            const percentage = tire.pressure ? calculatePercentage(tire.pressure, maxPressure) : 0;
            const status = determineStatus(tire.pressure);

            return (
              <div key={index} style={{ width: "40%", height: "40%", margin: "2%" }}>
                <CircularProgressbarWithStatus value={percentage} status={status} size={"100%"}>
                  <div style={{ textAlign: "center", color: "white", marginTop: "10px" }}>
                    <span style={{ fontSize: "15px" }}>Position: {tire.position_number}</span>
                    <br />
                    <span style={{ fontSize: "15px" }}>{tire.name}</span>
                    <br />
                    <span style={{ fontSize: "15px" }}>Estado: {status}</span>
                    <br />
                    <span style={{ fontSize: "15px" }}>Presión: {tire.pressure} psi</span>
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
