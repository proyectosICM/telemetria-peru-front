import React from "react";
import { NavbarCommon } from "../../../common/navbarCommon";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function IssuesRecords() {
  const navigate = useNavigate();
  
  return (
    <div>
      <NavbarCommon />
      <Button onClick={() => navigate("/")} className="back-button">
        Atras
      </Button>
    </div>
  );
}
