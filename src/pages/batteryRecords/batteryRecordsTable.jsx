import React from "react";
import { Button, Table } from "react-bootstrap";

export function BatteryRecordsTable({ batteries }) {
  return (
    <div style={{ flex: "1 1 45%", minWidth: "300px", margin: "2%" }}>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Voltage</th>
            <th>Status</th>
            <th>Creation Date</th> {/* Nueva columna */}
          </tr>
        </thead>
        <tbody>
          {batteries.map((battery, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{battery.name}</td>
              <td>{battery.voltage}</td>
              <td>{battery.status}</td>
              <td>{battery.creationDate}</td> {/* Fecha de creación */}
            </tr>
          ))}
        </tbody>
      </Table>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginTop: "20px" }}>
        <Button>Atras</Button>
        <p style={{ margin: "0" }}>Pagina 1 de 3</p>
        <Button>Siguiente</Button>
      </div>
    </div>
  );
}
