import React, { useState } from "react";
import { ListItemsPaginated } from "../../hooks/listItems";
import { fuelEfficiencyByVehiclePagedURL } from "../../api/apiurls";
import { calculateHoursDifference, getDateFromTimestamp, getTimeFromTimestamp } from "../../utils/formatUtils";
import { Table } from "react-bootstrap";
import { PaginacionUtils } from "../../utils/paginacionUtils";

export function FuelEfficiencyTable() {
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const [pageNumberEfficiency, setPageNumberEfficiency] = useState(0);

  const { data, totalPages, currentPage, setCurrentPage } = ListItemsPaginated(
    `${fuelEfficiencyByVehiclePagedURL}/${selectedVehicleId}`,
    pageNumberEfficiency
  );

  const processedData = data?.map((d) => ({
    ...d,
    formattedInitialFuel: (d.initialFuel * 0.264172).toFixed(2),
    formattedFinalFuel: d.finalFuel ? (d.finalFuel * 0.264172).toFixed(2) : "Aún no disponible",
    hoursAccumulated: d.startTime && d.endTime ? calculateHoursDifference(d.startTime, d.endTime) : "Aún no disponible",
  }));

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
            <th>Combustible Consumido</th>
            <th>Rendimiendo Combustible (x KM) </th>
            <th>Rendimiendo Combustible (x h) </th>
            <th>Coordenadas Final</th>
          </tr>
        </thead>
        <tbody>
          {processedData &&
            processedData.map((d, index) => (
              <tr key={index}>
                <td>{d.fuelEfficiencyStatus}</td>
                <td>{d.vehicleModel.licensePlate}</td>
                <td>{getDateFromTimestamp(d.startTime)}</td>
                <td>{getTimeFromTimestamp(d.startTime)}</td>
                <td>{d.endTime ? getTimeFromTimestamp(d.endTime) : "Aún no disponible"}</td>
                <td>{d.hoursAccumulated}</td>
                <td>{d.formattedInitialFuel}</td>
                <td>{d.formattedFinalFuel}</td>
                <td>{(d.formattedInitialFuel - d.formattedFinalFuel).toFixed(2) }</td>
                <td>
                  {d.vehicleModel.fuelType === "DIESEL"
                    ? d.fuelEfficiency
                      ? `${(d.fuelEfficiency * 0.264172).toFixed(2)} km/gal`
                      : "Aún no disponible"
                    : d.fuelEfficiency
                    ? `${d.fuelEfficiency.toFixed(2)} km/l`
                    : "Aún no disponible"}
                </td>
                <td>{d.fuelConsumptionPerHour ? `${(d.fuelConsumptionPerHour * 0.264172).toFixed(2)} gal/h` : "Aun no disponible"}</td>
                <td>{d.coordinates ? d.coordinates : "Aún no disponible"}</td>
              </tr>
            ))}
        </tbody>
      </Table>

      <PaginacionUtils setPageNumber={setPageNumberEfficiency} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
