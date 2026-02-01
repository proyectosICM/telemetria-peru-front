import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListItems } from "../../../../hooks/listItems";
import { vehicleRoutes } from "../../../../api/apiurls";
import { FuelInfo } from "../../../../realTime/fuelInfo";
import { AvgResults } from "./avgResults";
import { FuelEfficiencyTable } from "./fuelEfficiencyTable";
import { AvgFuelEfficiency } from "./avgFuelEfficiency";
import { FuelCharts } from "./fuelCharts";
import { FuelRecordsTable } from "./fuelRecordsTable";
import { FuelReportsTable } from "./fuelReportsTable";
import { AvgReports } from "./avgReports";
import { FuelRecordsCharts } from "./fuelRecordsCharts";
import { FuelTheftAlertsTable } from "./fuelTheftAlertsTable";

export function DieselComponent() {
  const navigate = useNavigate();
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  const [vehicleData, setVehicleData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    ListItems(`${vehicleRoutes.base}/${selectedVehicleId}`, setVehicleData, setError);
  }, [selectedVehicleId]);

  return (
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

      {/*    
         <AvgResults />
 <FuelEfficiencyTable /> */}

      {/* 
      <AvgReports />
      <FuelReportsTable />
      <AvgFuelEfficiency />
      */}

      <FuelRecordsCharts />
      {vehicleData && <FuelRecordsTable fuelType={vehicleData} />}
      {/* 
      <FuelEfficiencyTable />
      <FuelTheftAlertsTable />
      */}
      <h1>Estadísticas</h1>
      <FuelCharts />
    </div>
  );
}
