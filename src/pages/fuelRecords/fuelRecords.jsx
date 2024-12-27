import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { NavbarCommon } from "../../common/navbarCommon";
import { vehiclesURL } from "../../api/apiurls";
import { ListItems } from "../../hooks/listItems";
import { FuelInfo } from "../mainPanel/optionsPanel/fuelInfo";
import { FuelRecordsTable } from "./fuelRecordsTable";
import { FuelEfficiencyTable } from "./fuelEfficiencyTable";
import { AvgFuelEfficiency } from "./avgFuelEfficiency";
import { AvgResults } from "./avgResults";
import { FuelCharts } from "./fuelCharts";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function FuelRecords() {
  const navigate = useNavigate();
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  const [vehicleData, setVehicleData] = useState(null);

  useEffect(() => {
    ListItems(`${vehiclesURL}/${selectedVehicleId}`, setVehicleData);
  }, [selectedVehicleId]);

  return (
    <div className="g-background">
      <NavbarCommon />
      <Button onClick={() => navigate("/")} className="back-button">
        Atras
      </Button>
      <div style={{ border: "2px solid #d1d0cc", margin: "5px 5%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "20px auto",
          }}
        >
          <FuelInfo vehicleId={selectedVehicleId} showAlert={false} />

          <AvgResults />

          <FuelEfficiencyTable />

          <AvgFuelEfficiency />

          {vehicleData && <FuelRecordsTable fuelType={vehicleData} />}
          <h1>Estadísticas</h1>
          <FuelCharts />
        </div>
      </div>
    </div>
  );
}
