import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getDateFromTimestamp, getTimeFromTimestamp } from "../../../../utils/formatUtils";
import { ListItems, ListItemsPaginated } from "../../../../hooks/listItems";
import { fuelRecordsRoutes } from "../../../../api/apiurls";
import { PaginacionUtils } from "../../../../utils/paginacionUtils";

export function FuelRecordsTable({ fuelType }) {
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const [pageNumber, setPageNumber] = useState(0);

  const [vehicleData, setVehicleData] = useState(null);

  const { data, totalPages, currentPage, setCurrentPage } = ListItemsPaginated(
    `${fuelRecordsRoutes.byVehiclePaged}/${selectedVehicleId}`,
    pageNumber
  ); 

  return (
    <div style={{ margin: "10px", width: "90%" }}>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Placa</th>
            <th>Dia</th>
            <th>Hora</th> 
            <th>
              {fuelType && fuelType.fuelType === "GAS"
                ? "PSI"
                : fuelType.fuelType === "GASOLINA" 
                ? "Volumen"
                : fuelType.fuelType === "DIESEL"
                ? "Galones"
                : ""}
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((d, index) => (
              <tr key={index}>
                <td>{d.vehicleModel.licensePlate}</td>
                <td>{getDateFromTimestamp(d.createdAt)}</td>
                <td>{getTimeFromTimestamp(d.createdAt)}</td>
                <td>
                  {fuelType && fuelType.fuelType === "DIESEL" ? (d.valueData * 0.264172).toFixed(2) : d.valueData}{" "}
                  {fuelType && fuelType.fuelType === "GAS"
                    ? "PSI"
                    : fuelType.fuelType === "GASOLINA"
                    ? "Volumen"
                    : fuelType.fuelType === "DIESEL"
                    ? "gal"
                    : ""}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
