import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { NavbarCommon } from "../../common/navbarCommon";
import { GasInfo } from "../optionsPanel/gasInfo";
import { gasRecordsByVehicleIdPageURL } from "../../api/apiurls";
import { ListItemsPaginated } from "../../hooks/listItems";
import { getDateFromTimestamp, getTimeFromTimestamp } from "../../utils/formatUtils";
import { PaginacionUtils } from "../../utils/paginacionUtils";
 
export function GasRecords() {
  const navigate = useNavigate();
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const [pageNumber, setPageNumber] = useState(0);

  // Usar el hook ListItemsPaginated para obtener los datos y la paginación
  const { data , totalPages, currentPage, setCurrentPage } = ListItemsPaginated(`${gasRecordsByVehicleIdPageURL}/${selectedVehicleId}`, pageNumber);

  return (
    <div className="g-background">
      <NavbarCommon />
      <Button onClick={() => navigate("/")} className="back-button">
        Atras
      </Button>
      <div style={{ border: "2px solid #d1d0cc", margin: "5px 10%" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "20px auto" }}>
          <GasInfo vehicleId={selectedVehicleId} showAlert={false} />
          <Table striped bordered hover variant="dark" style={{ margin: "10px", width: "90%" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Day</th>
                <th>Hour</th>
                <th>Plate</th>
                <th>Pressure</th>
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
                    <td>{d.pressure} psi</td>
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
