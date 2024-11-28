import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { getStatusColor } from "../utils/getStatusColorCPB";
import "react-circular-progressbar/dist/styles.css";
import "./commonStyles.css";

/**
 * This component displays a circular progress bar with a visual
 * status based on a provided value and status.
 *
 * Props:
 * - value (number): The current value of the progress bar (must be between 0 and 100).
 * - status (string): The status that determines the color of the progress bar.
 * - size (string | number): The size of the component that will be used, both width and height (can be in pixels or percentage).
 * - children (ReactNode): Child elements to be displayed below the progress bar.
 *
 * @returns {JSX.Element} A circular progress bar component with status.
 */
const CircularProgressbarWithStatus = ({ value, status, size, children }) => {
  const statusColor = getStatusColor(status);
  return (
    <div>
      <div style={{ width: size, height: size, margin: "auto auto 0px auto" }}>
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
      <div style={{ textAlign: "center", color: "white", margin: "22px 0px 0px 0px " }}>{children}</div>
    </div>
  );
};

export default CircularProgressbarWithStatus;
