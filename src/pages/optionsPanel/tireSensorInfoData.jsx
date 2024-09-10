import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { ListItems } from "../../hooks/listItems";
import { tireSensorByVehicleIdURL } from "../../api/apiurls";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export function TireInfoData({ showAlert = true }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  
  useEffect(() => {
    ListItems(`${tireSensorByVehicleIdURL}/${selectedVehicleId}`, setData);
  }, [selectedVehicleId]); 

  const handleRecords = () => {
    if (showAlert) {
      Swal.fire({
        title: "¿Desea ver los registros de detallados?",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/tire-sensors-details");
          console.log("Mostrar registros");
        }
      });
    } else {
      navigate("/tire-sensors-details");
    }
  };
 
  return (
    <div className="g-option-item" onClick={handleRecords}>
      <h4>Tire Info</h4>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Pressure</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((tire) => (
            <tr key={tire.id}>
              <td>{tire.identificationCode}</td>
              <td>{tire.pressure}</td>
              <td>{tire.status ? "Good" : "Bad"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
