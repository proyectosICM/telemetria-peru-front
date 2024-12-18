import React, { useEffect, useState } from "react";
import { truckLoadRecordByVehicleCountURL, truckLoadRecordURLByVehiclePageURL } from "../../api/apiurls";
import { ListItems, ListItemsPaginated } from "../../hooks/listItems";
import { PaginacionUtils } from "../../utils/paginacionUtils";
import { getDateAndDayFromTimestamp } from "../../utils/formatUtils";
import { Table } from "react-bootstrap";

export function TruckLoadsTable() {
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  
  const [loadsCount, setLoadsCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    ListItems(`${truckLoadRecordByVehicleCountURL}/${selectedVehicleId}`, setLoadsCount)
  },[selectedVehicleId])

  const { data, totalPages, currentPage, setCurrentPage } = ListItemsPaginated(
    `${truckLoadRecordURLByVehiclePageURL}/${selectedVehicleId}`,
    pageNumber
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "20px auto", width: "100%" }}>
      <h2>Registro de cargas</h2>
      <span>Cargas realizadas en el dia {loadsCount}</span>
      <Table striped bordered hover variant="dark" style={{ margin: "20px", width: "80%" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Día y Hora</th>
            <th>Carga</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((log) => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td>{getDateAndDayFromTimestamp(log.createdAt)}</td>
                <td>{log.weight} KG</td>
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
