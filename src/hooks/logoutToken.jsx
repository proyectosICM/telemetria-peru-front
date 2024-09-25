import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { clearLocalStorage } from "../utils/storageUtils";
import Swal from "sweetalert2"; // Importa SweetAlert2

export function LogoutToken() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentDate = new Date();

      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        console.log("El token ha expirado");

        // Muestra la alerta de SweetAlert2
        Swal.fire({
          icon: "warning",
          title: "Sesión expirada",
          text: "Tu sesión ha expirado. Por favor, inicia sesión de nuevo.",
          confirmButtonText: "Aceptar",
        }).then(() => {
          clearLocalStorage();
          navigate("/login");
        });
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return null;
}
