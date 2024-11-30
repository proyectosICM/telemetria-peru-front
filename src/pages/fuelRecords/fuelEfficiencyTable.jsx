import React, { useState } from "react";
import { ListItemsPaginated } from "../../hooks/listItems";
import { fuelEfficiencyByVehiclePagedURL } from "../../api/apiurls";
import { getDateFromTimestamp, getTimeFromTimestamp } from "../../utils/formatUtils";
import { Table } from "react-bootstrap";
import { PaginacionUtils } from "../../utils/paginacionUtils";

export function FuelEfficiencyTable() {
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const [pageNumberEfficiency, setPageNumberEfficiency] = useState(0);

  const { data, totalPages, currentPage, setCurrentPage } = ListItemsPaginated(
    `${fuelEfficiencyByVehiclePagedURL}/${selectedVehicleId}`,
    pageNumberEfficiency
  );

  return (
    <div style={{ margin: "10px", width: "90%" }}>
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
            <th>Coordenadas</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((d, index) => (
              <tr key={index}>
                <td>{d.fuelEfficiencyStatus}</td>
                <td>{d.vehicleModel.licensePlate}</td>
                <td>{getDateFromTimestamp(d.startTime)} </td>
                <td>
                  {getTimeFromTimestamp(d.startTime)}
                </td>
                <td>
                   {getDateFromTimestamp.endTime ? getTimeFromTimestamp(d.endTime): "Aun no disponible"}
                </td>
                <td>{d.accumulatedHours ? d.accumulatedHours : "Aun no disponible" }</td>
                <td>{d.initialFuel} L</td>
                <td>{d.finalFuel ? `${d.finalFuel} L` : "Aun no disponible" }</td>
                <td>{d.coordinates ? d.coordinates : "Aun no disponible" }</td>
              </tr>
            ))}
        </tbody>
      </Table>

      <PaginacionUtils setPageNumber={setPageNumberEfficiency} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
