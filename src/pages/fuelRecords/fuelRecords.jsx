import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { NavbarCommon } from "../../common/navbarCommon";

import {
  fuelRecordsByVehicleIdPageURL,
  fuelRecordsHourlyAVLURL,
  vehiclesURL,
} from "../../api/apiurls";
import { ListItems, ListItemsPaginated } from "../../hooks/listItems";
import { getDateFromTimestamp, getTimeFromTimestamp } from "../../utils/formatUtils";
import { PaginacionUtils } from "../../utils/paginacionUtils";
import { FuelInfo } from "../mainPanel/optionsPanel/fuelInfo";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function FuelRecords() {
  const navigate = useNavigate();
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const [pageNumber, setPageNumber] = useState(0);

  const [vehicleData, setVehicleData] = useState(null);
  const [hourlyAVL, setHourlyAVL] = useState();

  useEffect(() => {
    ListItems(`${vehiclesURL}/${selectedVehicleId}`, setVehicleData);
  }, [selectedVehicleId]);

  useEffect(() => {
    ListItems(`${fuelRecordsHourlyAVLURL}/${selectedVehicleId}`, setHourlyAVL);
  }, [selectedVehicleId]);

  const { data, totalPages, currentPage, setCurrentPage } = ListItemsPaginated(
    `${fuelRecordsByVehicleIdPageURL}/${selectedVehicleId}`,
    pageNumber
  );

  // Preparar los datos del gráfico a partir de hourlyAVL
  const chartData = {
    labels: hourlyAVL?.map((record) => new Date(record.hour).toLocaleTimeString()), // Convertir a hora legible
    datasets: [
      {
        label: "Promedio de Combustible (litros/psi)",
        data: hourlyAVL?.map((record) =>
          vehicleData && vehicleData.fuelType === "DIESEL"
            ? (record.averageValue * 0.264172).toFixed(2)
            : record.averageValue
        ),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Promedio de Combustible por Hora",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Hora",
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
          <Table striped bordered hover variant="dark" style={{ margin: "10px", width: "90%" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Dia</th>
                <th>Hora</th>
                <th>Placa</th>
                <th>{vehicleData && vehicleData.fuelType === "GAS " ? "Presion" : "Volumen"}</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((d, index) => (
                  <tr key={index}>
                    <td>{d.id}</td>
                    <td>{getDateFromTimestamp(d.createdAt)}</td>
                    <td>{getTimeFromTimestamp(d.createdAt)}</td>
                    <td>{d.vehicleModel.licensePlate}</td>
                    <td>
                      {vehicleData && vehicleData.fuelType === "DIESEL"
                        ? (d.valueData * 0.264172).toFixed(2)
                        : d.valueData}{" "}
                      {vehicleData && vehicleData.fuelType === "GAS " ? "psi" : "volumen"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>

          <PaginacionUtils
            setPageNumber={setPageNumber}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalPages={totalPages}
          />

          <h1>Estadisticas</h1>

          {/* Componente del gráfico */}
          <div
            style={{
              width: "80%",
              margin: "20px auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
