import React from "react";
import { Table } from "react-bootstrap";

export function GasChangesCounts() {

  return (
    <div style={{ margin: "10px", width: "90%" }}>
      <h3>Registros de cambio de gas</h3>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Perido</th>
            <th>Cantidad de cambios</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Hoy</td>
            <td>--</td>
          </tr>
          <tr>
            <td>Semana</td>
            <td>--</td>
          </tr>
          <tr>
            <td>Mes</td>
            <td>--</td>
          </tr>
          <tr>
            <td>Año</td>
            <td>--</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
