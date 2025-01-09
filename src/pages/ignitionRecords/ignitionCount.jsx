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

  // Organizar los datos de acuerdo a la respuesta que se obtiene
  const formattedData = data
    ? [
        { label: "Día", count: data.day ? data.day.counts : 0 },
        { label: "Semana", count: data.week ? data.week.counts : 0 },
        { label: "Mes", count: data.month ? data.month.counts : 0 },
        { label: "Año", count: data.year ? data.year.counts : 0 },
      ]
    : [];

  const handleRow = (dat) => {
    console.log(dat);
  };

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
              <tr key={index} onClick={() => handleRow(d.label)}>
                <td>{d.label}</td>
                <td>{d.count}</td>
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
