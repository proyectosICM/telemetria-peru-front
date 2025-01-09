import React, { useState } from "react";
import { NavbarCommon } from "../../common/navbarCommon";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ListItemsPaginated } from "../../hooks/listItems";
import { alarmRecordsByVehicleIdPageURL } from "../../api/apiurls";
import { PaginacionUtils } from "../../utils/paginacionUtils";
import { AlarmRecordsTable } from "./alarmRecordsTable";

export function AlarmRecords() {
  const navigate = useNavigate();
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const [pageNumber, setPageNumber] = useState(0);

  const { data, totalPages, currentPage, setCurrentPage, pageError  } = ListItemsPaginated(`${alarmRecordsByVehicleIdPageURL}/${selectedVehicleId}`, pageNumber);
  return (
    <div className="g-background">
      <NavbarCommon />
      <Button onClick={() => navigate("/")} className="back-button">
        Atras
      </Button>
      <div style={{ border: "2px solid #d1d0cc", margin: "5px 5%" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "20px auto" }}>
          <h1>Registro de activacion de alarma</h1>
          <AlarmRecordsTable data={data} error={pageError} />
          <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}