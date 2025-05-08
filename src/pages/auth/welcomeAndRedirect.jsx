import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutToken } from "../../hooks/logoutToken";
import { getInfoUser } from "../../api/services/userService";


export function WelcomeAndRedirect() {
  const navigate = useNavigate();
  const username = localStorage.getItem("tp_username");

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const info = await getInfoUser(username);
        localStorage.setItem("tp_rolId", info.roleModel.id);
        localStorage.setItem("tp_companyId", info.companyModel.id);
        localStorage.setItem("tp_userId", info.id);

        let path = "/";
        switch (info.roleModel.id) {
          case "1":
          case "2":
          case "3":
          case "4":
            path = "/";
            break;
          default:
            path = "/";
            break;
        }

        navigate(path);
      } catch (error) {
        console.error("No se pudo obtener la información del usuario:", error);
        // Puedes redirigir a login o mostrar mensaje si quieres
      }
    };

    fetchInfo();
  }, [username, navigate]);

  LogoutToken(); // Asegúrate que no dependa de estado o efecto

  return null;
}
