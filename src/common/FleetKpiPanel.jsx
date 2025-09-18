import React from "react";
import { FaCar, FaGasPump, FaBell, FaPowerOff } from "react-icons/fa";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import "./FleetKpiPanel.css";

ChartJS.register(ArcElement, Tooltip, Legend);

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
  const apagados = total - encendidos;

  // Gráfico 1: Encendidos vs Apagados
  const chartEncendidos = {
    labels: ["Encendidos", "Apagados"],
    datasets: [
      {
        data: [encendidos, apagados],
        backgroundColor: ["#4caf50", "#f44336"],
        hoverBackgroundColor: ["#66bb6a", "#e57373"],
        borderWidth: 1,
      },
    ],
  };

  // Gráfico 2: Alarmas
  const chartAlarmas = {
    labels: ["Con alarma", "Sin alarma"],
    datasets: [
      {
        data: [conAlarma, total - conAlarma],
        backgroundColor: ["#ff9800", "#9e9e9e"],
        hoverBackgroundColor: ["#ffb74d", "#bdbdbd"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      {/* Gráficos arriba */}
      <div className="charts-row">
        <div className="chart-container">
          <Doughnut data={chartEncendidos} />
          <p className="chart-label">Encendidos</p>
        </div>
        <div className="chart-container">
          <Doughnut data={chartAlarmas} />
          <p className="chart-label">Alarmas</p>
        </div>
      </div>

      {/* 🔹 Panel KPI */}
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
    </div>
  );
}
