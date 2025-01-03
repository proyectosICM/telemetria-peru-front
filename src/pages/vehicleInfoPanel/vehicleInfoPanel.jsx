import React, { useEffect, useState } from "react";
import { NavbarCommon } from "../../common/navbarCommon";
import { useNavigate } from "react-router-dom";
import { vehiclesURL } from "../../api/apiurls";
import { ListItems } from "../../hooks/listItems";
import { Button } from "react-bootstrap";
import { SpeedExcessTable } from "./speedExcessTable";
import { TruckLoadsTable } from "./truckLoadsTable";
import { TruckDailyCountLoadTable } from "./truckDailyCountLoadTable";

export function VehicleInfoPanel() {
  const navigate = useNavigate();
  const [vehicleData, setVehicleData] = useState([]);

  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  useEffect(() => {
    ListItems(`${vehiclesURL}/${selectedVehicleId}`, setVehicleData);
  }, [selectedVehicleId]);

  return (
    <div>
      <NavbarCommon />
      <Button onClick={() => navigate("/")} className="back-button">
        Atras
      </Button>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "20px auto" }}>
        <h2>Informacion del vehiculo</h2>
        <p>
          <strong> Placa:</strong> {vehicleData && vehicleData.licensePlate} | <strong> Tipo de vehículo: </strong>
          {vehicleData && vehicleData.vehicleTypeName}
        </p>
        <p>Velocidad maxima definida: {vehicleData && vehicleData.maxSpeed ? vehicleData.maxSpeed : "No registra"} </p>
        <TruckLoadsTable /> 
        <TruckDailyCountLoadTable />
        <SpeedExcessTable />
      </div>
    </div>
  );
}
