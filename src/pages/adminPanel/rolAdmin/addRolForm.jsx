import React, { useState } from "react";
import { NavbarCommon } from "../../../common/navbarCommon";
import { useNavigate } from "react-router-dom";

export function AddRolForm() {
  const navigate = useNavigate();

  const rolId = localStorage.getItem("rolId");
  const companyId = localStorage.getItem("companyId");

  const [rolData, setRolData] = useState();
    
  return (
    <div>
      <NavbarCommon />
    </div>
  );
}
