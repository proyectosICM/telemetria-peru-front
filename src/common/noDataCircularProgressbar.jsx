import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const NoDataCircularProgressbar = ({ value = 0, text = "No hay datos en tiempo real para graficar", color = "rgba(255, 0, 0, 1)" }) => {
  return (
    <div style={{ width: "40%", textAlign: "center" }}>
      <CircularProgressbar
        value={value}
        maxValue={100}
        text={`${Math.round(value)}%`}
        styles={buildStyles({
          rotation: 0.5,
          strokeLinecap: "butt",
          trailColor: "#eee",
          textSize: "16px",
          pathTransitionDuration: 0.5,
          pathColor: color,
          textColor: "white",
          backgroundColor: "#3e98c7",
        })}
      />
      <div style={{ color: "white", marginTop: "10px" }}>
        <span style={{ fontSize: "15px" }}>{text}</span>
      </div>
    </div>
  );
};

export default NoDataCircularProgressbar;
