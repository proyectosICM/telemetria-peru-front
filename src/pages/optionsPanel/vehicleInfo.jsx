import React, { useEffect, useState } from "react";
import { ListItems } from "../../hooks/listItems";
import { vehiclesURL } from "../../api/apiurls";

export function VehicleInfo() {
    const [data, setData] = useState([]);

    useEffect(() => {
      ListItems(`${vehiclesURL}/2`, setData);
    }, []);

  return (
    <div className='option-item'>
      <h4>Informacion</h4>
      <p>Placa: {data && data.licensePlate}</p>
      <p>Velocidad Actual: {data && `${data.speed} km`} </p>
      <p>Tiempo encendido: 13 horas 20 min</p>
      <p>Coordenadas: {data && data.longitud}</p>
    </div>
  );
}
