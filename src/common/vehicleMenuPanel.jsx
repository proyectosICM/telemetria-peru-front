import React, { useEffect, useState } from "react";
import { ListItems } from "../hooks/listItems";
import { vehiclesByCompanyURL } from "../api/apiurls";

export function VehicleMenuPanel() {
  const [data, setData] = useState([]);

  useEffect(() => {
    ListItems(`${vehiclesByCompanyURL}/1`, setData);
  }, []);

  return (
    <div className="container">
      <h1>Camiones</h1>
      <div className="panel">
        {data.map((item, index) => (
          <div className="item" key={index}>
            <p>{item.licensePlate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
