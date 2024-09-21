import React, { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { mqttDominio, mqttTopics, vehiclesTypesURL } from "../../api/apiurls";
import useMqtt from "../../hooks/useMqtt";
import { calculatePercentage } from "../../utils/calculatePercentage";
import { getStatusColor } from "../../utils/getStatusColorCPB";
import NoDataCircularProgressbar from "../../common/noDataCircularProgressbar";
import CircularProgressbarWithStatus from "../../common/CircularProgressbarWithStatus";
import { ListItems } from "../../hooks/listItems";

export function BatteryInfo({ showAlert = true }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // Datos de la batería
  const [batteryRange, setBatteryRange] = useState(null); // Rango de batería dinámico
  const [maxVoltaje, setMaxVoltaje] = useState(0); // Rango de
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const selectedTypeVehicleId = localStorage.getItem("selectedTypeVehicleId");
  
  const topic = `${mqttTopics.tmp_gasPressure}${selectedVehicleId}`;
  const { isConnected, messages } = useMqtt(mqttDominio, topic);

  // Obtener los rangos de batería desde la API del tipo de vehículo
  useEffect(() => {
    ListItems(`${vehiclesTypesURL}/${selectedTypeVehicleId}`, setBatteryRange);
  }, [selectedTypeVehicleId]);

  useEffect(() => {
    //console.log("Datos actualizados:", data);
    if (batteryRange) {
      const maxGas = batteryRange.batteryRange.maxBatteryVoltage || 0;
      setMaxVoltaje(maxGas);
      console.log(`Max pressure actualizado: ${maxGas}`);
    }
  }, [batteryRange]); 

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessageStr = messages[messages.length - 1];
      //console.log("Último mensaje recibido:", lastMessageStr);

      try {
        const lastMessage = JSON.parse(lastMessageStr);

        // Verificar si el mensaje contiene datos de baterías
        if (lastMessage.bateriesData) {
          setData(lastMessage.bateriesData);
        } else {
          setData([]); // No hay datos de baterías en el mensaje
        }
      } catch (error) {
        console.error("Error parsing MQTT message", error);
        console.log("Mensaje recibido no válido:", lastMessageStr);
      }
    }
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
      <h4>Battery Info</h4>
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
