import React from "react";
import { Line } from "react-chartjs-2";

export function ChartComponent({ data, options, layout = "single", style }) {
  const isSideBySide = layout === "side-by-side";
  const containerStyle = isSideBySide
    ? {
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        justifyContent: "space-evenly",
        width: "100%",
      }
    : {
        display: "block",
        width: "100%",
      };

  const chartStyle = isSideBySide
    ? {
        width: "80%", // Cada gráfico ocupa la mitad del espacio
        minWidth: "300px",
      }
    : {
        width: "80%",
        margin: "0 auto",
      };

  return (
    <div style={containerStyle}>
      <div style={{ ...chartStyle, ...style }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
