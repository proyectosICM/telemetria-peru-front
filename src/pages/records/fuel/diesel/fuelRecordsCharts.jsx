import React, { useEffect, useMemo, useState } from "react";
import { fuelRecordsRoutes } from "../../../../api/apiurls";
import { ListItems } from "../../../../hooks/listItems";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function toDieselGallons(valueData) {
  return valueData * 0.264172;
}

function epochSecondsToMs(epochSeconds) {
  const ms = Number(epochSeconds) * 1000;
  return Number.isFinite(ms) ? ms : null;
}

// ---- helpers fecha/hora
function pad2(n) {
  return String(n).padStart(2, "0");
}

function fmtTimeHHmmssFromMs(ms) {
  const d = new Date(ms);
  if (isNaN(d.getTime())) return "";
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
}

function fmtDayTimeFromMs(ms) {
  const d = new Date(ms);
  if (isNaN(d.getTime())) return "";
  return `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)} ${pad2(d.getHours())}:${pad2(
    d.getMinutes()
  )}`;
}

// "YYYY-MM-DD" -> Date local (00:00)
function parseYMDToDateLocal(ymd) {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1, 0, 0, 0, 0);
}

// Date -> "YYYY-MM-DDTHH:mm:ss" (sin timezone)
function toLocalIsoNoTz(date) {
  const y = date.getFullYear();
  const m = pad2(date.getMonth() + 1);
  const d = pad2(date.getDate());
  const hh = pad2(date.getHours());
  const mm = pad2(date.getMinutes());
  const ss = pad2(date.getSeconds());
  return `${y}-${m}-${d}T${hh}:${mm}:${ss}`;
}

// merge sin duplicados por id
function mergeById(prevArr, incomingArr) {
  const map = new Map();
  (Array.isArray(prevArr) ? prevArr : []).forEach((r) => map.set(r.id, r));
  (Array.isArray(incomingArr) ? incomingArr : []).forEach((r) => map.set(r.id, r));
  return Array.from(map.values());
}

export function FuelRecordsCharts({ fuelType }) {
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  // selector de periodo: day | week | month | year
  const [period, setPeriod] = useState("day");

  // YYYY-MM-DD base
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = pad2(now.getMonth() + 1);
    const dd = pad2(now.getDate());
    return `${yyyy}-${mm}-${dd}`;
  });

  // calcula range start/end según period
  const { startIso, endIso } = useMemo(() => {
    const base = parseYMDToDateLocal(selectedDate);

    if (period === "day") {
      return { startIso: null, endIso: null };
    }

    if (period === "week") {
      const start = new Date(base);
      start.setDate(start.getDate() - 6);
      const end = new Date(base);
      end.setDate(end.getDate() + 1); // exclusivo
      return { startIso: toLocalIsoNoTz(start), endIso: toLocalIsoNoTz(end) };
    }

    if (period === "month") {
      const start = new Date(base.getFullYear(), base.getMonth(), 1, 0, 0, 0);
      const end = new Date(base.getFullYear(), base.getMonth() + 1, 1, 0, 0, 0); // exclusivo
      return { startIso: toLocalIsoNoTz(start), endIso: toLocalIsoNoTz(end) };
    }

    // year
    const start = new Date(base.getFullYear(), 0, 1, 0, 0, 0);
    const end = new Date(base.getFullYear() + 1, 0, 1, 0, 0, 0); // exclusivo
    return { startIso: toLocalIsoNoTz(start), endIso: toLocalIsoNoTz(end) };
  }, [selectedDate, period]);

  const url = useMemo(() => {
    const tz = "America/Lima";
    if (!selectedVehicleId) return null;

    if (period === "day") {
      return `${fuelRecordsRoutes.byVehicleDay}/${selectedVehicleId}/day?date=${selectedDate}&tz=${encodeURIComponent(
        tz
      )}`;
    }

    return `${fuelRecordsRoutes.byVehicleRange}/${selectedVehicleId}/range?start=${encodeURIComponent(
      startIso
    )}&end=${encodeURIComponent(endIso)}&tz=${encodeURIComponent(tz)}`;
  }, [selectedVehicleId, period, selectedDate, startIso, endIso]);

  useEffect(() => {
    if (!url) return;

    ListItems(
      url,
      (incoming) => {
        setData(Array.isArray(incoming) ? incoming : []);
        setError(null);
      },
      setError
    );
  }, [url]);

  // polling cada 60s SOLO en day
  useEffect(() => {
    if (!url) return;
    if (period !== "day") return;

    const intervalId = setInterval(() => {
      ListItems(
        url,
        (incoming) => {
          setData((prev) => mergeById(prev, incoming));
          setError(null);
        },
        setError
      );
    }, 60_000);

    return () => clearInterval(intervalId);
  }, [url, period]);

  const { chartData, chartOptions, debug } = useMemo(() => {
    const arr = Array.isArray(data) ? data : [];

    const points = arr
      .map((r) => {
        const x = epochSecondsToMs(r.createdAt);
        if (x == null) return null;

        let y = Number(r.valueData);
        if (!Number.isFinite(y)) return null;

        if (fuelType?.fuelType === "DIESEL") y = Number(toDieselGallons(y).toFixed(2));

        return { x, y, id: r.id };
      })
      .filter(Boolean)
      .sort((a, b) => a.x - b.x);

    const unit =
      fuelType?.fuelType === "GAS"
        ? "PSI"
        : fuelType?.fuelType === "GASOLINA"
          ? "Volumen"
          : fuelType?.fuelType === "DIESEL"
            ? "gal"
            : "";

    const datasetLabel =
      fuelType?.fuelType === "GAS"
        ? "PSI"
        : fuelType?.fuelType === "GASOLINA"
          ? "Volumen"
          : fuelType?.fuelType === "DIESEL"
            ? "Galones"
            : "Valor";

    // Para barras: labels en X (Category)
    // Si hay muchos puntos, mostramos menos labels (pero mantenemos todas las barras)
    const labels = points.map((p) =>
      period === "day" ? fmtTimeHHmmssFromMs(p.x) : fmtDayTimeFromMs(p.x)
    );
    const values = points.map((p) => p.y);

    // Reduce “ruido” en labels: muestra 1 de cada N
    const maxTicks = period === "day" ? 10 : 12;
    const step = labels.length > maxTicks ? Math.ceil(labels.length / maxTicks) : 1;

    return {
      debug: { rawLen: arr.length, pointsLen: points.length, sample: points.slice(0, 3) },
      chartData: {
        labels,
        datasets: [
          {
            label: datasetLabel,
            data: values,
            backgroundColor: "#00B0FF",
            borderWidth: 0,
            hoverBackgroundColor: "rgba(79,195,247,1)",
            hoverBorderColor: "rgba(255,255,255,0.9)",
            barPercentage: 0.9,
            categoryPercentage: 0.9,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        plugins: {
          legend: { display: true, labels: { color: "#fff" } },
          tooltip: {
            callbacks: {
              title: (items) => {
                const idx = items?.[0]?.dataIndex ?? 0;
                return labels[idx] ? `Fecha/Hora: ${labels[idx]}` : "";
              },
              label: (item) => `Valor: ${item.raw} ${unit}`,
            },
          },
        },
        scales: {
          x: {
            type: "category",
            ticks: {
              color: "#fff",
              maxRotation: 0,
              autoSkip: false,
              callback: function (val, index) {
                // muestra 1 de cada "step"
                return index % step === 0 ? this.getLabelForValue(val) : "";
              },
            },
            grid: { display: false },
          },
          y: {
            ticks: { color: "#fff" },
            grid: { color: "rgba(255,255,255,0.08)" },
          },
        },
      },
    };
  }, [data, fuelType, period]);

  return (
    <div style={{ width: "90%", margin: "10px auto" }}>
      <h1>Estadísticas</h1>

      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
        <span>Periodo:</span>
        <select value={period} onChange={(e) => setPeriod(e.target.value)} style={{ padding: "4px 8px" }}>
          <option value="day">Día</option>
          <option value="week">Semana</option>
          <option value="month">Mes</option>
          <option value="year">Año</option>
        </select>

        <span>Fecha base:</span>
        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />

        <div style={{ marginLeft: "auto", color: "#fff" }}>
          Total registros: {Array.isArray(data) ? data.length : 0}
        </div>
      </div>

      {error && <div style={{ color: "red" }}>Error cargando datos</div>}

      <div style={{ height: 340, background: "#111", borderRadius: 8, padding: 12 }}>
        {debug.pointsLen === 0 ? (
          <div style={{ color: "#fff" }}>
            Sin datos para graficar. (raw: {debug.rawLen}, puntos válidos: {debug.pointsLen})
          </div>
        ) : (
          <Bar data={chartData} options={chartOptions} />
        )}
      </div>
    </div>
  );
}
