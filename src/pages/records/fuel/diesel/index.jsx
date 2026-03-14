import React, { useEffect, useState } from "react";
import { ListItems } from "../../../../hooks/listItems";
import { vehicleRoutes } from "../../../../api/apiurls";
import { FuelInfo } from "../../../../realTime/fuelInfo";
import { FuelEfficiencyTable } from "./fuelEfficiencyTable";
import { FuelCharts } from "./fuelCharts";
import { FuelRecordsTable } from "./fuelRecordsTable";
import { FuelRecordsCharts } from "./fuelRecordsCharts";

export function DieselComponent() {
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  const [vehicleData, setVehicleData] = useState(null);
  const [, setError] = useState(null);

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
      <FuelEfficiencyTable />
      <FuelRecordsCharts fuelType={vehicleData} />
      {vehicleData && <FuelRecordsTable fuelType={vehicleData} />}
      <h1>Estadísticas</h1>
      <FuelCharts />
    </div>
  );
}
