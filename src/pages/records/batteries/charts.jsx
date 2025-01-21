import React, { useEffect, useState } from "react";
import { ListItems } from "../../../hooks/listItems";
import { alternatorRoutes, batteryRecordsRoutes, engineStarterRoutes } from "../../../api/apiurls";
import { Line } from "react-chartjs-2";
import { getDateFromTimestamp } from "../../../utils/formatUtils";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { months } from "../../../utils/months";

export function BatteriesRecordsCharts({ type }) {
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const [avgData, setAvgData] = useState([]);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const handleYearSelect = (eventKey) => {
    setSelectedYear(Number(eventKey));
  };

  const handleMonthSelect = (eventKey) => {
    setSelectedMonth(Number(eventKey));
  };

  // Generar los años dinámicamente
  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3];

  useEffect(() => {
    setData([]);

    const fetchData = (route, avgKey) => {
      ListItems(`${route}/${selectedVehicleId}?year=${selectedYear}${selectedMonth !== 0 ? `&month=${selectedMonth}` : ""}`, setData, setError);
      setAvgData(avgKey);
    };

    if (selectedVehicleId) {
      const config = {
        alternator: { route: alternatorRoutes.countsByDays, avgKey: "averageVoltage" },
        battery: { route: batteryRecordsRoutes.countsByDays, avgKey: "averageVoltage" },
        engineStarter: { route: engineStarterRoutes.countsByDays, avgKey: "averageCurrent" },
      };

      const selectedConfig = config[type];
      if (selectedConfig) {
        fetchData(selectedConfig.route, selectedConfig.avgKey);
      }
    }
  }, [selectedVehicleId, type, selectedYear, selectedMonth]);

  // Procesa los datos para el gráfico
  const chartData = {
    datasets: [
      {
        label: "Counts",
        data: data.map((item) => ({
          x: getDateFromTimestamp(item.day),
          y: item[avgData],
        })),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        pointRadius: 5,
      },
    ],
  };

  // Opciones para personalizar el gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: `Battery Records Scatter Plot - ${selectedYear} ${
          selectedMonth !== 0 ? `, ${months.find((m) => m.value === selectedMonth)?.label}` : ""
        }`,
      },
    },
    scales: {
      x: {
        type: "category",
        labels: data.map((item) => getDateFromTimestamp(item.day)),
        title: {
          display: true,
          text: "Day",
        },
      },
      y: {
        title: {
          display: true,
          text: "Counts",
        },
      },
    },
  };

  return (
    <div>
      <h1>Graficos</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "20px" }}>
        <DropdownButton id="year-dropdown" title={`Año: ${selectedYear}`} onSelect={handleYearSelect}>
          {years.map((year) => (
            <Dropdown.Item key={year} eventKey={year}>
              {year}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <DropdownButton
          id="month-dropdown"
          title={`Mes: ${months.find((m) => m.value === selectedMonth)?.label || "Selecciona un mes"}`}
          onSelect={handleMonthSelect}
        >
          {months.map((month) => (
            <Dropdown.Item key={month.value} eventKey={month.value}>
              {month.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
      {error && <p>Error: {error.message}</p>}
      {data.length > 0 ? (
        <Line
          data={chartData}
          options={options}
          style={{ width: "80%", height: "400px", border: "2px solid white", borderRadius: "20px", margin: "25px" }}
        />
      ) : (
        <p>No hay datos para graficar...</p>
      )}
    </div>
  );
}
