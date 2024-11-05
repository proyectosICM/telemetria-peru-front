import React, { useState } from "react";
import { ListItemsPaginated } from "../../hooks/listItems";
import { speedExcessLoggerByVehiclePageURL, truckLoadRecordByVehicleCountAllURL } from "../../api/apiurls";
import { PaginacionUtils } from "../../utils/paginacionUtils";
import { getDateAndDayFromTimestamp, getDateFromTimestamp } from "../../utils/formatUtils";
import { Table } from "react-bootstrap";

export function TruckDailyCountLoadTable() {
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const [pageNumber, setPageNumber] = useState(0);

  const { data, totalPages, currentPage, setCurrentPage } = ListItemsPaginated(
    `${truckLoadRecordByVehicleCountAllURL}/${selectedVehicleId}`,
    pageNumber
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "20px auto", width: "100%" }}>
      <h2>Registro de cargas diarias</h2>
      <Table striped bordered hover variant="dark" style={{ margin: "20px", width: "80%" }}>
        <thead>
          <tr>
            <th>Día</th>
            <th>Cantiddad de cargas</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((log, index) => (
              <tr key={index}>
                <td>{new Date(log.day).toLocaleDateString()}</td>
                <td>{log.count}</td>
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
