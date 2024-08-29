import axios from "axios";

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