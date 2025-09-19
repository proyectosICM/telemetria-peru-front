import React from "react";
import { FaCar, FaGasPump, FaBell, FaPowerOff } from "react-icons/fa";
import "./FleetKpiPanel.css";

export function FleetKpiPanel() {
  // Datos de ejemplo (mock)
  const dataBus = [
    { id: 1, lastConnection: true, fuelLevel: 80, hasAlarm: false, isIgnitionOn: true },
    { id: 2, lastConnection: true, fuelLevel: 50, hasAlarm: true, isIgnitionOn: false },
    { id: 3, lastConnection: false, fuelLevel: 30, hasAlarm: false, isIgnitionOn: false },
    { id: 4, lastConnection: true, fuelLevel: 60, hasAlarm: true, isIgnitionOn: true },
  ];

  const total = dataBus.length;
  const promedioFuel =
    dataBus.reduce((sum, v) => sum + (v.fuelLevel || 0), 0) / total;
  const conAlarma = dataBus.filter((v) => v.hasAlarm).length;
  const encendidos = dataBus.filter((v) => v.isIgnitionOn).length;

  return (
    <div className="fleet-kpi-panel">
      <div className="kpi-card">
        <FaCar className="kpi-icon" />
        <h4 className="kpi-value">{total}</h4>
        <p className="kpi-label">Vehículos</p>
      </div>
      <div className="kpi-card">
        <FaPowerOff className="kpi-icon" />
        <h4 className="kpi-value">
          {encendidos}/{total}
        </h4>
        <p className="kpi-label">Encendidos</p>
      </div>
      <div className="kpi-card">
        <FaGasPump className="kpi-icon" />
        <h4 className="kpi-value">{promedioFuel.toFixed(1)}%</h4>
        <p className="kpi-label">Combustible Promedio</p>
      </div>
      <div className="kpi-card">
        <FaBell className="kpi-icon" />
        <h4 className="kpi-value">{conAlarma}</h4>
        <p className="kpi-label">Alarmas Activas</p>
      </div>
    </div>
  );
}
