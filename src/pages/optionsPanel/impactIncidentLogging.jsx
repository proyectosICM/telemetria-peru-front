import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaExclamationCircle } from "react-icons/fa";
import { ListItemsPaginated } from "../../hooks/listItems";
import {
  impactIncidentLoggingRoutes,
} from "../../api/apiurls";

export function ImpactIncidentLogging({ showAlert = true }) {
  const navigate = useNavigate();
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const [pageNumber, setPageNumber] = useState(0);
  const [error, setError] = useState(null);

  const { data } = ListItemsPaginated(
    `${impactIncidentLoggingRoutes.byVehiclePaged}/${selectedVehicleId}`,
    pageNumber
  );

  const handleRecords = () => {
    if (showAlert) {
      Swal.fire({
        title: "¿Desea ver los registros de incidentes de impacto?",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/impact-incident-logging-records");
        }
      });
    } else {
      navigate("/impact-incident-logging-records");
    }
  };

  const incidentsCount = Array.isArray(data) ? data.length : 0;

  return (
    <div className="g-option-item" onClick={handleRecords}>
      <div className="impact-card">
        <div className="impact-card-left">
          <FaExclamationCircle className="impact-card-icon" />
          <div>
            <p className="impact-card-title">
              Incidentes de impacto
            </p>
            <p className="impact-card-sub">
              {incidentsCount > 0
                ? `${incidentsCount} registros recientes`
                : "Sin incidentes recientes"}
            </p>
          </div>
        </div>

        <div className="impact-card-cta">
          Ver registros
        </div>
      </div>
    </div>
  );
}
