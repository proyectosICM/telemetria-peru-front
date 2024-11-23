import React from "react";
import { Table } from "react-bootstrap";
import { getDateFromTimestamp, getTimeFromTimestamp } from "../../utils/formatUtils";

export function FuelRecordsTable({ data, fuelType }) {
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
    </div>
  );
}
