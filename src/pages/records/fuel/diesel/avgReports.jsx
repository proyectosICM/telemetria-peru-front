import React from "react";
import { useFuelReportSummary } from "../../../../api/hooks/useFuelReport";
import { Table } from "react-bootstrap";

export function AvgReports() {
  // Ejemplo: Obtener datos para el vehículo 18 en la fecha 27/5/2025
  const { data: fuelReport, isLoading, isError } = useFuelReportSummary(18, 2025, 5, 27);

  if (isLoading) return <div>Cargando reportes...</div>;
  if (isError) return <div>Error al cargar los reportes</div>;

  const formatDuration = (ms) => {
    if (!ms && ms !== 0) return "-";
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "20px auto",
        width: "100%",
      }}
    >
      <h1>Reportes Promedio</h1>

      {fuelReport ? (
        <div style={{ width: "90%", margin: "0 auto" }}>
          <Table striped bordered hover responsive variant="dark">
            <thead>
              <tr>
                <th>Métrica</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Consumo promedio de combustible</td>
                <td>{fuelReport.averageFuelConsumption?.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Tiempo total en ralentí (horas)</td>
                <td>{fuelReport.totalIdleTime}</td>
              </tr>
              <tr>
                <td>Tiempo total estacionado (horas)</td>
                <td>{fuelReport.totalParkedTime.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Tiempo total operando (horas)</td>
                <td>{fuelReport.totalOperatingTime.toFixed(2)}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      ) : (
        <p>No hay datos disponibles para mostrar.</p>
      )}
    </div>
  );
}
