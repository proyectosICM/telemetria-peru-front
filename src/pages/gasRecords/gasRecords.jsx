import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { NavbarCommon } from "../../common/navbarCommon";
import { GasInfo } from "../optionsPanel/gasInfo";
import { gasRecordsByVehicleIdPageURL } from "../../api/apiurls";
import { ListItemsPaginated } from "../../hooks/listItems";

export function GasRecords() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const selectedVehicleId = localStorage.getItem("selectedVehicleId");
  const page = 0

  useEffect(() => {
    ListItemsPaginated(`${gasRecordsByVehicleIdPageURL}/${selectedVehicleId}`, setData, page);
  }, [selectedVehicleId]); 
  
  console.log(data)

  return (
    <div>
      <NavbarCommon />
      <Button onClick={() => navigate("/")} className="back-button">
        Atras
      </Button>
      <div style={{ border: "2px solid #d1d0cc", margin: "20px 10%" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "20px auto" }}>
          <GasInfo vehicleId={selectedVehicleId} showAlert={false} />
          <Table striped bordered hover variant="dark" style={{ margin: "20px", width: "90%" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Plate</th>
                <th>Pressure</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {data && data.map((d) => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.vehicleModel.licensePlate}</td>
                  <td>{d.pressure} psi</td>
                  <td>{d.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginTop: "20px" }}>
            <Button>Atras</Button>
            <p style={{ margin: "0" }}>Pagina 1 de 3</p>
            <Button>Siguiente</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
