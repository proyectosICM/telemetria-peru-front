import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { alternatorRoutes } from "../../../api/apiurls";
import { ListItemsPaginated } from "../../../hooks/listItems";
import { Table } from "react-bootstrap";
import { getDateFromTimestamp, getTimeFromTimestamp } from "../../../utils/formatUtils";
import { PaginacionUtils } from "../../../utils/paginacionUtils";
import { BatteriesRecordsCharts } from "./charts";

export function AlternatorRecordsTable() {
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const [pageNumber, setPageNumber] = useState(0);

  const { data, totalPages, currentPage, setCurrentPage, pageError } = ListItemsPaginated(
    `${alternatorRoutes.byVehiclePaged}/${selectedVehicleId}`,
    pageNumber
  );

  return (
    <div style={{ flex: "1 1 45%", minWidth: "300px", margin: "2%" }}>
      
      {pageError && (
        <div className="error-message" style={{ color: "red", margin: "10px" }}>
          Error: {pageError.message || "Hubo un problema cargando los datos"}
        </div>
      )}

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Dia</th>
            <th>Hora</th>
            <th>Voltaje</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data && !pageError ? (
            data.map((d, index) => (
              <tr key={d.id}>
                <td>{d.createdAt ? getDateFromTimestamp(d.createdAt) : "No data"}</td>
                <td>{d.createdAt ? getTimeFromTimestamp(d.createdAt) : "No data"}</td>
                <td>{d.voltage ? `${d.voltage} v` : "No data"}</td>
                <td>Good</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay datos disponibles.</td>
            </tr>
          )}
        </tbody>
      </Table>
      <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
