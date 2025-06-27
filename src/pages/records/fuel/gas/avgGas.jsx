import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import { Button, Form } from "react-bootstrap";
import { useGetByDate } from "../../../../api/hooks/useGasRecord";

export function AvgGas() {
  ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

  const [viewType, setViewType] = useState("day");
  const [selectedDate, setSelectedDate] = useState("");
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  // Parsear año/mes/día desde selectedDate según el tipo
  const parsedDate = new Date(selectedDate || new Date());
  const year = parsedDate.getFullYear();
  const month = viewType !== "year" ? parsedDate.getMonth() + 1 : null;
  const day = viewType === "day" ? parsedDate.getDate() : null;

  const params = {
    vehicleId: selectedVehicleId,
    viewType: viewType.toLowerCase(),
    year,
    month,
    day,
  };

  const { data: gasRecords = [], isLoading, isError } = useGetByDate(params, !!selectedVehicleId);

  const chartData = {
    labels: gasRecords.map((record) =>
      new Date(record.createdAt * 1000).toLocaleTimeString("es-PE", {
        hour: "2-digit",
        minute: "2-digit",
      })
    ),
    datasets: [
      {
        label: "Presión de gas (psi)",
        data: gasRecords.map((record) => record.lastPressureDetected),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.4)",
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text:
          viewType === "day"
            ? "Presión de gas - Vista diaria"
            : viewType === "month"
            ? "Presión de gas - Vista mensual"
            : "Presión de gas - Vista anual",
      },
    },
    scales: {
      y: { title: { display: true, text: "Presión (psi)" } },
      x: {
        title: {
          display: true,
          text: viewType === "day" ? "Hora" : viewType === "month" ? "Día" : "Mes",
        },
      },
    },
  };

  // Opciones de años para el select
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        marginTop: "20px",
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "20px",
      }}
    >
      <h1>Estadísticas de Gas</h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "15px", alignItems: "center" }}>
        <Button>Ir a día anterior</Button>

        {/* Selector de fecha según la vista */}
        {viewType === "day" && (
          <Form.Control
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ width: "180px" }}
          />
        )}

        {viewType === "month" && (
          <Form.Control
            type="month"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ width: "180px" }}
          />
        )}

        {viewType === "year" && (
          <Form.Select
            value={selectedDate}
            onChange={(e) => setSelectedDate(`${e.target.value}-01-01`)} // formatear como fecha base
            style={{ width: "120px" }}
          >
            <option value="">Seleccionar año</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </Form.Select>
        )}

        {/* Combo de tipo de vista */}
        <Form.Select
          value={viewType}
          onChange={(e) => {
            setViewType(e.target.value);
            setSelectedDate(""); // reset al cambiar
          }}
          style={{ width: "200px" }}
        >
          <option value="day">Vista de un día</option>
          <option value="month">Vista mensual</option>
          <option value="year">Vista anual</option>
        </Form.Select>
      </div>

      <Line data={chartData} options={chartOptions} />
    </div>
  );
}
