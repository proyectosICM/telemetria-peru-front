import axios from "axios";

export function agregarElementoAPI(url, requestData) {
  const token = localStorage.getItem("token");

  axios
    .post(url, requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((error) => {
      console.log(error);
    });
}
