import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { ListItemsPaginated } from "../../../../hooks/listItems";
import { fuelTheftAlertsRoutes } from "../../../../api/apiurls";
import { PaginacionUtils } from "../../../../utils/paginacionUtils";
import {
  getDateFromTimestamp,
  getTimeFromTimestampWithSeconds,
} from "../../../../utils/formatUtils";

export function FuelTheftAlertsTable() {
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const [pageNumber, setPageNumber] = useState(0);

  const { data, totalPages, currentPage, setCurrentPage, pageError } =
    ListItemsPaginated(fuelTheftAlertsRoutes.base, pageNumber, {
      vehicleId: selectedVehicleId, // <-- por vehículo
      size: 20,
      // status: "OPEN", // opcional si luego filtras
      // period/date NO los mandamos (tabla general)
    });

  return (
    <div style={{ margin: "10px", width: "90%" }}>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Placa</th>
            <th>Día</th>
            <th>Hora</th>
            <th>Estado</th>
            <th>Tipo</th>
            <th>Mensaje</th>
          </tr>
        </thead>

        <tbody>
          {pageError ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>
                Error cargando alertas
              </td>
            </tr>
          ) : data && data.length > 0 ? (
            data.map((a, index) => (
              <tr key={a.id ?? index}>
                <td>{a.vehicleModel?.licensePlate ?? "-"}</td>
                <td>{a.detectedAt ? getDateFromTimestamp(a.detectedAt) : "-"}</td>
                <td>
                  {a.detectedAt
                    ? getTimeFromTimestampWithSeconds(a.detectedAt)
                    : "-"}
                </td>
                <td>{a.status ?? "-"}</td>
                <td>{a.type ?? a.alertType ?? "-"}</td>
                <td>{a.message ?? a.description ?? "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>
                Sin alertas
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <PaginacionUtils
        setPageNumber={setPageNumber}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
