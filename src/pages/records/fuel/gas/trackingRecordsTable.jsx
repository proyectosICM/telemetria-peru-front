import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { gasRecordsRoutes } from "../../../../api/apiurls";
import { ListItemsPaginated } from "../../../../hooks/listItems";
import { PaginacionUtils } from "../../../../utils/paginacionUtils";
import { formatSecondsToHHMMSS, formatTimeDecimal, getDateFromTimestamp, getTimeFromTimestamp } from "../../../../utils/formatUtils";

export function TrackingRecordsTable() {
  const navigate = useNavigate();
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const [pageNumber, setPageNumber] = useState(0);

  // Hook para obtener los datos paginados
  const { data, totalPages, currentPage, setCurrentPage, pageError } = ListItemsPaginated(
    `${gasRecordsRoutes.byVehiclePaged}/${selectedVehicleId}`,
    pageNumber
  );

  return (
    <div style={{ margin: "10px", width: "90%" }}>
      <h3>Registros de seguimiento</h3>

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID2</th>
            <th>Dia Inicio</th>
            <th>Hora de inicio</th> 
            <th>Dia Fin</th>
            <th>Hora Fin</th>
            <th>Presion Final</th>
            <th>Tiempo encendido acumulado</th>
            {/*
             <th>Hora del ultimo encendido</th>
            <th>Hora del ultimo apagado</th>
            */}

            <th>Vehiculo</th>
          </tr>
        </thead>
        <tbody>
          {/* Verifica si hay datos */}
          {data && data.length > 0 ? (    
            data.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{getDateFromTimestamp(d.createdAt)}</td>
                <td>{getTimeFromTimestamp(d.createdAt)}</td> 
                <td>{getDateFromTimestamp(d.updatedAt)}</td>
                <td>{getTimeFromTimestamp(d.updatedAt)}</td>
                <td>{d.lastPressureDetected}</td>
                <td>{d.accumulatedTime ? formatSecondsToHHMMSS(d.accumulatedTime) : "No disponible"}</td>
                {/*
                                <td>{getTimeFromTimestamp(d.startTime)}</td>
                <td>{d.endTime ? getTimeFromTimestamp(d.endTime) : "Aun no disponible"}</td>
                */}

                <td>{d.vehicleModel.licensePlate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                {pageError ? "Error al cargar los datos" : "No hay registros disponibles"}
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
