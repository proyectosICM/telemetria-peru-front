import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ListItemsPaginated } from "../../../../hooks/listItems";
import { gasChangesRoutes } from "../../../../api/apiurls";
import { PaginacionUtils } from "../../../../utils/paginacionUtils";
import { getDateFromTimestamp, getTimeFromTimestamp } from "../../../../utils/formatUtils";

export function GasChangesRecordsTable() {
  const navigate = useNavigate();
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const [pageNumber, setPageNumber] = useState(0);

  // Hook para obtener los datos paginados
  const { data, totalPages, currentPage, setCurrentPage, pageError } = ListItemsPaginated(
    `${gasChangesRoutes.byVehiclePaged}/${selectedVehicleId}`,
    pageNumber
  );

  // Helper para convertir timestamps UNIX a una fecha legible
  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
    <div style={{ margin: "10px", width: "90%" }}>
      <h3>Registros de cambio de gas</h3>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Hora detección baja presión</th>
            <th>Presión antes del cambio (psi)</th>
            <th>Hora realización del cambio</th>
            <th>Presión después del cambio (psi)</th>
            <th>Placa del vehículo</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{getDateFromTimestamp(record.createdAt)}</td>
                <td>{getDateFromTimestamp(record.createdAt) + " - " +  getTimeFromTimestamp(record.createdAt) }</td>
                <td>{record.pressureBeforeChange}</td>
                <td>{record.changePerformedAt ? getDateFromTimestamp(record.changePerformedAt) + " - " + getTimeFromTimestamp(record.changePerformedAt) : "No dispobible"}</td>
                <td>{record.pressureAfterChange ? record.pressureAfterChange : "No disponible"}</td>
                <td>{record.vehicleModel?.licensePlate || "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                {pageError ? "Error al cargar los datos" : "No hay registros disponibles"}
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Controles de paginación */}
      <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
