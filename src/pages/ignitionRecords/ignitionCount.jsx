import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ListItems } from "../../hooks/listItems";
import { ignitionCountingURL } from "../../api/apiurls";
import { getDateFromTimestamp } from "../../utils/formatUtils";

export function IgnitionCount() {
  const navigate = useNavigate();

  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    if (selectedVehicleId) {
      ListItems(`${ignitionCountingURL}/${selectedVehicleId}`, setData, setError);
    }
  }, [selectedVehicleId]);

  return (
    <div style={{ margin: "10px", width: "90%" }}>
      <h1>Ignition Count</h1>

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Dia</th>
            <th>Cantidad de encendidos</th>
          </tr>
        </thead>
        <tbody>
          {data && !error ? (
            data.map((d, index) => (
              <tr key={index}>
                <td>{d.date && d.date}</td>
                <td>{d.count && d.count}</td>
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
