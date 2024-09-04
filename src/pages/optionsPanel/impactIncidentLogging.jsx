import React from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export function ImpactIncidentLogging({ showAlert = true }) {
  const navigate = useNavigate();

  // Datos de prueba para los registros de incidentes de impacto
  const incidentLogs = [
    { id: 1, description: "Impacto leve en el lateral derecho", time: "14:23", date: "2024-09-03" },
    { id: 2, description: "Impacto fuerte en la parte trasera", time: "11:12", date: "2024-09-04" },
    { id: 3, description: "Colisión con objeto estacionario", time: "16:45", date: "2024-09-05" },
  ];

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
    <div className="option-item" onClick={handleRecords}>
      <h4 h4>Registro de incidentes de impacto</h4>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Hora</th>
            <th>Dia</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {incidentLogs.map((log) => (
            <tr key={log.id}>
              <td>{log.time}</td>
              <td>{log.date}</td>
              <td>{log.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
