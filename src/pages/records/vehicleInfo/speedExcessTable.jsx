import React, { useState } from "react";
import { ListItemsPaginated } from "../../../hooks/listItems";
import { speedExcessLoggerRoutes } from "../../../api/apiurls";
import { PaginacionUtils } from "../../../utils/paginacionUtils";
import { getDateAndDayFromTimestamp } from "../../../utils/formatUtils";
import { Table } from "react-bootstrap";
import { FaCalendarAlt, FaRegFileAlt, FaTachometerAlt } from "react-icons/fa";

export function SpeedExcessTable() {
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  const [pageNumber, setPageNumber] = useState(0);

  const { data, totalPages, currentPage, setCurrentPage } = ListItemsPaginated(
    `${speedExcessLoggerRoutes.byVehiclePaged}/${selectedVehicleId}`,
    pageNumber
  );
 
  return (
    <div style={{ display: "flex",  flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "20px auto", width: "100%" }}>
      <h2><FaTachometerAlt style={{ marginRight: "10px" }} /> Registro de excesos de velocidad</h2>
      <Table striped bordered hover variant="dark" style={{ margin: "20px", width: "90%" }}>
        <thead>
          <tr>
            {/*<th>#</th>*/} 
            <th><FaCalendarAlt /> Día y Hora</th>
            <th><FaRegFileAlt /> Descripción</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((log) => (
              <tr key={log.id}>
                {/*<td>{log.id}</td>*/}
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
