import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL, loginURL } from "../../api/apiurls";



export const useAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
  }); 

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post(loginURL, {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("Username", username);
      navigate("/redirectandW", { state: { username } });
    } catch (error) {
      setError("Error en la autenticación");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { login, isLoading, error };
};