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
  // createdAt viene en segundos (con decimales)
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

  useEffect(() => {
    const tz = "America/Lima";
    const url = `${fuelRecordsRoutes.byVehicleDay}/${selectedVehicleId}/day?date=${selectedDate}&tz=${encodeURIComponent(
      tz
    )}`;
    ListItems(url, setData, setError);
  }, [selectedVehicleId, selectedDate]);

  const { chartData, chartOptions, debug } = useMemo(() => {
    const arr = Array.isArray(data) ? data : [];

    // convierte a puntos {x(ms), y(number)} y filtra malos
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

    // rangos para eje X
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
      debug: {
        rawLen: arr.length,
        pointsLen: points.length,
        sample: points.slice(0, 3),
      },

      chartData: {
        datasets: [
          {
            label: datasetLabel,
            data: points,          // <- [{x,y}]
            parsing: false,        // <- importante

            // ✅ colores visibles en dark
            borderColor: "#4FC3F7",
            backgroundColor: "rgba(79,195,247,0.15)",

            // ✅ fuerza línea visible
            showLine: true,
            borderWidth: 2,
            tension: 0.2,

            // puntos
            pointRadius: 2.5,
            pointHoverRadius: 6,

            // opcional: relleno
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
              title: (items) => {
                const x = items?.[0]?.raw?.x;
                return `Hora: ${fmtTimeFromMs(x)}`;
              },
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

  // 🔎 debug útil mientras pruebas
  // console.log("chart debug:", debug);

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
