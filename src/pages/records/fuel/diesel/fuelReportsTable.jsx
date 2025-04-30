import React from "react";
import { Table, Spinner } from "react-bootstrap";
import { useFuelReportsByVehicle } from "../../../../api/hooks/useFuelReport";

// Función utilitaria para convertir milisegundos a formato hh:mm:ss
const formatDuration = (ms) => {
  if (!ms && ms !== 0) return "-";
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

// Función auxiliar para convertir un array de fecha a string legible
const formatDateArray = (arr) => {
  if (!Array.isArray(arr) || arr.length < 3) return "Fecha inválida";
  const [year, month, day, hour = 0, minute = 0, second = 0] = arr;
  const date = new Date(year, month - 1, day, hour, minute, second);
  return date.toLocaleString(); // Puedes usar toLocaleDateString() si solo quieres la fecha
};

export function FuelReportsTable() {
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  const { data: reports, isLoading, isError } = useFuelReportsByVehicle(selectedVehicleId);

  return (
    <div style={{ margin: "10px", width: "90%", height: "600px", overflowX: "auto" }}>
      <h4>📊 Reportes de combustible</h4>
      {isLoading ? (
        <Spinner animation="border" variant="primary" />
      ) : isError ? (
        <div>❌ Error al cargar los reportes.</div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Hora de apertura</th>
              <th>Hora de cierre</th>
              <th>Combustible inicial</th>
              <th>Combustible final</th>
              <th>Patente</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{formatDateArray(report.date)}</td>
                <td>{formatDateArray(report.openingTime)}</td>
                <td>{formatDateArray(report.closingTime)}</td>
                <td>{report.initialFuel ?? "—"}</td>
                <td>{report.finalFuel ?? "—"}</td>
                <td>{report.vehicleModel?.licensePlate ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
