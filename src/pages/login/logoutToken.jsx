import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export function LogoutToken() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentDate = new Date();

      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        console.log("El token ha expirado");
        localStorage.removeItem("token");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return null;
}