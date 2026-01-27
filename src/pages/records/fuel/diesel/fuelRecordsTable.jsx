import React, { useMemo, useRef, useState } from "react";
import { Table } from "react-bootstrap";
import { getDateFromTimestamp, getTimeFromTimestamp } from "../../../../utils/formatUtils";
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

export function FuelRecordsTable({ fuelType }) {
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const [pageNumber, setPageNumber] = useState(0);

  // YYYY-MM-DD
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  });

  const [dayRecords, setDayRecords] = useState([]);
  const [totalCount, setTotalCount] = useState(null);

  // loading opcional (sin useEffect)
  const [loadingChart, setLoadingChart] = useState(true);
  const [loadingCount, setLoadingCount] = useState(true);

  // refs para evitar refetch infinito (guard)
  const lastCountKeyRef = useRef(null);
  const lastDayKeyRef = useRef(null);

  // Tabla paginada (tu lógica actual)
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

    // OJO: no pongas setLoadingChart(true) aquí si te preocupa setState en render.
    // Nosotros lo seteamos al cambiar fecha (abajo) y en el primer render ya inicia true.
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
    const labels = (dayRecords || []).map((r) => getTimeFromTimestamp(r.createdAt));

    const values = (dayRecords || []).map((r) => {
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
        x: {
          ticks: { autoSkip: true, maxTicksLimit: 12 },
        },
      },
    };
  }, [fuelType]);

  return (
    <div style={{ margin: "10px", width: "90%" }}>
      {/* Header: total + selector */}
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
              // aquí sí podemos setear loading (no es render, es evento)
              setLoadingChart(true);
              setSelectedDate(e.target.value);
            }}
          />
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
