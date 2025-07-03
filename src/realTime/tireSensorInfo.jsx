import React from "react";
import { ForkliftWith4Tires } from "./../pages/optionsPanel/truckTiresGraphics/forkliftWith4Tires";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export function TireInfo({ showAlert = true }) {
  const navigate = useNavigate();

  const handleRecords = () => {
    if (showAlert) {
      Swal.fire({
        title: "¿Desea ver los registros de incidentes de impacto?",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/tire-sensors-details");
        }
      });
    } else {
      navigate("/tire-sensors-details");
    }
  };

  return (
    <div className="g-option-item" onClick={handleRecords}>
      <h4>Neumaticos Info</h4>
      <ForkliftWith4Tires />
    </div>
  );
}
