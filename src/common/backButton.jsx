import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function BackButton({ path }) {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(path)} className="back-button">
      Atrás
    </Button>
  );
}
