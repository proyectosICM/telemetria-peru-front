import axios from "axios";
import { useEffect, useState } from "react";

export function ListItems(url, setData) {
  const fetchData = async () => {
    try {
      const token = await localStorage.getItem("token");
      const response = await axios.get(`${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}

/*
export function ListItemsPaginated(url, setData, page) {
  const fetchData = async () => {
    try {
      const token = await localStorage.getItem("token");
      const response = await axios.get(`${url}?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.content);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}
*/

export function ListItemsPaginated(url, pageNumber) {
  const [datos, setDatos] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async (pageNumber) => {
    try {
      const token = await localStorage.getItem("token");
      const response = await axios.get(`${url}?page=${pageNumber}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDatos(response.data.content);
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

  return { datos, totalPages, currentPage, setCurrentPage, fetchData };
}
