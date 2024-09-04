import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { batteryByVehicleIdURL } from "../../api/apiurls";
import { ListItems } from "../../hooks/listItems";

export function BatteryInfo({ showAlert = true }) {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");

  useEffect(() => {
    ListItems(`${batteryByVehicleIdURL}/${selectedVehicleId}`, setData);
  }, [selectedVehicleId]); 

  const handleRecords = () => {
    if (showAlert) {
      Swal.fire({
        title: "¿Desea ver los registros de la bateria?",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/battery-Records");

        }
      });
    } else {
      navigate("/battery-Records");
    }
  };

  return (
    <div className="option-item" onClick={handleRecords}>
      <h4>Battery Info</h4>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Voltage</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((battery) => (
            <tr key={battery.id}>
              <td>{battery.id}</td>
              <td>{battery.name}</td>
              <td>{battery.voltage ? battery.voltage : "No register"}</td>
              <td>{battery.status ? battery.voltage : "--"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
