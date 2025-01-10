import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ListItems } from "../../hooks/listItems";
import { ignitionCountingURL } from "../../api/apiurls";

export function IgnitionCount() {
  const navigate = useNavigate();
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedVehicleId) {
      ListItems(`${ignitionCountingURL}/${selectedVehicleId}`, setData, setError);
    }
  }, [selectedVehicleId]);

  const formattedData = data
    ? [
        { label: "Día", count: data.day ? data.day.counts : 0 },
        { label: "Semana", count: data.week ? data.week.counts : 0 },
        { label: "Mes", count: data.month ? data.month.counts : 0 },
        { label: "Año", count: data.year ? data.year.counts : 0 },
      ]
    : [];

  return (
    <div style={{ margin: "10px", width: "90%" }}>
      <h1>Conteo de Encendidos</h1>

      {error && (
        <div className="error-message" style={{ color: "red", margin: "10px" }}>
          Error: {error.message || "Hubo un problema cargando los datos"}
        </div>
      )}

      <Table striped bordered hover variant="dark" onClick={() => navigate("/ignition-Details")}>
        <thead>
          <tr>
            <th>Periodo</th>
            <th>Cantidad de Encendidos</th>
          </tr>
        </thead>
        <tbody>
          {formattedData.length > 0 ? (
            formattedData.map((d, index) => (
              <tr key={index}>
                <td>{d.label ? d.label : "Error"}</td>
                <td>{d.count ? d.count : "Error"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No hay datos disponibles o hubo un error al cargar los datos.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
