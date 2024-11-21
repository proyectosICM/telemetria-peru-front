import React, { useState } from "react";
import { NavbarCommon } from "../../common/navbarCommon";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IgnitionInfo } from "../mainPanel/optionsPanel/ignitionInfo";
import { PaginacionUtils } from "../../utils/paginacionUtils";
import { fuelRecordsByVehicleIdPageURL, ignitionsByVehicleIdPageURL } from "../../api/apiurls";
import { ListItemsPaginated } from "../../hooks/listItems";
import { IgnitionRecordsTable } from "./ignitionRecordsTable";

export function IgnitionRecords() {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const { data, totalPages, currentPage, setCurrentPage } = ListItemsPaginated(`${ignitionsByVehicleIdPageURL}/${selectedVehicleId}`, pageNumber);

  return (
    <div className="g-background">
      <NavbarCommon />
      <Button onClick={() => navigate("/")} className="back-button">
        Atras
      </Button>
      <div style={{ border: "2px solid #d1d0cc", margin: "5px 10%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "20px auto",
          }}
        >
          <IgnitionInfo />
          <IgnitionRecordsTable data={data} />
          <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
