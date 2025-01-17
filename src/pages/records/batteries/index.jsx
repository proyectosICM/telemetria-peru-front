import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { NavbarCommon } from "../../../common/navbarCommon";
import { BatteryInfo } from "../../../realTime/batteryInfo";
import { FaCarBattery, FaCogs } from "react-icons/fa";
import { BatteryRecordsTable } from "./tableBattery";
import { AlternatorRecordsTable } from "./tableAlternator";
import { EngineStarterRecordsTable } from "./tableEngineStarter";

export function BatteryRecords() {
  const navigate = useNavigate();
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  const [selectedDevice, setSelectedDevice] = useState("battery");
  const [engineStarter, setEngineStarter] = useState(true);

  const renderSelectedTable = () => {
    switch (selectedDevice) {
      case "battery":
        return <BatteryRecordsTable />;
      case "alternator":
        return <AlternatorRecordsTable />;
      case "engineStarter":
        return <EngineStarterRecordsTable />;
      default:
        return null;
    }
  };

  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    padding: "10px",
    margin: "10% auto ",
    textAlign: "center",
    borderRadius: "10px",
    boxShadow: engineStarter ? "0px 4px 15px rgba(0, 255, 0, 0.4)" : "0px 4px 15px rgba(235, 2, 2, 0.4)",
    cursor: "pointer",
    color: "#fff",
    backgroundColor: engineStarter ? "#4CAF50" : "rgb(255, 69, 58)", // Cambia a un rojo llamativo
    border: engineStarter ? "2px solid #008000" : "2px solid rgb(247, 240, 240)",
    animation: engineStarter ? "pulse 1.5s infinite" : "none",
  };
  const textStyle = {
    fontSize: "1em",
    fontWeight: "bold",
  };

  const iconStyle = {
    fontSize: "2.2em",
    marginBottom: "10px",
  };

  return (
    <div style={{ background: "black" }}>
      <NavbarCommon />
      <Button onClick={() => navigate("/")} className="back-button">
        Atras
      </Button>
      <div style={{ border: "2px solid #d1d0cc", margin: "20px 5%" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "20px auto" }}>
          {/* Componente Arrancador */}
          <div
            onClick={() => setSelectedDevice("engineStarter")}
            style={{
              border: "2px solid white",
              borderRadius: "5%",
              padding: "12px",
              width: "20%",
              textAlign: "center",
              margin: "0 15px",
            }}
          >
            <h5>Arrancador</h5>
            <div style={cardStyle}>
              <FaCarBattery style={iconStyle} />
              <p style={textStyle}>{engineStarter ? "En Buen estado" : "En mal estado"}</p>
            </div>
          </div>

          {/* Componente Batería */}
          <div onClick={() => setSelectedDevice("battery")}>
            <BatteryInfo vehicleId={selectedVehicleId} showAlert={false} />
          </div>

          {/* Componente Alternador */}
          <div
            onClick={() => setSelectedDevice("alternator")}
            style={{
              border: "2px solid white",
              borderRadius: "5%",
              padding: "12px",
              width: "20%",
              textAlign: "center",
              margin: "0 20px",
            }}
          >
            <h5>Alternador</h5>
            <div style={cardStyle}>
              <FaCogs style={iconStyle} />
              <p style={textStyle}>{engineStarter ? "En Buen estado" : "En mal estado"}</p>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {renderSelectedTable()}
        </div>
      </div>
    </div>
  );
}
