import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { batteryRecordByVehicleAndBatteryPageURL } from "../../api/apiurls";
import { ListItemsPaginated } from "../../hooks/listItems";
import { getDateFromTimestamp, getTimeFromTimestamp } from "./../../utils/formatUtils";
import { PaginacionUtils } from "../../utils/paginacionUtils";

export function BatteryRecordsTable({ batteryId }) {
  const navigate = useNavigate();
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const [pageNumber, setPageNumber] = useState(0);

  const { data, totalPages, currentPage, setCurrentPage, pageError } = ListItemsPaginated(
    `${batteryRecordByVehicleAndBatteryPageURL}/${selectedVehicleId}`,
    pageNumber,
    { batteryId: batteryId }
  );
  return (
    <div style={{ flex: "1 1 45%", minWidth: "300px", margin: "2%" }}>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Dia</th>
            <th>Hora</th>
            <th>Name</th>
            <th>Voltage</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((d, index) => (
              <tr key={d.id}>
                <td>{getDateFromTimestamp(d.createdAt)}</td>
                <td>{getTimeFromTimestamp(d.createdAt)}</td>
                <td>{d.nameBattery}</td>
                <td>{d.voltage} v</td>
                <td>Good</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
