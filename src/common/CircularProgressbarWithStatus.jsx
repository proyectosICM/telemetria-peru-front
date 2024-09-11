// common/CircularProgressbarWithStatus.js
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { getStatusColor } from "../utils/getStatusColorCPB";

export const CircularProgressbarWithStatus = ({ value, status, children, size }) => {
  const statusColor = getStatusColor(status);
  return (
    <div style={{ width: "100%" }}>
      <div style={{ width: size, height: size, margin: "auto" }}>
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
            pathColor: statusColor,
            textColor: "white",
            backgroundColor: "#3e98c7",
          })}
        />
      </div>
      <div style={{ textAlign: "center", color: "white", margin: "30px 0 0 0 " }}>{children}</div>
    </div>
  );
};

export default CircularProgressbarWithStatus;
