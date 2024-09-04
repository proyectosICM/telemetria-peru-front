import React from "react";
import { NavbarCommon } from "../../common/navbarCommon";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BatteryInfo } from "../optionsPanel/batteryInfo";
import { BatteryRecordsTable } from "./batteryRecordsTable";

export function BatteryRecords() {
  const navigate = useNavigate();
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  const batteryData = [
    { name: "Battery A", voltage: "12.6V", status: "Good", creationDate: "2023-09-01" },
    { name: "Battery A", voltage: "12.4V", status: "Good", creationDate: "2023-09-02" },
    { name: "Battery A", voltage: "12.1V", status: "Low", creationDate: "2023-09-03" },
    { name: "Battery D", voltage: "12.7V", status: "Good", creationDate: "2023-09-04" },
    { name: "Battery D", voltage: "12.5V", status: "Good", creationDate: "2023-09-05" },
    { name: "Battery D", voltage: "11.9V", status: "Low", creationDate: "2023-09-06" },
    { name: "Battery G", voltage: "12.8V", status: "Good", creationDate: "2023-09-07" },
    { name: "Battery G", voltage: "12.3V", status: "Good", creationDate: "2023-09-08" },
    { name: "Battery G", voltage: "11.7V", status: "Low", creationDate: "2023-09-09" },
    { name: "Battery J", voltage: "12.9V", status: "Good", creationDate: "2023-09-10" },
    { name: "Battery J", voltage: "12.2V", status: "Good", creationDate: "2023-09-11" },
    { name: "Battery J", voltage: "11.6V", status: "Low", creationDate: "2023-09-12" },
  ];

  return (
    <div style={{background:"black"}}>
      <NavbarCommon />
      <Button onClick={() => navigate("/")} className="back-button">
        Atras
      </Button>
      <div style={{ border: "2px solid #d1d0cc", margin: "20px 10%" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "20px auto" }}>
          <BatteryInfo vehicleId={selectedVehicleId} showAlert={false} />
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", marginTop: "20px" }}>
          <BatteryRecordsTable batteries={batteryData.slice(0, 3)} />
          <BatteryRecordsTable batteries={batteryData.slice(3, 6)} />
          <BatteryRecordsTable batteries={batteryData.slice(6, 9)} />
          <BatteryRecordsTable batteries={batteryData.slice(9, 12)} />
        </div>
      </div>
    </div>
  );
}
