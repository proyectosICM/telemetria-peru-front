import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { clearLocalStorage } from "../utils/storageUtils";
import Swal from "sweetalert2"; // Importa SweetAlert2
import { alertMessageExpiredToken } from "../messages/apiResponseMessages";

export function LogoutToken() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("tp_token");
    if (token) { 
      try{
        const decodedToken = jwtDecode(token);
        const currentDate = new Date();
  
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          console.log("Token has expired");
  
  
          alertMessageExpiredToken().then(() => {
            clearLocalStorage();
            navigate("/login");
          });
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        clearLocalStorage();
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return null;
}

