import React, { useEffect, useState } from "react";
import { ListItems } from "../hooks/listItems";
import { vehiclesByCompanyURL } from "../api/apiurls";

export function VehicleMenuPanel({ onSelectVehicle }) {
  
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const companyId = localStorage.getItem("companyId");

  useEffect(() => {
    ListItems(`${vehiclesByCompanyURL}/${companyId}`, setData);
  }, [companyId]);

  const handleSelectVehicle = (id) => {
    onSelectVehicle(id);
  };

  const filteredData = data.filter((item) =>
    item.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Camiones</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por matrícula..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="panel">
        {filteredData.map((item, index) => (
          <div className="item" key={index} onClick={() => handleSelectVehicle(item.id)}>
            <p>{item.licensePlate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
