import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { NavbarCommon } from "../../../common/navbarCommon";
import { BatteryInfo } from "../../../realTime/batteryInfo";
import { FaCarBattery, FaCogs } from "react-icons/fa";
import { BatteryRecordsTable } from "./tableBattery";
import { AlternatorRecordsTable } from "./tableAlternator";
import { EngineStarterRecordsTable } from "./tableEngineStarter";
import { BatteriesRecordsCharts } from "./charts";
import { mqttTopics } from "../../../mqtt/mqttConfig";
import { mqttDominio } from "../../../api/apiurls";
import useMqtt from "../../../hooks/useMqtt";
import mqttDataHandler from "../../../hooks/mqttDataHandler";
import { cardBadStatusStyle, cardGoodStatusStyle, iconStyle, textStyle } from "../../../realTime/cardStyles";
import { alternatorStyleDiv, chartBatteryDiv, engineStarterStyleDiv, tableDivStyle } from "./styles";

export function BatteryRecords() {
  const navigate = useNavigate();
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  const [selectedDevice, setSelectedDevice] = useState("battery");
  const [engineStarter, setEngineStarter] = useState(true);
  const [alternator, setAlternator] = useState(false);

  const topic = `${mqttTopics.telData}${selectedVehicleId}`;
  const { messages } = useMqtt(mqttDominio, topic);

  useEffect(() => {
    mqttDataHandler(messages, setEngineStarter, "engineStarterInfo");
    mqttDataHandler(messages, setAlternator, "alternator");
  }, [messages]);

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

  return (
    <div style={{ background: "black" }}>
      <NavbarCommon />
      <Button onClick={() => navigate(-1)} className="back-button">
        Atras
      </Button>

      <div style={{ border: "2px solid #d1d0cc", margin: "20px 5%" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "20px auto" }}>
          {/* Componente Arrancador */}
          <div onClick={() => setSelectedDevice("engineStarter")} style={engineStarterStyleDiv}>
            <h5>Arrancador</h5>
            <div style={engineStarter ? cardGoodStatusStyle : cardBadStatusStyle}>
              <FaCarBattery style={iconStyle} />
              <p style={textStyle}>{engineStarter ? "En Buen estado" : "En mal estado"}</p>
            </div>
          </div>

          {/* Componente Batería */}
          <div onClick={() => setSelectedDevice("battery")}>
            <BatteryInfo vehicleId={selectedVehicleId} showAlert={false} />
          </div>

          {/* Componente Alternador */}
          <div onClick={() => setSelectedDevice("alternator")} style={alternatorStyleDiv}>
            <h5>Alternador</h5>
            <div style={alternator ? cardGoodStatusStyle : cardBadStatusStyle}>
              <FaCogs style={iconStyle} />
              <p style={textStyle}>{engineStarter ? "En Buen estado" : "En mal estado"}</p>
            </div>
          </div>
        </div>

        <div style={tableDivStyle}>{renderSelectedTable()}</div>

        <div style={chartBatteryDiv}>
          <BatteriesRecordsCharts type={selectedDevice} />
        </div>
      </div>
    </div>
  );
}
