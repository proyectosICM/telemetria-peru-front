import React, { useState } from "react";
import { Table, Spinner, Pagination } from "react-bootstrap";
import { useFuelReportsByVehiclePaged } from "../../../../api/hooks/useFuelReport";
import { getDateFromTimestamp, getTimeFromTimestamp } from "../../../../utils/formatUtils";
import "../../../../styles/paginationStyles.css";

// Función utilitaria para convertir milisegundos a formato hh:mm:ss
const formatDuration = (ms) => {
  if (!ms && ms !== 0) return "-";
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

// Función auxiliar para convertir un array de fecha a string legible
const formatDateArray = (arr) => {
  if (!Array.isArray(arr) || arr.length < 3) return "Fecha inválida";
  const [year, month, day, hour = 0, minute = 0, second = 0] = arr;
  const date = new Date(year, month - 1, day, hour, minute, second);
  return date.toLocaleString();
};

export function FuelReportsTable() {
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const { data: reports, isLoading, isError } = useFuelReportsByVehiclePaged(selectedVehicleId, page, pageSize);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < reports.totalPages) {
      setPage(newPage);
    }
  };

  const renderPaginationItems = () => {
    const totalPages = reports.totalPages;
    const visiblePages = 2;
    const pages = [];

    if (page > visiblePages) {
      pages.push(
        <Pagination.Item key={0} onClick={() => handlePageChange(0)}>
          1
        </Pagination.Item>
      );
      if (page > visiblePages + 1) {
        pages.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
      }
    }

    for (let i = Math.max(0, page - visiblePages); i <= Math.min(totalPages - 1, page + visiblePages); i++) {
      pages.push(
        <Pagination.Item key={i} active={i === page} onClick={() => handlePageChange(i)}>
          {i + 1}
        </Pagination.Item>
      );
    }

    if (page < totalPages - visiblePages - 1) {
      if (page < totalPages - visiblePages - 2) {
        pages.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
      }
      pages.push(
        <Pagination.Item key={totalPages - 1} onClick={() => handlePageChange(totalPages - 1)}>
          {totalPages}
        </Pagination.Item>
      );
    }

    return pages;
  };

  return (
    <div style={{ margin: "10px", width: "90%", height: "600px", overflowX: "auto" }}>
      <h4>📊 Reportes de combustible</h4>
      {isLoading ? (
        <Spinner animation="border" variant="primary" />
      ) : isError ? (
        <div>❌ Error al cargar los reportes.</div>
      ) : (
        <>
          <Table striped bordered hover responsive variant="dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha apertura </th>
                <th>Hora de apertura</th>
                <th>Fecha cierre </th>
                <th>Hora de cierre</th>
                <th>Combustible inicial</th>
                <th>Combustible final</th>
                {/*<th>Uso</th>*/}
                <th>Placa</th>
                <th>Tiempo Estacionado</th>
                <th>Tiempo Ralenti</th>
                <th>Tiempo Operacion</th>
              </tr>
            </thead>
            <tbody>
              {reports?.content?.map((report) => (
                <tr key={report.id}>
                  <td>{report.id}</td>
                  <td>{getDateFromTimestamp(report.createdAt)}</td>
                  <td>{getTimeFromTimestamp(report.createdAt)}</td>
                  <td>{getDateFromTimestamp(report.updatedAt)}</td>
                  <td>{getTimeFromTimestamp(report.updatedAt)}</td>
                  <td>{report.initialFuel ?? "—"}</td>
                  <td>{report.finalFuel ?? "—"}</td>
                  {/*<td>{report.initialFuel}</td>*/}
                  <td>{report.vehicleModel?.licensePlate ?? "—"}</td>
                  <td>{formatDuration(report.parkedTime)}</td>
                  <td>{formatDuration(report.idleTime)}</td>
                  <td>{formatDuration(report.operatingTime)}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination className="pagination-dark justify-content-center mt-3">
            <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 0} />
            {renderPaginationItems()}
            <Pagination.Next onClick={() => handlePageChange(page + 1)} disabled={page + 1 >= reports.totalPages} />
          </Pagination>
        </>
      )}
    </div>
  );
}
