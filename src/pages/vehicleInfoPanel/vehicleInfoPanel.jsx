import React, { useEffect, useState } from "react";
import { NavbarCommon } from "../../common/navbarCommon";
import { useNavigate } from "react-router-dom";
import { speedExcessLoggerByVehiclePageURL, vehiclesURL } from "../../api/apiurls";
import { ListItems, ListItemsPaginated } from "../../hooks/listItems";
import { PaginacionUtils } from "../../utils/paginacionUtils";
import { getDateAndDayFromTimestamp } from "../../utils/formatUtils";
import { Button, Table } from "react-bootstrap";

export function VehicleInfoPanel() {
  const navigate = useNavigate();
  const [vehicleData, setVehicleData] = useState([]);

  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    ListItems(`${vehiclesURL}/${selectedVehicleId}`, setVehicleData);
  }, [selectedVehicleId]);

  const { data, totalPages, currentPage, setCurrentPage } = ListItemsPaginated(
    `${speedExcessLoggerByVehiclePageURL}/${selectedVehicleId}`,
    pageNumber
  );

  return (
    <div>
      <NavbarCommon />
      <Button onClick={() => navigate("/")} className="back-button">
        Atras
      </Button>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "20px auto" }}>
        <h2>Informacion del vehiculo</h2>
        <p>
          <strong> Placa:</strong> {vehicleData && vehicleData.licensePlate} | <strong> Tipo de vehículo: </strong>
          {vehicleData && vehicleData.vehicleTypeName}
        </p>
        <p>Velocidad maxima definida: {vehicleData && vehicleData.maxSpeed ? vehicleData.maxSpeed : "No registra"} </p>
        <h2>Registro de excesos de velocidad</h2>
        <Table striped bordered hover variant="dark" style={{ margin: "20px", width: "80%" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Día y Hora</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((log) => (
                <tr key={log.id}>
                  <td>{log.id}</td>
                  <td>{getDateAndDayFromTimestamp(log.createdAt)}</td>
                  <td>{log.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  No hay datos disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
