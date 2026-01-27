import React, { useEffect, useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import { getDateFromTimestamp, getTimeFromTimestamp } from "../../../../utils/formatUtils";
import { ListItemsPaginated } from "../../../../hooks/listItems";
import { fuelRecordsRoutes } from "../../../../api/apiurls";
import { PaginacionUtils } from "../../../../utils/paginacionUtils";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

// registra módulos de chartjs
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, TimeScale);

function toDieselGallons(valueData) {
  return valueData * 0.264172;
}

export function FuelRecordsTable({ fuelType }) {
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const [pageNumber, setPageNumber] = useState(0);

  // Fecha seleccionada (YYYY-MM-DD)
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  });

  const [dayRecords, setDayRecords] = useState([]);
  const [totalCount, setTotalCount] = useState(null);
  const [loadingChart, setLoadingChart] = useState(false);

  // Tabla paginada (tu lógica actual)
  const { data, totalPages, currentPage, setCurrentPage } = ListItemsPaginated(
    `${fuelRecordsRoutes.byVehiclePaged}/${selectedVehicleId}`,
    pageNumber
  );

  // Total registros del vehículo
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${fuelRecordsRoutes.byVehicleCount}/${selectedVehicleId}/count`);
        const n = await res.json();
        setTotalCount(n);
      } catch (e) {
        setTotalCount(null);
      }
    })();
  }, [selectedVehicleId]);

  // Registros del día para el gráfico (SIN paginación)
  useEffect(() => {
    (async () => {
      setLoadingChart(true);
      try {
        const tz = "America/Lima";
        const res = await fetch(
          `${fuelRecordsRoutes.byVehicleDay}/${selectedVehicleId}/day?date=${selectedDate}&tz=${tz}`
        );
        const records = await res.json();
        setDayRecords(Array.isArray(records) ? records : []);
      } catch (e) {
        setDayRecords([]);
      } finally {
        setLoadingChart(false);
      }
    })();
  }, [selectedVehicleId, selectedDate]);

  // Chart data: cada punto = 1 registro (sin promedios)
  const chartData = useMemo(() => {
    const labels = (dayRecords || []).map((r) => getTimeFromTimestamp(r.createdAt));

    const values = (dayRecords || []).map((r) => {
      const raw = r.valueData;
      if (fuelType?.fuelType === "DIESEL") return Number(toDieselGallons(raw).toFixed(2));
      return raw;
    });

    return {
      labels,
      datasets: [
        {
          label:
            fuelType?.fuelType === "GAS"
              ? "PSI"
              : fuelType?.fuelType === "GASOLINA"
              ? "Volumen"
              : fuelType?.fuelType === "DIESEL"
              ? "Galones"
              : "Valor",
          data: values,
          tension: 0.2,
          pointRadius: 3,
          pointHoverRadius: 6,
        },
      ],
    };
  }, [dayRecords, fuelType]);

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true },
        tooltip: {
          callbacks: {
            title: (items) => `Hora: ${items?.[0]?.label ?? ""}`,
            label: (item) => {
              const unit =
                fuelType?.fuelType === "GAS"
                  ? "PSI"
                  : fuelType?.fuelType === "GASOLINA"
                  ? "Volumen"
                  : fuelType?.fuelType === "DIESEL"
                  ? "gal"
                  : "";
              return `Valor: ${item.parsed.y} ${unit}`;
            },
          },
        },
      },
      scales: {
        x: {
          ticks: {
            maxRotation: 0,
            autoSkip: true,
            maxTicksLimit: 12,
          },
        },
      },
    }),
    [fuelType]
  );

  return (
    <div style={{ margin: "10px", width: "90%" }}>
      {/* Header: total + selector */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <div>
          <div style={{ fontSize: 14, opacity: 0.85 }}>Registros totales del vehículo</div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>{totalCount === null ? "…" : totalCount}</div>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span>Día:</span>
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
        </div>
      </div>

      {/* Chart */}
      <div style={{ height: 280, marginTop: 12, marginBottom: 12, background: "#111", borderRadius: 8, padding: 12 }}>
        {loadingChart ? (
          <div style={{ color: "#fff" }}>Cargando gráfico…</div>
        ) : chartData.labels.length === 0 ? (
          <div style={{ color: "#fff" }}>Sin registros para este día.</div>
        ) : (
          <Line data={chartData} options={chartOptions} />
        )}
      </div>

      {/* Tabla */}
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Placa</th>
            <th>Dia</th>
            <th>Hora</th>
            <th>
              {fuelType && fuelType.fuelType === "GAS"
                ? "PSI"
                : fuelType.fuelType === "GASOLINA"
                ? "Volumen"
                : fuelType.fuelType === "DIESEL"
                ? "Galones"
                : ""}
            </th>
          </tr>
        </thead>

        <tbody>
          {data &&
            data.map((d, index) => (
              <tr key={index}>
                <td>{d.vehicleModel.licensePlate}</td>
                <td>{getDateFromTimestamp(d.createdAt)}</td>
                <td>{getTimeFromTimestamp(d.createdAt)}</td>
                <td>
                  {fuelType && fuelType.fuelType === "DIESEL"
                    ? toDieselGallons(d.valueData).toFixed(2)
                    : d.valueData}{" "}
                  {fuelType && fuelType.fuelType === "GAS"
                    ? "PSI"
                    : fuelType.fuelType === "GASOLINA"
                    ? "Volumen"
                    : fuelType.fuelType === "DIESEL"
                    ? "gal"
                    : ""}
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
    </div>
  );
}
