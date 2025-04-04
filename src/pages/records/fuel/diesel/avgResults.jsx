import React, { useState, useEffect } from "react";
import { Table, Dropdown, DropdownButton } from "react-bootstrap";
import { ListItems } from "../../../../hooks/listItems";
import { formatTimeDecimal } from "../../../../utils/formatUtils";
import { fuelEfficiencyRoutes } from "../../../../api/apiurls";

export function AvgResults() {
  const [selectedFilter, setSelectedFilter] = useState("Por Mes");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
 
  useEffect(() => {
    let url = `${fuelEfficiencyRoutes.summary}/${selectedVehicleId}`;
    const params = new URLSearchParams(); 

    if (selectedYear) params.append("year", selectedYear);
    if (selectedMonth) params.append("month", selectedMonth);
    if (selectedDay) params.append("day", selectedDay);

    // Agregar los parámetros a la URL
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    console.log(url);
    // Llamar a la API con la URL construida
    ListItems(url, setData, setError);
  }, [selectedVehicleId, selectedYear, selectedMonth, selectedDay]);

  // Generar lista de años desde el actual hasta 2020
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // Los meses en JavaScript van de 0 a 11
  const currentDay = new Date().getDate();
  const yearsList = Array.from({ length: currentYear - 2020 + 1 }, (_, i) => currentYear - i);

  // Generar lista de días del mes actual
  const daysInCurrentMonth = new Date(currentYear, currentMonth, 0).getDate();
  const daysList = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1);

  // Actualizar el valor predeterminado al cambiar el filtro
  useEffect(() => {
    if (selectedFilter === "Por Año") {
      setSelectedYear(currentYear.toString());
    } else if (selectedFilter === "Por Mes") {
      setSelectedMonth(currentMonth.toString().padStart(2, "0")); // Formato 01, 02...
      setSelectedYear(currentYear.toString());
    } else if (selectedFilter === "Por Día") {
      setSelectedYear(currentYear.toString());
      setSelectedMonth(currentMonth.toString().padStart(2, "0"));
      setSelectedDay(currentDay.toString());
    }
  }, [selectedFilter]);

  // Manejar la selección del filtro principal
  const handleSelect = (eventKey) => {
    setSelectedFilter(eventKey);
    setSelectedYear("");
    setSelectedMonth("");
    setSelectedDay("");
  };

  // Manejar selección de año
  const handleYearSelect = (event) => {
    setSelectedYear(event.target.value);
  };

  // Manejar selección de mes
  const handleMonthSelect = (event) => {
    setSelectedMonth(event.target.value);
  };

  // Manejar selección de día
  const handleDaySelect = (event) => {
    setSelectedDay(event.target.value);
  };

  return (
    <div style={{ width: "90%" }}>
      <h1>Resultados</h1>

      {/* Dropdown para seleccionar el filtro */}
      <DropdownButton id="filter-dropdown" title={`Filtro: ${selectedFilter}`} onSelect={handleSelect} style={{ marginBottom: "20px" }}>
        <Dropdown.Item eventKey="Por Día">Por Día</Dropdown.Item>
        <Dropdown.Item eventKey="Por Mes">Por Mes</Dropdown.Item>
        <Dropdown.Item eventKey="Por Año">Por Año</Dropdown.Item>
      </DropdownButton>

      {/* Dropdown adicional para años, meses o días */}
      {selectedFilter === "Por Año" && (
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="year-select">Seleccionar Año:</label>
          <select id="year-select" value={selectedYear} onChange={handleYearSelect} style={{ marginLeft: "10px" }}>
            <option value="">-- Seleccionar Año --</option>
            {yearsList.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedFilter === "Por Mes" && (
        <div style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
          <label htmlFor="month-select">Seleccionar Mes:</label>
          <select id="month-select" value={selectedMonth} onChange={handleMonthSelect} style={{ marginLeft: "10px" }}>
            <option value="">-- Seleccionar Mes --</option>
            <option value="01">Enero</option>
            <option value="02">Febrero</option>
            <option value="03">Marzo</option>
            <option value="04">Abril</option>
            <option value="05">Mayo</option>
            <option value="06">Junio</option>
            <option value="07">Julio</option>
            <option value="08">Agosto</option>
            <option value="09">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </select>

          {/* Selector de año junto al mes */}
          <label htmlFor="year-select" style={{ marginLeft: "20px" }}>
            Seleccionar Año:
          </label>
          <select id="year-select" value={selectedYear} onChange={handleYearSelect} style={{ marginLeft: "10px" }}>
            <option value="">-- Seleccionar Año --</option>
            {yearsList.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedFilter === "Por Día" && (
        <div style={{ marginBottom: "20px" }}>
          {/* Selector de día */}
          <label htmlFor="day-select" style={{ marginLeft: "20px" }}>
            Seleccionar Día:
          </label>
          <select id="day-select" value={selectedDay} onChange={handleDaySelect} style={{ marginLeft: "10px" }}>
            <option value="">-- Seleccionar Día --</option>
            {daysList.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>

          <label htmlFor="month-select" style={{ marginLeft: "20px" }}>
            Seleccionar Mes:
          </label>
          <select id="month-select" value={selectedMonth} onChange={handleMonthSelect} style={{ marginLeft: "10px" }}>
            <option value="">-- Seleccionar Mes --</option>
            <option value="01">Enero</option>
            <option value="02">Febrero</option>
            <option value="03">Marzo</option>
            <option value="04">Abril</option>
            <option value="05">Mayo</option>
            <option value="06">Junio</option>
            <option value="07">Julio</option>
            <option value="08">Agosto</option>
            <option value="09">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </select>

          {/* Selector de año junto al mes */}
          <label htmlFor="year-select" style={{ marginLeft: "20px" }}>
            Seleccionar Año:
          </label>
          <select id="year-select" value={selectedYear} onChange={handleYearSelect} style={{ marginLeft: "10px" }}>
            <option value="">-- Seleccionar Año --</option>
            {yearsList.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      )}

      <Table striped bordered hover variant="dark">
        <thead>
          <tr> 
            <th>Estado</th>
            <th>Tiempo (h)</th>
            <th>Combustible Consumido (gal)</th>
            <th>Rendimiento Combustible (gal/h) </th>
          </tr>
        </thead>
        <tbody>
          {/* Iterar sobre los datos recibidos y mostrarlos en la tabla */}
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.status}</td>
              <td>{formatTimeDecimal(item.totalHours)}</td>
              <td>{item.totalFuelConsumed.toFixed(2)}</td>
              <td>{item.avgFuelEfficiency.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
