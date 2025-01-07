import React from "react";
import { getDateFromTimestamp, getTimeFromTimestamp } from "../../utils/formatUtils";
import { Table } from "react-bootstrap";

export function AlarmRecordsTable({ data, error }) {
  return (
    <div style={{ margin: "10px", width: "90%" }}>
      {error && (
        <div className="error-message" style={{ color: "red", margin: "10px" }}>
          Error: {error.message || "Hubo un problema cargando los datos"}
        </div>
      )}

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Dia</th>
            <th>Hora</th>
            <th>Placa</th>
          </tr>
        </thead>
        <tbody>
          {data && !error ? (
            data.map((d, index) => (
              <tr key={index}>
                <td>{d.createdAt ? getDateFromTimestamp(d.createdAt) : "Error"}</td>
                <td>{d.createdAt ? getTimeFromTimestamp(d.createdAt) : "Error"}</td>
                <td>{d.vehicleModel && d.vehicleModel.licensePlate ? d.vehicleModel.licensePlate : "Error"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No hay datos disponibles o hubo un error al cargar los datos.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
