import React from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export function IssuesInfo({ showAlert = true }) {
  const navigate = useNavigate();
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  // Datos de ejemplo para la tabla
  const issuesData = [
    { id: 1, description: "Overheating", status: "Critical" },
    { id: 2, description: "Low Tire Pressure", status: "Warning" },
    { id: 3, description: "Oil Change Due", status: "Normal" },
  ];

  const handleRecords = () => {
    if (showAlert) {
      Swal.fire({
        title: "¿Desea ver los registros de irregularidades?",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/issues-Records");
          console.log("Mostrar registros");
        }
      });
    } else {
      navigate("/issues-Records");
    }
  };

  return (
    <div className="option-item" onClick={handleRecords}>
      <h4>Issues Info</h4>
      <Table striped bordered hover variant="dark" size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {issuesData.map((issue) => (
            <tr key={issue.id}>
              <td>{issue.id}</td>
              <td>{issue.description}</td>
              <td>{issue.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
