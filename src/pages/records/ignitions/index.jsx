import React, { useState } from "react";
import { IgnitionInfo } from "../../../realTime/ignitionInfo";
import { PaginacionUtils } from "../../../utils/paginacionUtils";
import { ignitionRoutes } from "../../../api/apiurls";
import { ListItemsPaginated } from "../../../hooks/listItems";
import { IgnitionRecordsTable } from "./table";
import { BackButton } from "../../../common/backButton";
import { IgnitionCount } from "./counts";
import { NavbarCommon } from "../../../common/navbarCommon";

export function IgnitionRecords() {
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  const [pageNumber, setPageNumber] = useState(0);

  const { data, totalPages, currentPage, setCurrentPage, pageError } = ListItemsPaginated(
    `${ignitionRoutes.byVehiclePaged}/${selectedVehicleId}`,
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
