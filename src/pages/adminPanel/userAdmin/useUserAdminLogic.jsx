import { useState } from "react";
import { ListItemsPaginated } from "../../../hooks/listItems";
import { userRoutes, UserURL } from "../../../api/apiurls";
import { alertDeleteConfirmation, alertFailedfulDeleted, alertSuccessfulDeleted } from "../../../messages/apiResponseMessages";
import { deleteItem } from "../../../hooks/deleteItem";

export function useUserAdminLogic() {
  const [pageNumber, setPageNumber] = useState(0);
  const { datos, totalPages, currentPage, setCurrentPage } = ListItemsPaginated(`${userRoutes.paged}`, pageNumber);

  const handleDelete = async (id) => {
    try {
      const result = await alertDeleteConfirmation();
      if (result.isConfirmed) {
        const response = await deleteItem(`${userRoutes.base}/${id}`);
        if (response.status === 204) {
          alertSuccessfulDeleted();
        }
      }
    } catch (error) {
      alertFailedfulDeleted();
    }
  };

  return {
    datos,
    totalPages,
    currentPage,
    setCurrentPage,
    setPageNumber,
    handleDelete,
  };
}
