import React, { useEffect, useState } from "react";
import { NavbarCommon } from "../../common/navbarCommon";
import { Button, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BatteryInfo } from "../optionsPanel/batteryInfo";
import { BatteryRecordsTable } from "./batteryRecordsTable";
import { ListItems } from "../../hooks/listItems";
import { batteryByVehicleIdURL } from "../../api/apiurls";

export function BatteryRecords() {
  const navigate = useNavigate();
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  const [dataBattery, setDataBattery] = useState([]);
  const [error, setError] = useState(null);
  const [selectedBattery, setSelectedBattery] = useState(null);

  useEffect(() => {
    ListItems(`${batteryByVehicleIdURL}/${selectedVehicleId}`, setDataBattery, setError);
  }, [selectedVehicleId]);

  useEffect(() => {
    if (dataBattery.length > 0 && !selectedBattery) {
      setSelectedBattery(dataBattery[0].id); // Selecciona la primera batería como predeterminada
    }
  }, [dataBattery, selectedBattery]);

  return (
    <div style={{ background: "black" }}>
      <NavbarCommon />
      <Button onClick={() => navigate("/")} className="back-button">
        Atras
      </Button>
      <div style={{ border: "2px solid #d1d0cc", margin: "20px 5%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "20px auto",
          }}
        >
          <BatteryInfo vehicleId={selectedVehicleId} showAlert={false} />
        </div>

        <ButtonGroup className="mb-3">
          {dataBattery.map((battery) => (
            <Button
              key={battery.id}
              variant={selectedBattery === battery.id ? "primary" : "secondary"} // Comparación por ID
              onClick={() => setSelectedBattery(battery.id)}
            >
              Batería {battery.name}
            </Button>
          ))}
        </ButtonGroup>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {selectedBattery && <BatteryRecordsTable batteryId={selectedBattery} />}
        </div>
      </div>
    </div>
  );
}
