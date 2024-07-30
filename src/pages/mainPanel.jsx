import React from "react";
import { MapaBase } from "../maps/mapaBase";
import { GasInfo } from "./optionsPanel/gasInfo";
import { TireInfo } from "./optionsPanel/tireInfo";
import { Button } from "react-bootstrap";
import { VehicleMenuPanel } from "../common/vehicleMenuPanel";
import { VehicleInfo } from "./optionsPanel/vehicleInfo";
import { VehicleOptions } from "./optionsPanel/vehicleOptions";

export function MainPanel() {
  const buses = [
    {
      placa: "ABC123",
      longitud: -76.95769789314294,
      latitud: -12.036776926858456,
    },
    {
      placa: "DEF456",
      longitud: -76.96,
      latitud: -12.037,
    },
    {
      placa: "GHI789",
      longitud: -76.955,
      latitud: -12.035,
    },
  ];

  return (
    <div>
      <h5>Main</h5>
      <div style={{ display: "flex" }}>
        <div style={{ width: "20%", height: "900px", border: "2px solid red" }}>
          <VehicleMenuPanel />
        </div>
        <div style={{ display: "flex", flexDirection: "column", width: "80%", height: "900px", border: "2px solid red" }}>
          <div style={{ width: "100%", height: "550px", border: "3px solid red", cursor: "pointer" }}>
            <MapaBase buses={buses} />
          </div>
          <div style={{ width: "100%", height: "350px", border: "3px solid red", overflow: "auto" }}>
            <h3>Options Panel</h3>
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap", overflowX: "auto", margin: "10px 0px" }}>
              <VehicleInfo />
              <VehicleOptions />
              <GasInfo />
              <TireInfo />  
            </div>
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap", overflowX: "auto", margin: "10px 0px" }}>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
