import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ListItemsPaginated } from "../../hooks/listItems";
import { impactIncidentLoggingByVehiclePageURL } from "../../api/apiurls";
import { getDateAndDayFromTimestamp } from "../../utils/formatUtils";

export function ImpactIncidentLogging({ showAlert = true }) {
  const navigate = useNavigate();
  //const [data, setData] = useState();
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const [pageNumber, setPageNumber] = useState(0);

  const { data, totalPages, currentPage, setCurrentPage } = ListItemsPaginated(
    `${impactIncidentLoggingByVehiclePageURL}/${selectedVehicleId}`,
    pageNumber
  );

  const handleRecords = () => {
    if (showAlert) {
      Swal.fire({
        title: "¿Desea ver los registros de la ImpactIncidentLogging?",
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

  return (
    <div className="g-option-item" onClick={handleRecords}>
      <h4>Registro de incidentes de impacto</h4>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>

            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((log) => (
              <tr key={log.id}>
                <td>{log.id}</td>

                <td>{log.description}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
