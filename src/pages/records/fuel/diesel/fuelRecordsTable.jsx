import React, { useMemo, useRef, useState } from "react";
import { Table } from "react-bootstrap";
import { ListItemsPaginated, ListItems } from "../../../../hooks/listItems";
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
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

function toDieselGallons(valueData) {
  return valueData * 0.264172;
}

// ---- helpers para tu formato: epoch en SEGUNDOS con decimales
function epochSecondsToDate(epochSeconds) {
  if (epochSeconds == null) return null;
  const ms = Number(epochSeconds) * 1000;
  const d = new Date(ms);
  if (isNaN(d.getTime())) return null;
  return d;
}

function formatHHmm(date) {
  if (!date) return "";
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

function formatYYYYMMDD(date) {
  if (!date) return "";
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function FuelRecordsTable({ fuelType }) {
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const [pageNumber, setPageNumber] = useState(0);

  // YYYY-MM-DD
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    return formatYYYYMMDD(now);
  });

  const [dayRecords, setDayRecords] = useState([]);
  const [totalCount, setTotalCount] = useState(null);

  const [loadingChart, setLoadingChart] = useState(true);
  const [loadingCount, setLoadingCount] = useState(true);

  const lastCountKeyRef = useRef(null);
  const lastDayKeyRef = useRef(null);

  // Tabla paginada
  const { data, totalPages, currentPage, setCurrentPage } = ListItemsPaginated(
    `${fuelRecordsRoutes.byVehiclePaged}/${selectedVehicleId}`,
    pageNumber
  );

  // ===== Fetch COUNT (sin useEffect)
  const countKey = `${selectedVehicleId}`;
  if (selectedVehicleId && lastCountKeyRef.current !== countKey) {
    lastCountKeyRef.current = countKey;
    setLoadingCount(true);

    ListItems(
      `${fuelRecordsRoutes.byVehicleCount}/${selectedVehicleId}/count`,
      (n) => {
        setTotalCount(n);
        setLoadingCount(false);
      },
      () => {
        setTotalCount(null);
        setLoadingCount(false);
      }
    );
  }

  // ===== Fetch DAY RECORDS (sin useEffect)
  const tz = "America/Lima";
  const dayKey = `${selectedVehicleId}|${selectedDate}|${tz}`;
  if (selectedVehicleId && selectedDate && lastDayKeyRef.current !== dayKey) {
    lastDayKeyRef.current = dayKey;

    ListItems(
      `${fuelRecordsRoutes.byVehicleDay}/${selectedVehicleId}/day?date=${encodeURIComponent(
        selectedDate
      )}&tz=${encodeURIComponent(tz)}`,
      (records) => {
        setDayRecords(Array.isArray(records) ? records : []);
        setLoadingChart(false);
      },
      () => {
        setDayRecords([]);
        setLoadingChart(false);
      }
    );
  }

  // Chart data: cada punto = 1 registro
  const chartData = useMemo(() => {
    // ordena por timestamp por si viene desordenado
    const sorted = [...(dayRecords || [])].sort((a, b) => Number(a.createdAt) - Number(b.createdAt));

    const labels = sorted.map((r) => {
      const dt = epochSecondsToDate(r.createdAt);
      return formatHHmm(dt);
    });

    const values = sorted.map((r) => {
      const raw = r.valueData;
      if (fuelType?.fuelType === "DIESEL") return Number(toDieselGallons(raw).toFixed(2));
      return raw;
    });

    const label =
      fuelType?.fuelType === "GAS"
        ? "PSI"
        : fuelType?.fuelType === "GASOLINA"
        ? "Volumen"
        : fuelType?.fuelType === "DIESEL"
        ? "Galones"
        : "Valor";

    return {
      labels,
      datasets: [
        {
          label,
          data: values,
          tension: 0.2,
          pointRadius: 3,
          pointHoverRadius: 6,
        },
      ],
    };
  }, [dayRecords, fuelType]);

  const chartOptions = useMemo(() => {
    const unit =
      fuelType?.fuelType === "GAS"
        ? "PSI"
        : fuelType?.fuelType === "GASOLINA"
        ? "Volumen"
        : fuelType?.fuelType === "DIESEL"
        ? "gal"
        : "";

    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true },
        tooltip: {
          callbacks: {
            title: (items) => `Hora: ${items?.[0]?.label ?? ""}`,
            label: (item) => `Valor: ${item.parsed.y} ${unit}`,
          },
        },
      },
      scales: {
        x: { ticks: { autoSkip: true, maxTicksLimit: 12 } },
      },
    };
  }, [fuelType]);

  return (
    <div style={{ margin: "10px", width: "90%" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <div>
          <div style={{ fontSize: 14, opacity: 0.85 }}>Registros totales del vehículo</div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>
            {loadingCount ? "…" : totalCount ?? "—"}
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span>Día:</span>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              setLoadingChart(true);
              setSelectedDate(e.target.value);
            }}
          />
        </div>
      </div>

      {/* Chart */}
      <div
        style={{
          height: 280,
          marginTop: 12,
          marginBottom: 12,
          background: "#111",
          borderRadius: 8,
          padding: 12,
        }}
      >
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
            data.map((d, index) => {
              const dt = epochSecondsToDate(d.createdAt);
              return (
                <tr key={index}>
                  <td>{d.vehicleModel?.licensePlate}</td>
                  <td>{formatYYYYMMDD(dt)}</td>
                  <td>{formatHHmm(dt)}</td>
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
              );
            })}
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
