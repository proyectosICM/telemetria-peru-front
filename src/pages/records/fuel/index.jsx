import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { vehicleRoutes } from "../../../api/apiurls";
import { NavbarCommon } from "../../../common/navbarCommon";
import { ListItems } from "../../../hooks/listItems";
import { DieselComponent } from "./diesel";
import { GasComponent } from "./gas";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function FuelRecords() {
  const navigate = useNavigate();
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  const [vehicleData, setVehicleData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    ListItems(`${vehicleRoutes.base}/${selectedVehicleId}`, setVehicleData, setError);
  }, [selectedVehicleId]);  

  return (
    <div className="g-background">
      <NavbarCommon />
      <Button onClick={() => navigate(-1)} className="back-button">
        Atras
      </Button>

      <div style={{ border: "2px solid #d1d0cc", margin: "5px 5%" }}>
        {vehicleData && vehicleData.fuelType === "DIESEL" && <DieselComponent />}
        {vehicleData && vehicleData.fuelType === "GAS" && <GasComponent />}
      </div>
    </div>
  );
}  
 