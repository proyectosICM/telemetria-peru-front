import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LogoutToken } from "../../hooks/logoutToken";
import { InfoUserURL } from "../../api/apiurls";
import { ListItems } from "../../hooks/listItems";

export function WelcomeAndRedirect() {
  const navigate = useNavigate();
  const username = localStorage.getItem("Username");

  const [info, setInfo] = useState(null);

  useEffect(() => {
    ListItems(`${InfoUserURL}${username}`, setInfo);
  }, [username]);

  LogoutToken();

  useEffect(() => {
    if (info) {
      localStorage.setItem("rolId", info.roleModel.id);
      localStorage.setItem("companyId", info.companyModel.id);
      localStorage.setItem("userId", info.id);

      let path;
      switch (info.roleModel.id) {
        case "1":
          path = "/";
          break;
        case "2":
          path = "/";
          break;
        case "3":
          path = "/";
          break;
        case "4":
          path = "/";
          break;
        default:
          path = "/";
          break;
      }
      navigate(path);
    }
  }, [info, navigate]);

  return null;
}
