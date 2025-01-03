import React, { useState } from "react";
import { NavbarCommon } from "../../common/navbarCommon";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ListItemsPaginated } from "../../hooks/listItems";
import { alarmRecordsByVehicleIdPageURL, fuelRecordsByVehicleIdPageURL } from "../../api/apiurls";
import { getDateFromTimestamp, getTimeFromTimestamp } from "../../utils/formatUtils";
import { PaginacionUtils } from "../../utils/paginacionUtils";
 
export function AlarmRecords() {
  const navigate = useNavigate();
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const [pageNumber, setPageNumber] = useState(0);
  // Usar el hook ListItemsPaginated para obtener los datos y la paginación
  const { data, totalPages, currentPage, setCurrentPage } = ListItemsPaginated(`${alarmRecordsByVehicleIdPageURL}/${selectedVehicleId}`, pageNumber);
  return (
    <div className="g-background">
      <NavbarCommon />
      <Button onClick={() => navigate("/")} className="back-button">
        Atras
      </Button>
      <div style={{ border: "2px solid #d1d0cc", margin: "5px 5%" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "20px auto" }}>
          <h1>Registro de activacion de alarma</h1>
          <Table striped bordered hover variant="dark" style={{ margin: "10px", width: "90%" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Dia</th>
                <th>Hora</th>
                <th>Placa</th>
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
                  </tr>
                ))}
            </tbody>
          </Table>

          <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
