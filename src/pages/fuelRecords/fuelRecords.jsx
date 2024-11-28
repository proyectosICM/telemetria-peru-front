import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { NavbarCommon } from "../../common/navbarCommon";
import { fuelEfficiencyByVehicleURL, fuelRecordsByVehicleIdPageURL, fuelRecordsHourlyAVLURL, fuelRecordsWeekAVLURL, vehiclesURL } from "../../api/apiurls";
import { ListItems, ListItemsPaginated } from "../../hooks/listItems";
import { PaginacionUtils } from "../../utils/paginacionUtils";
import { FuelInfo } from "../mainPanel/optionsPanel/fuelInfo";
import { FuelRecordsTable } from "./fuelRecordsTable";
import { ChartComponent } from "../../common/chartComponent";
import { FuelEfficiencyTable } from "./fuelEfficiencyTable";

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
    ListItems(`${fuelRecordsWeekAVLURL}/${selectedVehicleId}`, setWeeklyAVL);
  }, [selectedVehicleId]);

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

          <FuelEfficiencyTable />
          {vehicleData && <FuelRecordsTable data={data} fuelType={vehicleData} />}
          <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />

          <h1>Estadísticas</h1>
          <div style={{ width: "100%", height: "400px", display: "flex" }}>
            <ChartComponent data={hourlyChartData} options={hourlyChartOptions} layout={layout} />
            <ChartComponent data={weeklyChartData} options={weeklyChartOptions} layout={layout} />
          </div>
        </div>
      </div>
    </div>
  );
}
