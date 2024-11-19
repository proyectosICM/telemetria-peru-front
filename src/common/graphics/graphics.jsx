import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Button } from "react-bootstrap";
import "../../styles/generalStyles.css";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function Graphics({ gdata, datalabel, datad, type, id, nombre }) {
  // gdata = datos a graficar
  //type 
  if (!gdata || gdata.length === 0) {
    return <div className="text-white">No hay datos disponibles para graficar.</div>;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Total de cargas ${nombre}`,
      },
    },
  };

  let labels, data;
  let containerClassName;
  if (type === "general") {
    // Tipo "general": Mostrar etiquetas basadas en gdataLabel y datos basados en gdata
    labels = gdata.map((data) => `Carril ${data.hour}`);
    data = gdata.map((data) => data.cantidad);
    containerClassName = "graph-panel";
  } else if (type === "individual") {
    const carrilData = gdata.find((item) => item.carrilId === id);

    if (!carrilData) {
      return <div className="graph-item">No se encontraron datos para el carril {nombre}.</div>;
    }
    labels = carrilData.dias.map((dia) => `${dia.fecha[2]}/${dia.fecha[1]}/${dia.fecha[0]}`);
    data = carrilData.dias.map((dia) => dia.cantidad);
    containerClassName = "graph-item";
  }

  const dataI = {
    labels: labels,
    datasets: [
      {
        label: `Cantidad de cargas realizadas`,
        data: data,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Line options={options} data={dataI} className={containerClassName} />;
}
