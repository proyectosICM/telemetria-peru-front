import React, { useEffect, useState } from "react";
import { NavbarCommon } from "../../../common/navbarCommon";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ListItems } from "../../../hooks/listItems";
import { tireSensorRoutes } from "../../../api/apiurls";
import { ForkliftWith4Tires } from "../../optionsPanel/truckTiresGraphics/forkliftWith4Tires";

export function TireSensorsDetails() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  useEffect(() => {
    ListItems(`${tireSensorRoutes.byVehicle}/${selectedVehicleId}`, setData, setError);
  }, [selectedVehicleId]);

  return (
    <div className="g-background">
      <NavbarCommon />
      <Button onClick={() => navigate("/")} className="back-button">
        Atras
      </Button>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "20px auto" }}>
        <div style={{ height: "800px", width: "90%", display: "flex", justifyContent: "center", alignItems: "center", border: "2px solid #ccc", borderRadius: "10px", padding: "20px" }}>
          <ForkliftWith4Tires />
        </div>

        <h1>Registro detallados </h1>
        <Table striped bordered hover variant="dark" style={{ margin: "20px", width: "80%" }}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Pressure</th>
              <th>Temperature</th>
              <th>Battery</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((tire) => (
                <tr key={tire.id}>
                  <td>{tire.id}</td>
                  <td>{tire.identificationCode}</td>
                  <td>{tire.pressure}</td>
                  <td>{tire.temperature}</td>
                  <td>{tire.batteryLevel}</td>
                  <td>{tire.status ? "Good" : "Bad"}</td>
                </tr>
              ))}
          </tbody>
        </Table>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginTop: "20px" }}>
          {/*         <Button>Atras</Button>
          <p style={{ margin: "0" }}>Pagina 1 de 3</p>
          <Button>Siguiente</Button>*/}
        </div>
      </div>
    </div>
  );
}
