// hooks/useSaveItem.js
import { useNavigate } from "react-router-dom";
import { alertMessageCreated, alertMessageEdited, alertMessageError } from "../messages/apiResponseMessages";
import { editItem } from "./editItem";
import { addElementAPI } from "./addItem";

export const useSaveItem = (url, navigateTo) => {
  const navigate = useNavigate();

  const saveItem = async (id, requestData) => {
    try {
      let response;
      if (id) {
        response = await editItem(`${url}/${id}`, requestData);
        alertMessageEdited(response.status);
      } else {
        response = await addElementAPI(url, requestData);
        alertMessageCreated(response.status);
      }
      await navigate(navigateTo);
    } catch (error) {
      console.error("Error al guardar el elemento:", error);
      alertMessageError(error);
    }
  };

  return { saveItem };
};
