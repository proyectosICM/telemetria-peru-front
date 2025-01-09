import React, { useEffect, useState } from "react";
import { ListItems } from "../../hooks/listItems";
import { fuelRecordsHourlyAVLURL, fuelRecordsMonthAVLURL, fuelRecordsWeekAVLURL, fuelRecordsYearAVLURL, vehiclesURL } from "../../api/apiurls";
import { ChartComponent } from "../../common/chartComponent";

export function FuelCharts() {
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const [error, setError] = useState(null);
  const [vehicleData, setVehicleData] = useState(null);
  const [hourlyAVL, setHourlyAVL] = useState();
  const [weekAVL, setWeeklyAVL] = useState();
  const [monthAVL, setMonthAVL] = useState();
  const [yearAVL, setYearAVL] = useState();

  const layout = "side-by-side";

  useEffect(() => {
    ListItems(`${vehiclesURL}/${selectedVehicleId}`, setVehicleData, setError);
  }, [selectedVehicleId]);

  useEffect(() => {
    ListItems(`${fuelRecordsHourlyAVLURL}/${selectedVehicleId}`, setHourlyAVL, setError);
  }, [selectedVehicleId]);

  useEffect(() => {
    ListItems(`${fuelRecordsWeekAVLURL}/${selectedVehicleId}`, setWeeklyAVL, setError);
  }, [selectedVehicleId]);

  useEffect(() => {
    ListItems(`${fuelRecordsMonthAVLURL}/${selectedVehicleId}`, setMonthAVL, setError);
  }, [selectedVehicleId]);

  useEffect(() => {
    ListItems(`${fuelRecordsYearAVLURL}/${selectedVehicleId}`, setYearAVL, setError);
  }, [selectedVehicleId]);

  const parseDate = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    // Convertir a UTC pero sin ajustarlo al cambio de zona horaria, usando la fecha local.
    const date = new Date(year, month - 1, day);
    return date; // Deja el objeto Date intacto, pero sin hacer conversión a UTC
  };

  // Función para parsear meses, también normalizando a UTC
  const parseMonth = (dateString) => {
    const [year, month] = dateString.split("-").map(Number);
    // Convertir a UTC (sin necesidad de días, solo el mes y año)
    const date = new Date(year, month - 1, 1);
    return date;
  };

  // Datos del gráfico por hora
  const hourlyChartData = {
    labels: hourlyAVL?.map((record) => new Date(record.hour).toLocaleTimeString()),
    datasets: [
      {
        label: "Promedio de Combustible por hora",
        data: hourlyAVL?.map((record) =>
          vehicleData && vehicleData.fuelType === "DIESEL" ? (record.averageValue * 0.264172).toFixed(2) : record.averageValue
        ),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const hourlyChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Promedio de Combustible por Hora" },
    },
    scales: {
      x: { title: { display: true, text: "Hora" } },
      y: { title: { display: true, text: "Valor Promedio" } },
    },
  };

  // Datos del gráfico por semana
  const weeklyChartData = {
    labels: weekAVL?.map((record) => parseDate(record.day).toLocaleDateString()),
    datasets: [
      {
        label: "Promedio de Combustible por semana",
        data: weekAVL?.map((record) =>
          vehicleData && vehicleData.fuelType === "DIESEL" ? (record.averageValue * 0.264172).toFixed(2) : record.averageValue
        ),
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
      },
    ],
  };

  const weeklyChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Promedio de Combustible por semana" },
    },
    scales: {
      x: { title: { display: true, text: "Día" } },
      y: { title: { display: true, text: "Valor Promedio" } },
    },
  };

  // Datos del gráfico por mes
  const monthlyChartData = {
    labels: monthAVL?.map((record) => parseDate(record.day).toLocaleDateString()),
    datasets: [
      {
        label: "Promedio de Combustible por Mes",
        data: monthAVL?.map((record) =>
          vehicleData && vehicleData.fuelType === "DIESEL" ? (record.averageValue * 0.264172).toFixed(2) : record.averageValue
        ),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const monthlyChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Promedio de Combustible por Mes" },
    },
    scales: {
      x: { title: { display: true, text: "Fecha" } },
      y: { title: { display: true, text: "Valor Promedio" } },
    },
  };

  const yearlyChartData = {
    labels: yearAVL?.map((record) => {
      // Crear una fecha con el mes y año para mostrar ambos
      const date = parseMonth(`${record.month}-01`); // Usamos el primer día del mes
      const monthName = date.toLocaleString("default", { month: "long" }); // Obtén el nombre del mes
      const year = date.getFullYear(); // Obtén el año
      return `${monthName} ${year}`; // Concatenar mes y año
    }),
    datasets: [
      {
        label: "Promedio de Combustible por Año",
        data: yearAVL?.map((record) =>
          vehicleData && vehicleData.fuelType === "DIESEL" ? (record.averageValue * 0.264172).toFixed(2) : record.averageValue
        ),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };

  const yearlyChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Promedio de Combustible por Año" },
    },
    scales: {
      x: { title: { display: true, text: "Año" } },
      y: { title: { display: true, text: "Valor Promedio" } },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div style={{ width: "100%", height: "400px", display: "flex" }}>
        <ChartComponent data={hourlyChartData} options={hourlyChartOptions} layout={layout} />
        <ChartComponent data={weeklyChartData} options={weeklyChartOptions} layout={layout} />
      </div>
      <div style={{ width: "100%", height: "400px", display: "flex" }}>
        {monthAVL && <ChartComponent data={monthlyChartData} options={monthlyChartOptions} layout={layout} />}
        {yearAVL && <ChartComponent data={yearlyChartData} options={yearlyChartOptions} layout={layout} />}
      </div>
    </div>
  );
}
