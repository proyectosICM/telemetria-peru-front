import React, { useEffect, useState } from "react";
import { NavbarCommon } from "../../common/navbarCommon";
import { useNavigate } from "react-router-dom";
import { IgnitionInfo } from "../mainPanel/optionsPanel/ignitionInfo";
import { PaginacionUtils } from "../../utils/paginacionUtils";
import { ignitionBasicChartURL, ignitionsByVehicleIdPageURL } from "../../api/apiurls";
import { ListItems, ListItemsPaginated } from "../../hooks/listItems";
import { IgnitionRecordsTable } from "./ignitionRecordsTable";
import { BackButton } from "../../common/backButton";
import { IgnitionCount } from "./ignitionCount";

export function IgnitionRecords() {
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  const [pageNumber, setPageNumber] = useState(0);

  const { data, totalPages, currentPage, setCurrentPage, pageError } = ListItemsPaginated(
    `${ignitionsByVehicleIdPageURL}/${selectedVehicleId}`,
    pageNumber
  );

  return (
    <div className="g-background">
      <NavbarCommon />

      <BackButton path={-1} />

      <div style={{ border: "2px solid #d1d0cc", margin: "5px 5%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "20px auto",
          }}
        >
          <IgnitionInfo showAlert={false} />
          <IgnitionRecordsTable data={data} error={pageError} />
          <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
        
          <IgnitionCount />
        
        </div>
      </div>
    </div>
  );
}
