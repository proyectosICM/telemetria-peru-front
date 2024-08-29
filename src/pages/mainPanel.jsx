import React, { useState } from "react";
import { MapaBase } from "../maps/mapaBase";
import { GasInfo } from "./optionsPanel/gasInfo";
import { TireInfo } from "./optionsPanel/tireInfo";
import { VehicleMenuPanel } from "../common/vehicleMenuPanel";
import { VehicleInfo } from "./optionsPanel/vehicleInfo";
import { VehicleOptions } from "./optionsPanel/vehicleOptions";
import "./mainPanel.css";
import { NavbarCommon } from "../common/navbarCommon";
import { LogoutToken } from "../hooks/logoutToken";

export function MainPanel() {
  LogoutToken();

  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  const buses = [
    {
      placa: "ABC12223",
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

  const handleSelectVehicle = (id) => {
    setSelectedVehicleId(id);
  };

  return (
    <div>
      <NavbarCommon />

      <div className="main-panel-container">
        <div className="sidebar">
          <VehicleMenuPanel onSelectVehicle={handleSelectVehicle} />
        </div>
        <div className="main-content">
          <div className="map-container">
            <MapaBase buses={buses} />
          </div>
          {selectedVehicleId ? (
            <div className="options-panel">
              <h3>Options Panel</h3>
              <div className="options-panel-content">
                <VehicleInfo vehicleId={selectedVehicleId} />
                <VehicleOptions vehicleId={selectedVehicleId} />
                <GasInfo vehicleId={selectedVehicleId} />
                <TireInfo vehicleId={selectedVehicleId} />
              </div>
              <div className="options-panel-content"></div>
            </div>
          ) : (
            <div className="no-vehicle-selected">
              <h1>Por favor, seleccione un vehículo para ver las opciones.</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
