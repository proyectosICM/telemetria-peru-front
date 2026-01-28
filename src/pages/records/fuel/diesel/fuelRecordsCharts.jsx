import React, { useEffect, useMemo, useState } from "react";
import { fuelRecordsRoutes } from "../../../../api/apiurls";
import { ListItems } from "../../../../hooks/listItems";

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

function toDieselGallons(valueData) {
  return valueData * 0.264172;
}

function epochSecondsToMs(epochSeconds) {
  const ms = Number(epochSeconds) * 1000;
  return Number.isFinite(ms) ? ms : null;
}

function fmtTimeFromMs(ms) {
  const d = new Date(ms);
  if (isNaN(d.getTime())) return "";
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

// merge sin duplicados por id (si prefieres, puedes usar createdAt)
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

  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  });

  // arma la URL una sola vez por dependencia
  const url = useMemo(() => {
    const tz = "America/Lima";
    return `${fuelRecordsRoutes.byVehicleDay}/${selectedVehicleId}/day?date=${selectedDate}&tz=${encodeURIComponent(
      tz
    )}`;
  }, [selectedVehicleId, selectedDate]);

  // 1) carga inicial + cuando cambia vehículo o día
  useEffect(() => {
    if (!selectedVehicleId) return;

    ListItems(
      url,
      (incoming) => {
        // cuando cambias de día/vehículo, normalmente quieres reemplazar, no mergear
        setData(Array.isArray(incoming) ? incoming : []);
        setError(null);
      },
      setError
    );
  }, [url, selectedVehicleId]);

  // 2) polling cada 60s (merge sin borrar)
  useEffect(() => {
    if (!selectedVehicleId) return;

    const intervalId = setInterval(() => {
      ListItems(
        url,
        (incoming) => {
          setData((prev) => mergeById(prev, incoming));
          setError(null);
        },
        setError
      );
    }, 60_000); // 1 minuto

    return () => clearInterval(intervalId);
  }, [url, selectedVehicleId]);

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

    const minX = points.length ? points[0].x : undefined;
    const maxX = points.length ? points[points.length - 1].x : undefined;

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

    return {
      debug: { rawLen: arr.length, pointsLen: points.length, sample: points.slice(0, 3) },
      chartData: {
        datasets: [
          {
            label: datasetLabel,
            data: points,
            parsing: false,
            borderColor: "#4FC3F7",
            backgroundColor: "rgba(79,195,247,0.15)",
            showLine: true,
            borderWidth: 2,
            tension: 0.2,
            pointRadius: 2.5,
            pointHoverRadius: 6,
            fill: false,
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
              title: (items) => `Hora: ${fmtTimeFromMs(items?.[0]?.raw?.x)}`,
              label: (item) => `Valor: ${item.raw.y} ${unit}`,
            },
          },
        },
        scales: {
          x: {
            type: "linear",
            min: minX,
            max: maxX,
            ticks: {
              color: "#fff",
              maxTicksLimit: 10,
              callback: (value) => fmtTimeFromMs(value),
            },
            grid: { color: "rgba(255,255,255,0.08)" },
          },
          y: {
            ticks: { color: "#fff" },
            grid: { color: "rgba(255,255,255,0.08)" },
          },
        },
      },
    };
  }, [data, fuelType]);

  return (
    <div style={{ width: "90%", margin: "10px auto" }}>
      <h1>Estadísticas</h1>

      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        <span>Día:</span>
        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
        <div style={{ marginLeft: "auto", color: "#fff" }}>
          Total registros del día: {Array.isArray(data) ? data.length : 0}
        </div>
      </div>

      {error && <div style={{ color: "red" }}>Error cargando datos</div>}

      <div style={{ height: 340, background: "#111", borderRadius: 8, padding: 12 }}>
        {debug.pointsLen === 0 ? (
          <div style={{ color: "#fff" }}>
            Sin datos para graficar. (raw: {debug.rawLen}, puntos válidos: {debug.pointsLen})
          </div>
        ) : (
          <Line data={chartData} options={chartOptions} />
        )}
      </div>
    </div>
  );
}
