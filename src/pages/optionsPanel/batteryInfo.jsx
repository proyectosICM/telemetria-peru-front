import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { batteryByVehicleIdURL } from "../../api/apiurls";
import { ListItems } from "../../hooks/listItems";

export function BatteryInfo({ showAlert = true }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  useEffect(() => {
    ListItems(`${batteryByVehicleIdURL}/${selectedVehicleId}`, setData);
  }, [selectedVehicleId]);

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

  const calculatePercentage = (voltage, maxVoltage = 12) => {
    return (voltage / maxVoltage) * 100;
  };

  const determineStatus = (percentage) => {
    if (percentage > 75) {
      return "Óptimo";
    } else if (percentage > 50) {
      return "Regular";
    } else if (percentage > 25) {
      return "Bajo";
    } else {
      return "Muy Bajo";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Óptimo":
        return "rgba(0, 128, 0, 1)"; // Verde
      case "Regular":
        return "rgba(255, 165, 0, 1)"; // Naranja
      case "Bajo":
        return "rgba(255, 215, 0, 1)"; // Amarillo
      case "Muy Bajo":
        return "rgba(255, 0, 0, 1)"; // Rojo
      default:
        return "rgba(62, 152, 199, 1)"; // Color base
    }
  };

  return (
    <div className="g-option-item" onClick={handleRecords}>
      <h4>Battery Info</h4>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0px", justifyContent: "center" }}>
        {data &&
          data.map((battery, index) => {
            const percentage = battery.voltaje ? calculatePercentage(battery.voltaje) : 0;
            const status = determineStatus(percentage);
            const statusColor = getStatusColor(status);

            return (
              <div key={index} style={{ width: "40%", height: "40%", margin: "2%" }}>
                <CircularProgressbar
                  value={percentage}
                  maxValue={100}
                  text={`${Math.round(percentage)}%`} // Redondear el porcentaje
                  styles={buildStyles({
                    rotation: 0.5,
                    strokeLinecap: "butt",
                    trailColor: "#eee",
                    textSize: "16px",
                    pathTransitionDuration: 0.5,
                    pathColor: statusColor,
                    textColor: "white",
                    backgroundColor: "#3e98c7",
                  })}
                />
                <div style={{ textAlign: "center", color: "white", marginTop: "10px" }}>
                  <span style={{fontSize: "15px"}}>{battery.name}</span>
                  <br />
                  <span style={{fontSize: "15px"}}>Estado: {status}</span> {/* Texto del estado */}
                  <br />
                  <span style={{fontSize: "15px"}}>Voltaje: {battery.voltaje}V</span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
