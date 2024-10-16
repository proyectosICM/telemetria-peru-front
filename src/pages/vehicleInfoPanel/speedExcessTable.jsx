import React, { useState } from "react";
import { ListItemsPaginated } from "../../hooks/listItems";
import { speedExcessLoggerByVehiclePageURL } from "../../api/apiurls";
import { PaginacionUtils } from "../../utils/paginacionUtils";
import { getDateAndDayFromTimestamp } from "../../utils/formatUtils";
import { Table } from "react-bootstrap";

export function SpeedExcessTable() {
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const [pageNumber, setPageNumber] = useState(0);

  const { data, totalPages, currentPage, setCurrentPage } = ListItemsPaginated(
    `${speedExcessLoggerByVehiclePageURL}/${selectedVehicleId}`,
    pageNumber
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "20px auto", width: "100%" }}>
      <h2>Registro de excesos de velocidad</h2>
      <Table striped bordered hover variant="dark" style={{ margin: "20px", width: "80%" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Día y Hora</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((log) => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td>{getDateAndDayFromTimestamp(log.createdAt)}</td>
                <td>{log.description}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No hay datos disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
