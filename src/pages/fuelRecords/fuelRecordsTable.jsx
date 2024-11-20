import React from "react";
import { Table } from "react-bootstrap";
import { getDateFromTimestamp, getTimeFromTimestamp } from "../../utils/formatUtils";

export function FuelRecordsTable({ data, fuelType }) {

  return (
    <div style={{ margin: "10px", width: "90%" }}> 
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Dia</th>
            <th>Hora</th>
            <th>Placa</th>
            <th>{fuelType && fuelType.fuelType === "GAS " ? "Presion" : "Volumen"}</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((d, index) => (
              <tr key={index}>
                <td>{d.id}</td>
                <td>{getDateFromTimestamp(d.createdAt)}</td>
                <td>{getTimeFromTimestamp(d.createdAt)}</td>
                <td>{d.vehicleModel.licensePlate}</td>
                <td>
                  {fuelType && fuelType.fuelType === "DIESEL" ? (d.valueData * 0.264172).toFixed(2) : d.valueData}{" "}
                  {fuelType && fuelType.fuelType === "GAS " ? "psi" : "volumen"}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
