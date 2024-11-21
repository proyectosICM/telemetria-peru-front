import React from "react";
import { Table } from "react-bootstrap";
import { FaHashtag, FaCalendarAlt, FaClock, FaCarAlt, FaToggleOn } from "react-icons/fa";
import { getDateFromTimestamp, getTimeFromTimestamp } from "../../utils/formatUtils";

export function IgnitionRecordsTable({ data }) {
  return (
    <div style={{ margin: "10px", width: "90%" }}>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>
              <FaHashtag style={{ marginRight: "8px" }} />
              #
            </th>
            <th>
              <FaCalendarAlt style={{ marginRight: "8px" }} />
              Día
            </th>
            <th>
              <FaClock style={{ marginRight: "8px" }} />
              Hora
            </th>
            <th>
              <FaCarAlt style={{ marginRight: "8px" }} />
              Placa
            </th>
            <th>
              <FaToggleOn style={{ marginRight: "8px" }} />
              Estado
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((d, index) => (
              <tr key={index}>
                <td>{d.id}</td>
                <td>{getDateFromTimestamp(d.createdAt)}</td>
                <td>{getTimeFromTimestamp(d.createdAt)}</td>
                <td>{d.vehicleModel.licensePlate}</td>
                <td>{d.status ? "Encendido" : "Apagado"}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
