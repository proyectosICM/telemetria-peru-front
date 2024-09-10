import React, { useEffect, useState } from "react";
import { ListItems } from "../../hooks/listItems";
import { vehiclesURL } from "../../api/apiurls";

export function VehicleInfo() {
    const [data, setData] = useState([]);
    const selectedVehicleId = localStorage.getItem("selectedVehicleId");

    useEffect(() => {
      ListItems(`${vehiclesURL}/${selectedVehicleId}`, setData);
    }, [selectedVehicleId]); 
 
  return (
    <div className='g-option-item'>
      <h4>Informacion</h4>
      <p>Placa: {data && data.licensePlate}</p>
      <p>Velocidad Actual: {data && `${data.speed} km`} </p>
      <p>Tiempo encendido: {data && data.timeOn} segundos</p>
      <p>Coordenadas: {data && data.longitud}</p>
    </div>
  ); 
}
