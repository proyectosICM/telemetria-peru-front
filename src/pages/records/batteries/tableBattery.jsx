import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { batteryRecordsRoutes, batteryRoutes } from "../../../api/apiurls";
import { ListItems, ListItemsPaginated } from "../../../hooks/listItems";
import { getDateFromTimestamp, getTimeFromTimestamp } from "../../../utils/formatUtils";
import { PaginacionUtils } from "../../../utils/paginacionUtils";

export function BatteryRecordsTable() {
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  const [dataBattery, setDataBattery] = useState([]);
  const [selectedBattery, setSelectedBattery] = useState(null);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);

  const { data, totalPages, currentPage, setCurrentPage, pageError } = ListItemsPaginated(
    `${batteryRecordsRoutes.byVehicleAndBatteryPaged}/${selectedVehicleId}`,
    pageNumber,
    { batteryId: selectedBattery }
  );

  useEffect(() => {
    ListItems(`${batteryRoutes.byVehicle}/${selectedVehicleId}`, setDataBattery, setError);
  }, [selectedVehicleId]);

  useEffect(() => {
    if (dataBattery.length > 0 && !selectedBattery) {
      setSelectedBattery(dataBattery[0].id);
    }
  }, [dataBattery, selectedBattery]);

  return (
    <div style={{ flex: "1 1 45%", minWidth: "300px", margin: "2%" }}>
      <ButtonGroup className="mb-3">
        {dataBattery.map((battery) => (
          <Button key={battery.id} variant={selectedBattery === battery.id ? "primary" : "secondary"} onClick={() => setSelectedBattery(battery.id)}>
            Batería {battery.name}
          </Button>
        ))}
      </ButtonGroup>

      {pageError && (
        <div className="error-message" style={{ color: "red", margin: "10px" }}>
          Error: {pageError.message || "Hubo un problema cargando los datos"}
        </div>
      )}

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Dia</th>
            <th>Hora</th>
            <th>Name</th>
            <th>Voltage</th>
            <th>Corriente</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data && !pageError ? (
            data.map((d, index) => (
              <tr key={d.id}>
                <td>{d.createdAt ? getDateFromTimestamp(d.createdAt) : "No data"}</td>
                <td>{d.createdAt ? getTimeFromTimestamp(d.createdAt) : "No data"}</td>
                <td>{d.nameBattery ? d.nameBattery : "No data"}</td>
                <td>{d.voltage ? `${d.voltage} v` : "No data"} </td>
                <td>{d.current ? `${d.current} a` : "No data"} </td>
                <td>Good</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hay datos disponibles o hubo un error al cargar los datos.</td>
            </tr>
          )}
        </tbody>
      </Table>
      <PaginacionUtils setPageNumber={setPageNumber} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
