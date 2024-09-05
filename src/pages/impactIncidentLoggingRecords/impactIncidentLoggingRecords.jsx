import React, { useEffect, useState } from "react";
import { NavbarCommon } from "../../common/navbarCommon";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ListItemsPaginated } from "../../hooks/listItems";
import { impactIncidentLoggingByVehiclePageURL } from "../../api/apiurls";
import { getDateAndDayFromTimestamp } from "../../utils/formatUtils";

export function ImpactIncidentLoggingRecords() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const page = 0;

  useEffect(() => {
    ListItemsPaginated(`${impactIncidentLoggingByVehiclePageURL}/${selectedVehicleId}`, setData, page);
  }, [selectedVehicleId]);

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
              <th>#</th>
              <th>Dia y Hora</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((log) => (
                <tr key={log.id}>
                  <td>{log.id}</td>
                  <td>{getDateAndDayFromTimestamp(log.createdAt)}</td>
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
