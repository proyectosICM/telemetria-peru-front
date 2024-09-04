import React from "react";
import { NavbarCommon } from "../../common/navbarCommon";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function ImpactIncidentLoggingRecords() {
  const navigate = useNavigate();

  const incidentLogs = [
    { id: 1, description: "Impacto leve en el lateral derecho", time: "14:23", date: "2024-09-03" },
    { id: 2, description: "Impacto fuerte en la parte trasera", time: "11:12", date: "2024-09-04" },
    { id: 3, description: "Colisión con objeto estacionario", time: "16:45", date: "2024-09-05" },
  ];

  return (
    <div>
      <NavbarCommon />
      <Button onClick={() => navigate("/")} className="back-button">
        Atras
      </Button>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "20px auto" }}>
        <Table striped bordered hover variant="dark" style={{ margin: "20px", width: "80%" }}>
          <thead>
            <tr>
              <th>Hora</th>
              <th>Dia</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {incidentLogs.map((log) => (
            <tr key={log.id}>
              <td>{log.time}</td>
              <td>{log.date}</td>
              <td>{log.description}</td>
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
    </div>
  );
}
