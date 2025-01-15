import React, { useState } from "react";
import { ListItemsPaginated } from "../../hooks/listItems";
import { fuelEfficiencyRoutes } from "../../api/apiurls";
import { formatTimeDecimal, getDateFromTimestamp, getTimeFromTimestamp } from "../../utils/formatUtils";
import { Button, Table } from "react-bootstrap";
import { PaginacionUtils } from "../../utils/paginacionUtils";

export function FuelEfficiencyTable() {
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const [pageNumberEfficiency, setPageNumberEfficiency] = useState(0);

  const { data, totalPages, currentPage, setCurrentPage } = ListItemsPaginated(
    `${fuelEfficiencyRoutes.byVehiclePaged}/${selectedVehicleId}`,
    pageNumberEfficiency
  );

  const handleDownload = async () => {
    try {
      const response = await fetch(`${fuelEfficiencyRoutes.downloadExcel}/${selectedVehicleId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/vnd.ms-excel",
        },
      });

      if (!response.ok) {
        throw new Error("Error al descargar el archivo");
      }

      // Crear el archivo descargable
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Crear un enlace de descarga
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `fuel-efficiency-vehicle-${selectedVehicleId}.xls`); // Nombre del archivo
      document.body.appendChild(link);
      link.click();

      // Limpiar
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
    }
  };

  return (
    <div style={{ margin: "10px", width: "90%", height: "600px", overflowX: "auto" }}>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Estado</th>
            <th>Placa</th>
            <th>Dia</th>
            <th>Hora de inicio</th>
            <th>Hora de fin</th>
            <th>Horas acumuladas</th>
            <th>Combustible inicial</th>
            <th>Combustible final</th>
            <th>Combustible Consumido</th>
            <th>Rendimiendo Combustible (x KM) </th>
            <th>Rendimiendo Combustible (gal/h) </th>
            <th>Coordenadas Final</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((d, index) => (
              <tr key={index}>
                <td>{d.fuelEfficiencyStatus}</td>
                <td>{d.licensePlate ? d.licensePlate : "."}</td>
                <td>{getDateFromTimestamp(d.startTime)}</td>
                <td>{getTimeFromTimestamp(d.startTime)}</td>
                <td>{d.endTime ? getTimeFromTimestamp(d.endTime) : "Aún no disponible"}</td>
                <td>{d.accumulatedHours ? formatTimeDecimal(d.accumulatedHours) : "Aún no disponible"}</td>
                <td>{d.initialFuel.toFixed(2)}</td>
                <td>{d.finalFuel ? d.finalFuel.toFixed(2) : "Aún no disponible"}</td>
                <td>{d.finalFuel !== "Aún no disponible" ? (d.initialFuel - d.finalFuel).toFixed(2) : "Aún no disponible"}</td>
                <td>{d.fuelEfficiency != null ? `${d.fuelEfficiency.toFixed(2)} km/gal` : "Aún no disponible"}</td>
                <td>{d.fuelConsumptionPerHour != null ? `${d.fuelConsumptionPerHour.toFixed(2)} gal/h` : "Aun no disponible"}</td>
                <td>{d.coordinates ? d.coordinates : "Aún no disponible"}</td>
              </tr>
            ))}
        </tbody>
      </Table>

      <PaginacionUtils setPageNumber={setPageNumberEfficiency} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
      <Button variant="success" onClick={handleDownload}>
        Descargar Excel
      </Button>
    </div>
  );
}
