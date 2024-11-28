import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

/**
 * This component displays a circular progress bar that indicates no data
 * is available to display. It shows a fixed value of 0% with a message
 * indicating the absence of real-time data for graphing.
 *
 * @returns {JSX.Element} A circular progress bar component indicating no data.
 */
const NoDataCircularProgressbar = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ width: "40%", textAlign: "center", margin: "auto" }}>
        <CircularProgressbar
          value={0}
          maxValue={100}
          text={`${Math.round(0)}%`}
          styles={buildStyles({
            rotation: 0.5,
            strokeLinecap: "butt",
            trailColor: "#eee",
            textSize: "16px",
            pathTransitionDuration: 0.5,
            pathColor: "rgba(255, 0, 0, 1)",
            textColor: "white",
            backgroundColor: "#3e98c7",
          })}
        />
      </div>
      <div style={{ color: "white", marginTop: "10px", width: "100%"}}>
        <span style={{ fontSize: "15px" }}>No hay datos en tiempo real para graficar</span>
      </div>
    </div>
  );
};

export default NoDataCircularProgressbar;
