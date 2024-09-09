import React from "react";
import { Table } from "react-bootstrap";

export function TireInfoData() {
  // Datos de ejemplo para la tabla
  const tireData = [
    { id: 1, name: "Tire 1", pressure: "35 PSI", status: "Good" },
    { id: 2, name: "Tire 2", pressure: "32 PSI", status: "Low" },
    { id: 3, name: "Tire 3", pressure: "36 PSI", status: "Good" },
    { id: 4, name: "Tire 4", pressure: "33 PSI", status: "Low" },
  ]; 

  return (
    <div className="g-option-item">
      <h4>Tire Info</h4>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Pressure</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tireData.map((tire) => (
            <tr key={tire.id}>
              <td>{tire.id}</td>
              <td>{tire.name}</td>
              <td>{tire.pressure}</td>
              <td>{tire.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
