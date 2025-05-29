import React, { useEffect, useState } from "react";
import { NavbarCommon } from "../../../common/navbarCommon";
import { useNavigate } from "react-router-dom";
import { vehicleRoutes } from "../../../api/apiurls";
import { ListItems } from "../../../hooks/listItems";
import { Button } from "react-bootstrap";
import { SpeedExcessTable } from "./speedExcessTable";
import { TruckLoadsTable } from "./truckLoadsTable";
import { TruckDailyCountLoadTable } from "./truckDailyCountLoadTable";
import { FaCarSide, FaIdBadge, FaTruck, FaFlagCheckered, FaArrowLeft, FaTachometerAlt } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";

export function VehicleInfoPanel() {
  const navigate = useNavigate();
  const [vehicleData, setVehicleData] = useState([]);
  const [error, setError] = useState(null);

  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  useEffect(() => {
    ListItems(`${vehicleRoutes.base}/${selectedVehicleId}`, setVehicleData, setError);
  }, [selectedVehicleId]);

  return (
    <div className="g-background">
      <NavbarCommon />
      <Button onClick={() => navigate(-1)} className="back-button">
        <FaArrowLeft style={{ marginRight: "5px" }} /> Atras
      </Button>

      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "20px auto" }}>
        <h2> <FaCircleInfo style={{ marginRight: "10px" }} /> Informacion del vehiculo</h2>

        {error && (
          <div className="error-message" style={{ color: "red", margin: "10px" }}>
            Error: {error.message || "Hubo un problema cargando los datos"}
          </div>
        )}

        <p>
          <strong> <FaIdBadge style={{ marginRight: "5px" }} /> Placa:</strong> {vehicleData && vehicleData.licensePlate} | <strong> <FaTruck style={{ marginRight: "5px" }} /> Tipo de vehículo: </strong>
          {vehicleData && vehicleData.vehicleTypeName}
        </p>
        <p><FaTachometerAlt style={{ marginRight: "5px" }} /> Velocidad maxima definida: {vehicleData && vehicleData.maxSpeed ? `${vehicleData.maxSpeed} km/h` : "No registra"} </p>
        <SpeedExcessTable />
        <TruckLoadsTable />
        <TruckDailyCountLoadTable />
      </div>
    </div>
  );
}
