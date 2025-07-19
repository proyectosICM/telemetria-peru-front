import React from "react";
import { ForkliftWith4Tires } from "./../pages/optionsPanel/truckTiresGraphics/forkliftWith4Tires";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useGetVehicleById } from "../api/hooks/useVehicle";
import { ForkliftWith6Tires } from "../pages/optionsPanel/truckTiresGraphics/forkliftWith6Tires";

export function TireInfo({ showAlert = true }) {
  const navigate = useNavigate();
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const { data, isLoading, error } = useGetVehicleById(selectedVehicleId);

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
      {data && data.vehicleTypeId === 1 && <ForkliftWith4Tires />}
      {data && data.vehicleTypeId === 2 && <ForkliftWith6Tires />}
    </div>
  );
}
