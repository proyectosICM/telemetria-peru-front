import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useMqtt from "../../hooks/useMqtt";
import { mqttLocalURL, mqttTopics, mqttURL } from "../../api/apiurls";

export function GasInfo({vehicleId}) {
  const topic = `${mqttTopics.tmp_gasPressure}${vehicleId}`;

  const { isConnected, messages, sendMessage } = useMqtt(mqttLocalURL, topic);
  const [inputMessage, setInputMessage] = useState("");
  
  const [pressure, setPressure] = useState(0);
  const percentage = 90;

 
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessageStr = messages[messages.length - 1];
      console.log("Último mensaje recibido:", lastMessageStr);
      try {
        const lastMessage = JSON.parse(lastMessageStr);
        alert(lastMessage)
        setPressure(lastMessage.pressure);
      } catch (error) {
        console.error("Error parsing MQTT message", error);
        console.log("Mensaje recibido no válido:", lastMessageStr);
      }
    }
  }, [messages]);

  return (
    <div className="option-item">
      <h4>Gas Info</h4>
      <div style={{ display: "flex", width: "40%", height: "40%", margin: "auto" }}>
        <CircularProgressbar
          value={percentage}
          maxValue={100}
          text={`${percentage}%`}
          styles={buildStyles({
            rotation: 0.5,
            strokeLinecap: "butt",
            trailColor: "#eee",
            textSize: "16px",
            pathTransitionDuration: 0.5,
            pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
            textColor: "white",
            backgroundColor: "#3e98c7",
          })}
        />
      </div>
      <span>Estado: Optimo</span>
      <br />
      <span>Presion Actual: {pressure} psi</span>
      <br />
      <span>Cambios realizados en el dia: 10 cambios</span>
    </div>
  );
}
