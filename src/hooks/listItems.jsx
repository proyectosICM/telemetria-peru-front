import axios from "axios";
import { useEffect, useState } from "react";

function getAuthHeaders() {
  const token = localStorage.getItem("tp_token");
  if (!token) {
    console.error("Token not available. Please log in.");
    throw new Error("Token not available. Please log in.");
  }
  return {
    Authorization: `Bearer ${token}`,
  };
}
 
export function ListItems(url, setData, setError) {
  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}`, {
        headers: getAuthHeaders(),
      });
      setData(response.data);
      setError(null);
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  fetchData();
}

export function ListItemsPaginated(url, pageNumber, parameters = {}) {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageError, setPageError] = useState(null);

  // Función para construir la URL con parámetros
  const buildURL = (url, pageNumber, parameters) => {
    const queryParams = new URLSearchParams({ page: pageNumber, ...parameters });
    return `${url}?${queryParams.toString()}`;
  };

  const fetchData = async (pageNumber) => {
    try {
      const finalURL = buildURL(url, pageNumber, parameters);
      const response = await axios.get(finalURL, {
        headers: getAuthHeaders(),
      });
      setData(response.data.content);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.number);
      setPageError(null);
    } catch (error) {
      console.error("Error listing items", error);
      setPageError(error);
    }
  };

  useEffect(() => {
    fetchData(pageNumber);
  }, [pageNumber, parameters]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData(pageNumber);
    }, 1000);

    return () => clearInterval(intervalId);
  });

  return { data, totalPages, currentPage, setCurrentPage, fetchData, pageError };
}
