import React from "react";
import { NavbarCommon } from "../../common/navbarCommon";
import { RecordsPanelItem } from "./recordsPanelItem";
import { FaClipboardCheck, FaBatteryFull, FaGasPump, FaTachometerAlt } from "react-icons/fa"; // Asegúrate de importar los íconos necesarios

export function RecordsPanel() {
  return (
    <div className="g-background">
      <NavbarCommon />

      <div style={{ height: "90vh", border: "2px solid white", padding:"20px" }}>
        <h1>¿Qué registros generales desea ver?</h1>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
          <RecordsPanelItem icon={FaClipboardCheck} title="Ver registro general de checklist" route="/checklist-registro" />
          <RecordsPanelItem icon={FaBatteryFull} title="Ver registros generales de baterías" route="/baterias-registro" />
          <RecordsPanelItem icon={FaTachometerAlt} title="Ver registros generales de neumáticos" route="/neumaticos-registro" />
          <RecordsPanelItem icon={FaGasPump} title="Ver registros generales de gas" route="/gas-registro" />
        </div>
      </div>
    </div>
  );
}
