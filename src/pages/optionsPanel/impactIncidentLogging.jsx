import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaExclamationCircle } from "react-icons/fa"; // Ícono de advertencia/reporte
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ListItemsPaginated } from "../../hooks/listItems";
import { impactIncidentLoggingByVehiclePageURL } from "../../api/apiurls";

export function ImpactIncidentLogging({ showAlert = true }) {
  const navigate = useNavigate();
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const [pageNumber, setPageNumber] = useState(0);
  const [error, setError] = useState(null);
  const { data, totalPages, currentPage, setCurrentPage } = ListItemsPaginated(
    `${impactIncidentLoggingByVehiclePageURL}/${selectedVehicleId}`,
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

  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    padding: "20px",
    margin: "20px auto",
    textAlign: "center",
    borderRadius: "10px",
    boxShadow: "0px 4px 15px rgba(255, 69, 0, 0.6)",
    cursor: "pointer",
    color: "#fff",
    backgroundColor: "#ff7043",
    border: "2px solid #ff5722",
    transition: "transform 0.3s",
  };

  const iconStyle = {
    fontSize: "2.5em",
    marginBottom: "10px",
    color: "#fff",
  };

  const textStyle = {
    fontSize: "0.8em",
    fontWeight: "bold",
  };

  return (
    <div className="g-option-item" onClick={handleRecords}>
      <div style={cardStyle}>
        <FaExclamationCircle style={iconStyle} />
        <p style={textStyle}>Registros de incidentes de impacto</p>
      </div>
    </div>
  );
}
