import React, { useEffect, useState } from "react";
import { NavbarCommon } from "../../../common/navbarCommon";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ListItemsPaginated } from "../../../hooks/listItems";
import { impactIncidentLoggingRoutes } from "../../../api/apiurls";
import { getDateAndDayFromTimestamp } from "../../../utils/formatUtils";
import { PaginacionUtils } from "../../../utils/paginacionUtils";

export function ImpactIncidentLoggingRecords() {
  const navigate = useNavigate();

  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const [pageNumber, setPageNumber] = useState(0);

  const { data, totalPages, currentPage, setCurrentPage } = ListItemsPaginated(`${impactIncidentLoggingRoutes.byVehiclePaged}/${selectedVehicleId}`, pageNumber);
  return (
    <div>
      <NavbarCommon />
      <Button onClick={() => navigate("/")} className="back-button"> 
        Atras
      </Button>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "20px auto" }}>
        <Table striped bordered hover variant="dark" style={{ margin: "20px", width: "80%" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Dia y Hora</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((log) => (
                <tr key={log.id}>
                  <td>{log.id}</td>
                  <td>{getDateAndDayFromTimestamp(log.createdAt)}</td>
                  <td>{log.description}</td>
                </tr>
              ))}
          </tbody>
        </Table>
        <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
