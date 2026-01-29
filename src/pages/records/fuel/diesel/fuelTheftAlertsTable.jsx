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
      vehicleId: selectedVehicleId ? Number(selectedVehicleId) : undefined,
      size: 20,
      // period/date opcionales si luego quieres filtrar por día/semana/mes/año
    });

  return (
    <div style={{ margin: "10px", width: "90%" }}>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Vehículo</th>
            <th>Día</th>
            <th>Hora</th>
            <th>Mensaje</th>
          </tr>
        </thead>

        <tbody>
          {pageError ? (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                Error cargando alertas
              </td>
            </tr>
          ) : Array.isArray(data) && data.length > 0 ? (
            data.map((a, index) => (
              <tr key={a.id ?? index}>
                <td>{a.licensePlate ?? "-"}</td>
                <td>{a.detectedAt ? getDateFromTimestamp(a.detectedAt) : "-"}</td>
                <td>
                  {a.detectedAt
                    ? getTimeFromTimestampWithSeconds(a.detectedAt)
                    : "-"}
                </td>
                <td>{a.message ?? "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
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
