  import React, { useEffect, useState } from "react";
  import { FaTruck } from "react-icons/fa"; // Importa el ícono de camión
  import { ListItems } from "../hooks/listItems";
  import { vehiclesByCompanyURL } from "../api/apiurls";

  export function VehicleMenuPanel({ onSelectVehicle }) {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const companyId = localStorage.getItem("companyId");
  
    useEffect(() => {
      ListItems(`${vehiclesByCompanyURL}/${companyId}`, setData);
    }, [companyId]);
  
    const handleSelectVehicle = (id, type) => {
      onSelectVehicle(id);
      localStorage.setItem("selectedTypeVehicleId", type);
    };
  
    const filteredData = data.filter((item) =>
      item.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div className="vmp-container">
        <h1 className="vmp-title">Camiones</h1>
  
        <div className="vmp-search-bar">
          <input
            type="text"
            placeholder="Buscar por matrícula..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="vmp-search-input"
          />
        </div>
  
        <div className="vmp-panel">
          {filteredData.map((item, index) => (
            <div
              className="vmp-item"
              key={index}
              onClick={() => handleSelectVehicle(item.id, item.vehicletypeModel.id)}
            >
              <div className="vmp-item-details">
                <FaTruck size={40} color="white" style={{ marginBottom: '10px' }} />
                <p className="vmp-license"><strong>Placa:</strong> {item.licensePlate}</p>
                <p className="vmp-type"><strong>Tipo:</strong> {item.vehicletypeModel.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
