// src/common/FleetKpiPanel.jsx
import React from "react";
import { FaCar, FaGasPump, FaBell, FaPowerOff } from "react-icons/fa";
import "./FleetKpiPanel.css";

export function FleetKpiPanel({ dataBus = [] }) {
  // Si no viene nada o no es array, usamos array vacío
  const buses = Array.isArray(dataBus) ? dataBus : [];

  const total = buses.length || 0;

  // Intentamos sacar nivel de combustible de varios posibles campos
  const getFuelLevel = (v) =>
    v.fuelLevel ??
    v.snapshotFuelLevel ??
    v.snapshotFuelPercent ??
    v.snapshotFuel ??
    0;

  // Intentamos detectar alarma
  const getHasAlarm = (v) =>
    v.hasAlarm ?? v.snapshotAlarmStatus ?? v.alarmActive ?? false;

  // Intentamos detectar ignición encendida
  const getIgnitionOn = (v) =>
    v.isIgnitionOn ?? v.snapshotIgnitionStatus ?? v.ignitionOn ?? false;

  const promedioFuel =
    total > 0
      ? buses.reduce((sum, v) => sum + (getFuelLevel(v) || 0), 0) / total
      : 0;

  const conAlarma = buses.filter((v) => getHasAlarm(v)).length;
  const encendidos = buses.filter((v) => getIgnitionOn(v)).length;

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
