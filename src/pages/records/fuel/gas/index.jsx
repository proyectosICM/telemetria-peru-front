import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TrackingRecordsTable } from "./trackingRecordsTable";
import { GasChangesRecordsTable } from "./gasChangesRecordsTable";
import { GasChangesCounts } from "./gasChangesCount";

export function GasComponent() {
  const navigate = useNavigate();
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

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
      <h1>Gas Component</h1>
 
      <GasChangesCounts />

      <GasChangesRecordsTable />

      {/*              */}
      <TrackingRecordsTable />
    </div>
  );
}
