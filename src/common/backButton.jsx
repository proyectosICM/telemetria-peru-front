import React from "react";
import { Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function BackButton({ path }) {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(path)} className="back-button">
      <FaArrowLeft style={{ marginRight: "5px" }} /> Atras
    </Button>
  );
}
