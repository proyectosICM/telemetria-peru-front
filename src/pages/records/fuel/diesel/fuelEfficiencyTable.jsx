import React, { useMemo, useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { PaginacionUtils } from "../../../../utils/paginacionUtils";
import { fuelEfficiencyRoutes } from "../../../../api/apiurls";
import { ListItemsPaginated, ListItems } from "../../../../hooks/listItems";
import { getDateFromTimestamp, getTimeFromTimestampWithSeconds } from "../../../../utils/formatUtils";

// ===== helpers fechas =====
function pad2(n) {
  return String(n).padStart(2, "0");
}

// Date -> "YYYY-MM-DD"
function toYMD(date) {
  const y = date.getFullYear();
  const m = pad2(date.getMonth() + 1);
  const d = pad2(date.getDate());
  return `${y}-${m}-${d}`;
}

// "YYYY-MM-DD" -> Date local (00:00)
function parseYMDToDateLocal(ymd) {
  const [y, m, d] = (ymd || "").split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1, 0, 0, 0, 0);
}

// segundos -> HH:mm:ss
function secondsToHHmmss(sec) {
  const s = Number(sec);
  if (!Number.isFinite(s) || s < 0) return "00:00:00";
  const hh = Math.floor(s / 3600);
  const mm = Math.floor((s % 3600) / 60);
  const ss = Math.floor(s % 60);
  return `${pad2(hh)}:${pad2(mm)}:${pad2(ss)}`;
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
function startOfYear(date) {
  return new Date(date.getFullYear(), 0, 1);
}

export function FuelEfficiencyTable() {
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  // UI
  const [period, setPeriod] = useState("day"); // day | week | month | year
  const [selectedDate, setSelectedDate] = useState(() => toYMD(new Date()));

  // paginado
  const [pageNumberEfficiency, setPageNumberEfficiency] = useState(0);

  // ===== rango según period =====
  const range = useMemo(() => {
    const base = parseYMDToDateLocal(selectedDate);

    if (period === "day") {
      const start = toYMD(base);
      const end = toYMD(base);
      return { start, end, mode: "day" };
    }

    if (period === "week") {
      const start = toYMD(addDays(base, -6));
      const end = toYMD(base);
      return { start, end, mode: "range" };
    }

    if (period === "month") {
      const start = toYMD(startOfMonth(base));
      const end = toYMD(base); // “mes hasta hoy”
      return { start, end, mode: "range" };
    }

    // year
    const start = toYMD(startOfYear(base));
    const end = toYMD(base);
    return { start, end, mode: "range" };
  }, [selectedDate, period]);

  // ===== url paginado =====
  // Para paginado: usamos endpoints /range/paged (incluye day también si start=end)
  const pagedUrl = useMemo(() => {
    if (!selectedVehicleId) return null;
    return `${fuelEfficiencyRoutes.base}/vehicle/${selectedVehicleId}/range/paged`;
  }, [selectedVehicleId]);

  // parámetros para el hook
  const parameters = useMemo(() => {
    return { start: range.start, end: range.end, size: 20 };
  }, [range.start, range.end]);

  // ===== data paginada =====
  const { data, totalPages, currentPage, setCurrentPage, pageError } =
    ListItemsPaginated(pagedUrl ?? "", pageNumberEfficiency, parameters);

  // Reset page cuando cambias periodo/fecha/vehículo
  useEffect(() => {
    setPageNumberEfficiency(0);
  }, [period, selectedDate, selectedVehicleId]);

  // ===== sum (totales arriba) =====
  const [sum, setSum] = useState(null);
  const [sumError, setSumError] = useState(null);

  const sumUrl = useMemo(() => {
    if (!selectedVehicleId) return null;
    return fuelEfficiencyRoutes.vehicleSum(selectedVehicleId, range.start, range.end);
  }, [selectedVehicleId, range.start, range.end]);

  useEffect(() => {
    if (!sumUrl) return;
    ListItems(sumUrl, setSum, setSumError);
  }, [sumUrl]);

  return (
    <div style={{ margin: "10px", width: "90%", height: "600px", overflowX: "auto" }}>
      <h3 style={{ color: "#fff" }}>Eficiencia de combustible</h3>

      {/* controles */}
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          marginBottom: 12,
          flexWrap: "wrap",
          color: "#fff",
        }}
      >
        <span>Periodo:</span>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          style={{ padding: "4px 8px" }}
        >
          <option value="day">Día</option>
          <option value="week">Semana</option>
          <option value="month">Mes</option>
          <option value="year">Año</option>
        </select>

        <span>Fecha base:</span>
        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />

        <div style={{ marginLeft: "auto", color: "#bbb" }}>
          Rango: <b>{range.start}</b> → <b>{range.end}</b>
        </div>
      </div>

      {/* totales */}
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 10, color: "#fff" }}>
        <div>
          <span style={{ color: "#bbb" }}>Total estacionado:</span>{" "}
          <b>{secondsToHHmmss(sum?.parkedSeconds ?? 0)}</b>
        </div>
        <div>
          <span style={{ color: "#bbb" }}>Total en ralentí:</span>{" "}
          <b>{secondsToHHmmss(sum?.idleSeconds ?? 0)}</b>
        </div>
        <div>
          <span style={{ color: "#bbb" }}>Total en operación:</span>{" "}
          <b>{secondsToHHmmss(sum?.operationSeconds ?? 0)}</b>
        </div>
      </div>

      {/* errores */}
      {pageError && <div style={{ color: "red" }}>Error cargando tabla</div>}
      {sumError && <div style={{ color: "red" }}>Error cargando sumatoria</div>}
      {!selectedVehicleId && <div style={{ color: "orange" }}>Selecciona un vehículo primero</div>}

      {/* tabla (2 columnas: campo / valor) */}
      <Table striped bordered hover variant="dark" responsive>
        <thead>
          <tr>
            <th style={{ width: 220 }}>Campo</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.length > 0 ? (
            data.flatMap((d) => [
              /*<tr key={`${d.id}-title`}>
                <td colSpan={2} style={{ fontWeight: 700, color: "#fff" }}>
                  Registro #{d.id} — Día: {d.day}
                </td>
              </tr>,*/
              <tr key={`${d.id}-parked`}>
                <td>Tiempo estacionado</td>
                <td>{secondsToHHmmss(d.parkedSeconds)}</td>
              </tr>,
              <tr key={`${d.id}-idle`}>
                <td>Tiempo en ralentí</td>
                <td>{secondsToHHmmss(d.idleSeconds)}</td>
              </tr>,
              <tr key={`${d.id}-op`}>
                <td>Tiempo en operación</td>
                <td>{secondsToHHmmss(d.operationSeconds)}</td>
              </tr>,
              /*
              <tr key={`${d.id}-created`}>
                <td>Fecha de creación</td>
                <td>{getDateFromTimestamp(d.createdAt ? String(d.createdAt) : "")}</td>
              </tr>,*/
              /*
              <tr key={`${d.id}-updated`}>
                <td>Fecha de actualización</td>
                <td>{d.updatedAt ? String(d.updatedAt) : ""}</td>
              </tr>,
              <tr key={`${d.id}-sep`}>
                <td colSpan={2} style={{ background: "rgba(255,255,255,0.03)" }} />
              </tr>,*/
            ])
          ) : (
            <tr>
              <td colSpan={2} style={{ color: "#bbb" }}>
                Sin datos para el rango seleccionado.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* paginación */}
      <PaginacionUtils
        setPageNumber={setPageNumberEfficiency}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
