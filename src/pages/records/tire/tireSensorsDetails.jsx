import React, { useEffect, useState } from "react";
import { NavbarCommon } from "../../../common/navbarCommon";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ListItems } from "../../../hooks/listItems";
import { tireSensorRoutes } from "../../../api/apiurls";
import { ForkliftWith4Tires } from "../../optionsPanel/truckTiresGraphics/forkliftWith4Tires";
import { ForkliftWith6Tires } from "../../optionsPanel/truckTiresGraphics/forkliftWith6Tires";
import { useGetVehicleById } from "../../../api/hooks/useVehicle";
import { TruckWith4Tires } from "./../../optionsPanel/truckTiresGraphics/truckWith4Tires";
import { TruckWith6Tires } from "./../../optionsPanel/truckTiresGraphics/truckWith6Tires";
import { TruckWith8Tires } from "./../../optionsPanel/truckTiresGraphics/truckWith8Tires";
import { TruckWith12Tires } from "./../../optionsPanel/truckTiresGraphics/truckWith12Tires";
import { TruckWith16Tires } from "./../../optionsPanel/truckTiresGraphics/truckWith16Tires";
import { TruckWith10Tires } from "../../optionsPanel/truckTiresGraphics/TruckWith10Tires";
import { TruckWith14Tires } from "../../optionsPanel/truckTiresGraphics/TruckWith14Tires";
import { TruckWith6T2Tires } from "../../optionsPanel/truckTiresGraphics/TruckWith6T2Tires";
import { TruckWith8T2Tires } from "../../optionsPanel/truckTiresGraphics/TruckWith8T2Tires";

export function TireSensorsDetails() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const { data: vehicleData, isLoading, error: vehicleError } = useGetVehicleById(selectedVehicleId);
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
        <div
          style={{
            height: "800px",
            width: "90%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "2px solid #ccc",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          {vehicleData && vehicleData.vehicleTypeId === 1 && <ForkliftWith4Tires />}
          {vehicleData && vehicleData.vehicleTypeId === 2 && <ForkliftWith6Tires />}
          {vehicleData && vehicleData.vehicleTypeId === 5 && <TruckWith4Tires />}
          {vehicleData && vehicleData.vehicleTypeId === 6 && <TruckWith6Tires />}
          {vehicleData && vehicleData.vehicleTypeId === 7 && <TruckWith8Tires />}
          {vehicleData && vehicleData.vehicleTypeId === 8 && <TruckWith12Tires />}
          {vehicleData && vehicleData.vehicleTypeId === 9 && <TruckWith16Tires />}
          {vehicleData && vehicleData.vehicleTypeId === 11 && <TruckWith10Tires />}
          {vehicleData && vehicleData.vehicleTypeId === 12 && <TruckWith14Tires />}
          {vehicleData && vehicleData.vehicleTypeId === 13 && <TruckWith6T2Tires />}
          {vehicleData && vehicleData.vehicleTypeId === 14 && <TruckWith8T2Tires />}
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
                  <td>{tire.pressure !== null && tire.pressure !== undefined ? `${tire.pressure} psi` : "Sin datos"}</td>
                  <td>{tire.temperature !== null && tire.temperature !== undefined ? `${tire.temperature} °C` : "Sin datos"}</td>
                  <td>{tire.batteryLevel !== null && tire.batteryLevel !== undefined ? `${tire.batteryLevel} %` : "Sin datos"}</td>

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
