import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { NavbarCommon } from "../../common/navbarCommon";

import { fuelRecordsByVehicleIdPageURL, vehiclesURL } from "../../api/apiurls";
import { ListItems, ListItemsPaginated } from "../../hooks/listItems";
import { getDateFromTimestamp, getTimeFromTimestamp } from "../../utils/formatUtils";
import { PaginacionUtils } from "../../utils/paginacionUtils";
import { FuelInfo } from "../mainPanel/optionsPanel/fuelInfo";

export function FuelRecords() {
  const navigate = useNavigate();
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const [pageNumber, setPageNumber] = useState(0);

  const [vehicleData, setVehicleData] = useState(null);

  useEffect(() => {
    ListItems(`${vehiclesURL}/${selectedVehicleId}`, setVehicleData);
  }, [selectedVehicleId]);

  // Usar el hook ListItemsPaginated para obtener los datos y la paginación
  const { data, totalPages, currentPage, setCurrentPage } = ListItemsPaginated(`${fuelRecordsByVehicleIdPageURL}/${selectedVehicleId}`, pageNumber);

  return (
    <div className="g-background">
      <NavbarCommon />
      <Button onClick={() => navigate("/")} className="back-button">
        Atras
      </Button>
      <div style={{ border: "2px solid #d1d0cc", margin: "5px 10%" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "20px auto" }}>
          <FuelInfo vehicleId={selectedVehicleId} showAlert={false} />
          <Table striped bordered hover variant="dark" style={{ margin: "10px", width: "90%" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Dia</th>
                <th>Hora</th>
                <th>Placa</th>
                <th>{vehicleData && vehicleData.fuelType === "GAS " ? "Presion" : "Volumen"}</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((d, index) => (
                  <tr key={index}>
                    <td>{d.id}</td>
                    <td>{getDateFromTimestamp(d.createdAt)}</td>
                    <td>{getTimeFromTimestamp(d.createdAt)}</td>
                    <td>{d.vehicleModel.licensePlate}</td>
                    <td>
                      {vehicleData.fuelType === "DIESEL" ? (d.dataValue * 0.264172).toFixed(2) : d.dataValue}{" "}
                      {vehicleData.fuelType === "GAS " ? "psi" : "volumen"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>

          <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
          <Button variant="success">Descargar registros en Excel</Button>
        </div>
      </div>
    </div>
  );
}
