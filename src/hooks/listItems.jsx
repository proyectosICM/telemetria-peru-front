import axios from "axios";
import { useEffect, useState } from "react";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token not available. Please log in.");
    throw new Error("Token not available. Please log in.");
  }
  return {
    Authorization: `Bearer ${token}`,
  };
}

export function ListItems(url, setData) {
  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}`, {
        headers: getAuthHeaders(),
      });
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}

export function ListItemsPaginated(url, pageNumber) {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async (pageNumber) => {
    try {
      const response = await axios.get(`${url}?page=${pageNumber}`, {
        headers: getAuthHeaders(),
      });
      setData(response.data.content);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.number);
      // console.log(response.data);
    } catch (error) {
      console.error("Error listing items", error);
    }
  };

  useEffect(() => {
    fetchData(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData(pageNumber);
    }, 1000);

    return () => clearInterval(intervalId);
  });

  return { data, totalPages, currentPage, setCurrentPage, fetchData };
}
