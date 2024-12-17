import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { NavbarCommon } from "../../common/navbarCommon";
import {
  fuelEfficiencyByVehicleURL,
  fuelRecordsByVehicleIdPageURL,
  fuelRecordsHourlyAVLURL,
  fuelRecordsMonthAVLURL,
  fuelRecordsWeekAVLURL,
  vehiclesURL,
} from "../../api/apiurls";
import { ListItems, ListItemsPaginated } from "../../hooks/listItems";
import { PaginacionUtils } from "../../utils/paginacionUtils";
import { FuelInfo } from "../mainPanel/optionsPanel/fuelInfo";
import { FuelRecordsTable } from "./fuelRecordsTable";
import { ChartComponent } from "../../common/chartComponent";
import { FuelEfficiencyTable } from "./fuelEfficiencyTable";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function FuelRecords() {
  const navigate = useNavigate();
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const [pageNumber, setPageNumber] = useState(0);
  const [pageNumberEfficiency, setPageNumberEfficiency] = useState(0);
  const [fuelEfficiency, setFuelEfficiency] = useState();

  const [vehicleData, setVehicleData] = useState(null);
  const [hourlyAVL, setHourlyAVL] = useState();
  const [weekAVL, setWeeklyAVL] = useState();
  const [monthAVL, setMonthAVL] = useState();
  const [yearAVL, setYearAVL] = useState();

  //const [weekAVL, setWeeklyAVL] = useState();
  //console.log(vehicleData)
  const layout = "side-by-side";

  useEffect(() => {
    ListItems(`${vehiclesURL}/${selectedVehicleId}`, setVehicleData);
  }, [selectedVehicleId]);

  useEffect(() => {
    ListItems(`${fuelRecordsHourlyAVLURL}/${selectedVehicleId}`, setHourlyAVL);
  }, [selectedVehicleId]);

  useEffect(() => {
    ListItems(`${fuelRecordsWeekAVLURL}/${selectedVehicleId}`, setWeeklyAVL);
  }, [selectedVehicleId]);

  useEffect(() => {
    ListItems(`${fuelRecordsMonthAVLURL}/${selectedVehicleId}`, setMonthAVL);
  }, [selectedVehicleId]);

  // Datos de ejemplo para el gráfico de líneas
  // Datos de ejemplo para el gráfico
  const lineChartData = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"], // Eje X
    datasets: [
      {
        label: "Ralenti",
        data: [3, 2.5, 3.2, 3.5, 3.8, 4], // Valores para Ralenti
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
      {
        label: "Operación",
        data: [4.2, 4.5, 4.7, 5, 5.3, 5.5], // Valores para Operación
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
      },
      {
        label: "Estacionado",
        data: [1.5, 1.7, 1.6, 1.8, 2, 2.1], // Valores para Estacionado
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  // Opciones del gráfico
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Promedio de Combustible por Estado",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Meses",
        },
      },
      y: {
        title: {
          display: true,
          text: "Valor Promedio",
        },
      },
    },
  };

  const { data, totalPages, currentPage, setCurrentPage } = ListItemsPaginated(`${fuelRecordsByVehicleIdPageURL}/${selectedVehicleId}`, pageNumber);

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
    labels: weekAVL?.map((record) => new Date(record.day).toLocaleDateString()),
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
    labels: monthAVL?.map((record) => new Date(record.day).toLocaleDateString()),
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

  return (
    <div className="g-background">
      <NavbarCommon />
      <Button onClick={() => navigate("/")} className="back-button">
        Atras
      </Button>
      <div style={{ border: "2px solid #d1d0cc", margin: "5px 10%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "20px auto",
          }}
        >
          <FuelInfo vehicleId={selectedVehicleId} showAlert={false} />
          {/** Eficiencia */}
          <FuelEfficiencyTable />

          <div
            style={{
              margin: "10px",
              width: "90%",
              //border: "3px solid red",
              display: "flex", // Flexbox para alinearlos horizontalmente
              justifyContent: "space-between", // Espaciado entre los elementos
              alignItems: "center", // Alineación vertical
            }}
          >
            {/* Tabla en la primera sección */}
            <div style={{ width: "50%" }}>
              <h3>Enero</h3>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Estado</th>
                    <th>Tiempo</th>
                    <th>R. Combustible (x KM)</th>
                    <th>R. Combustible (x h)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>OPERACION</td>
                    <td>01/2024</td>
                    <td>3.50</td>
                    <td>3.50</td>
                  </tr>
                  <tr>
                    <td>RALENTI</td>
                    <td>01/2024</td>
                    <td>3.50</td>
                    <td>3.50</td>
                  </tr>
                  <tr>
                    <td>ESTACIONADO</td>
                    <td>01/2024</td>
                    <td>3.50</td>
                    <td>3.50</td>
                  </tr>
                </tbody>
              </Table>
              <Button>Mes anterior</Button>
              <p>1 de </p>

              <Button>Mes Siguiente</Button>
            </div>
            {/* Gráfico en la segunda sección */}
            <div style={{ width: "40%", padding: "10px" }}>
              <Line data={lineChartData} options={lineChartOptions} />
            </div>
          </div>
          {/** Fin Eficiencia */}
          {vehicleData && <FuelRecordsTable data={data} fuelType={vehicleData} />}
          <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
          <h1>Estadísticas</h1>
          <div style={{ width: "100%", height: "400px", display: "flex" }}>
            <ChartComponent data={hourlyChartData} options={hourlyChartOptions} layout={layout} />
            <ChartComponent data={weeklyChartData} options={weeklyChartOptions} layout={layout} />
          </div>
          <div style={{ width: "100%", height: "400px", display: "flex" }}>
            {monthAVL && <ChartComponent data={monthlyChartData} options={monthlyChartOptions} layout={layout} />}
            <ChartComponent data={weeklyChartData} options={weeklyChartOptions} layout={layout} />
          </div>
        </div>
      </div>
    </div>
  );
}
