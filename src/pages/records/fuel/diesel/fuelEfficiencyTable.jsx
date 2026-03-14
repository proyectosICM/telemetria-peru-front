import React, { useMemo, useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { PaginacionUtils } from "../../../../utils/paginacionUtils";
import { ListItemsPaginated } from "../../../../hooks/listItems";
import { fuelEfficiencyRoutes } from "../../../../api/apiurls";

function pad2(n) {
  return String(n).padStart(2, "0");
}

function toYMD(date) {
  const y = date.getFullYear();
  const m = pad2(date.getMonth() + 1);
  const d = pad2(date.getDate());
  return `${y}-${m}-${d}`;
}

function secondsToHHmmss(sec) {
  const s = Number(sec);
  if (!Number.isFinite(s) || s < 0) return "00:00:00";

  const hh = Math.floor(s / 3600);
  const mm = Math.floor((s % 3600) / 60);
  const ss = Math.floor(s % 60);

  return `${pad2(hh)}:${pad2(mm)}:${pad2(ss)}`;
}

function formatDay(value) {
  if (value == null || value === "") return "-";

  const raw = String(value).trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    const [year, month, day] = raw.split("-");
    return `${day}/${month}/${year}`;
  }

  if (/^\d{5}$/.test(raw)) {
    const year = `20${raw.slice(0, 2)}`;
    const month = raw.slice(2, 3).padStart(2, "0");
    const day = raw.slice(3, 5);
    return `${day}/${month}/${year}`;
  }

  if (/^\d{6}$/.test(raw)) {
    const year = `20${raw.slice(0, 2)}`;
    const month = raw.slice(2, 4);
    const day = raw.slice(4, 6);
    return `${day}/${month}/${year}`;
  }

  return raw;
}

export function FuelEfficiencyTable() {
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  const [selectedDate, setSelectedDate] = useState(() => toYMD(new Date()));
  const [pageNumber, setPageNumber] = useState(0);

  const pagedUrl = useMemo(() => {
    if (!selectedVehicleId || !selectedDate) return "";
    return `${fuelEfficiencyRoutes.base}/vehicle/${selectedVehicleId}/day/${selectedDate}/paged`;
  }, [selectedVehicleId, selectedDate]);

  const parameters = useMemo(() => ({ size: 20 }), []);

  const { data, totalPages, currentPage, setCurrentPage, pageError } =
    ListItemsPaginated(pagedUrl, pageNumber, parameters);

  useEffect(() => {
    setPageNumber(0);
  }, [selectedDate, selectedVehicleId]);

  return (
    <div style={{ margin: "10px", width: "90%", overflowX: "auto" }}>
      <h3 style={{ color: "#fff" }}>Eficiencia de combustible (diesel)</h3>

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
        <label htmlFor="fuel-eff-day" style={{ marginBottom: 0 }}>
          Día:
        </label>
        <input
          id="fuel-eff-day"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {pageError && <div style={{ color: "red", marginBottom: 10 }}>Error cargando eficiencia.</div>}
      {!selectedVehicleId && (
        <div style={{ color: "orange", marginBottom: 10 }}>Selecciona un vehículo primero.</div>
      )}

      <Table striped bordered hover variant="dark" responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Día</th>
            <th>Tiempo estacionado</th>
            <th>Tiempo en ralentí</th>
            <th>Tiempo en operación</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{formatDay(item.day)}</td>
                <td>{secondsToHHmmss(item.parkedSeconds)}</td>
                <td>{secondsToHHmmss(item.idleSeconds)}</td>
                <td>{secondsToHHmmss(item.operationSeconds)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ color: "#bbb", textAlign: "center" }}>
                Sin datos para el día seleccionado.
              </td>
            </tr>
          )}
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
