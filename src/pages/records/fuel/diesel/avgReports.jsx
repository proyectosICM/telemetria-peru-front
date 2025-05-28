import React, { useState, useEffect } from "react";
import { Table, Dropdown, DropdownButton } from "react-bootstrap";
import { useFuelReportSummary } from "../../../../api/hooks/useFuelReport";
import { formatSecondsToHHMMSS } from "../../../../utils/formatUtils";

export function AvgReports() {
  // 🚗 Obtenemos el vehicleId (puede venir de localStorage o props)
  const selectedVehicleId = Number(localStorage.getItem("selectedVehicleId") || 0);

  // 🎛️ Estados para filtro
  const [selectedFilter, setSelectedFilter] = useState("Por Mes");
  const [selectedYear, setSelectedYear]     = useState("");
  const [selectedMonth, setSelectedMonth]   = useState("");
  const [selectedDay, setSelectedDay]       = useState("");

  // 📅 Listas de años, meses y días
  const currentYear  = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDay   = new Date().getDate();

  const yearsList = Array.from(
    { length: currentYear - 2020 + 1 },
    (_, i) => currentYear - i
  );
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const daysList    = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // 🔄 Al cambiar filtro, inicializamos valores
  useEffect(() => {
    if (selectedFilter === "Por Año") {
      setSelectedYear(currentYear.toString());
      setSelectedMonth("");
      setSelectedDay("");
    } else if (selectedFilter === "Por Mes") {
      setSelectedYear(currentYear.toString());
      setSelectedMonth(currentMonth.toString().padStart(2, "0"));
      setSelectedDay("");
    } else {
      // Por Día
      setSelectedYear(currentYear.toString());
      setSelectedMonth(currentMonth.toString().padStart(2, "0"));
      setSelectedDay(currentDay.toString().padStart(2, "0"));
    }
  }, [selectedFilter]);

  // 🔌 Hook con parámetros dinámicos
  const yearParam  = selectedYear ? Number(selectedYear) : null;
  const monthParam = selectedMonth ? Number(selectedMonth) : null;
  const dayParam   = selectedDay ? Number(selectedDay) : null;

  const { data: fuelReport, isLoading, isError } = 
    useFuelReportSummary(selectedVehicleId, yearParam, monthParam, dayParam);

  // ⏳ Formateo de duración
  const formatDuration = (ms) => {
    if (ms == null) return "-";
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  if (isLoading) return <div>⏳ Cargando reportes...</div>;
  if (isError)   return <div>❌ Error al cargar los reportes</div>;

  return (
    <div style={{ width: "90%", margin: "20px auto" }}>
      <h1>📊 Reportes Promedio</h1>

      {/* 🔽 Filtro principal */}
      <DropdownButton
        id="filter-dropdown"
        title={`Filtro: ${selectedFilter}`}
        onSelect={(key) => setSelectedFilter(key)}
        style={{ marginBottom: "20px" }}
      >
        <Dropdown.Item eventKey="Por Día">Por Día</Dropdown.Item>
        <Dropdown.Item eventKey="Por Mes">Por Mes</Dropdown.Item>
        <Dropdown.Item eventKey="Por Año">Por Año</Dropdown.Item>
      </DropdownButton>

      {/* 📆 Selects según filtro */}
      {selectedFilter === "Por Año" && (
        <div className="d-flex align-items-center mb-3">
          <label>📅 Año:</label>
          <select
            className="form-select ms-2"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">-- Seleccionar --</option>
            {yearsList.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      )}

      {selectedFilter === "Por Mes" && (
        <div className="d-flex align-items-center mb-3">
          <label>📅 Mes:</label>
          <select
            className="form-select ms-2"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">-- Mes --</option>
            {[
              "01","02","03","04","05","06",
              "07","08","09","10","11","12"
            ].map((m, i) => (
              <option key={m} value={m}>
                {new Date(0, i).toLocaleString("es-ES", { month: "long" })}
              </option>
            ))}
          </select>

          <label className="ms-4">📅 Año:</label>
          <select
            className="form-select ms-2"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">-- Año --</option>
            {yearsList.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      )}

      {selectedFilter === "Por Día" && (
        <div className="d-flex align-items-center mb-3">
          <label>📅 Día:</label>
          <select
            className="form-select ms-2"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            <option value="">-- Día --</option>
            {daysList.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <label className="ms-4">📅 Mes:</label>
          <select
            className="form-select ms-2"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">-- Mes --</option>
            {[
              "01","02","03","04","05","06",
              "07","08","09","10","11","12"
            ].map((m, i) => (
              <option key={m} value={m}>
                {new Date(0, i).toLocaleString("es-ES", { month: "long" })}
              </option>
            ))}
          </select>

          <label className="ms-4">📅 Año:</label>
          <select
            className="form-select ms-2"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">-- Año --</option>
            {yearsList.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      )}

      {/* 📈 Tabla de resultados */}
      {fuelReport ? (
        <Table striped bordered hover responsive variant="dark">
          <thead>
            <tr>
              <th>Métrica</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>⛽ Consumo promedio de combustible</td>
              <td>{fuelReport.averageFuelConsumption}</td>
            </tr>
            <tr>
              <td>🕒 Tiempo total en ralentí</td>
              <td>{formatSecondsToHHMMSS(fuelReport.totalIdleTime)}</td>
            </tr>
            <tr>
              <td>🚗 Tiempo total estacionado</td>
              <td>{formatSecondsToHHMMSS(fuelReport.totalParkedTime)}</td>
            </tr>
            <tr>
              <td>🏁 Tiempo total operando</td>
              <td>{formatSecondsToHHMMSS(fuelReport.totalOperatingTime)}</td>
            </tr>
          </tbody>
        </Table>
      ) : (
        <p>No hay datos disponibles para mostrar.</p>
      )}
    </div>
  );
}
