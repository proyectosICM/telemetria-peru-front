import { useState } from "react";
import {  companyRoutes } from "../../../api/apiurls";
import { ListItemsPaginated } from "../../../hooks/listItems";
import { deleteItem } from "../../../hooks/deleteItem";
import { alertDeleteConfirmation, alertFailedfulDeleted, alertSuccessfulDeleted } from "../../../messages/apiResponseMessages";

export function useCompanyAdminLogic() {
  const [pageNumber, setPageNumber] = useState(0);
  const { data, totalPages, currentPage, setCurrentPage } = ListItemsPaginated(`${companyRoutes.paged}`, pageNumber);

  const handleDelete = async (id) => {
    try {
      const result = await alertDeleteConfirmation();
      if (result.isConfirmed) {
        const response = await deleteItem(`${companyRoutes.base}/${id}`);
        if (response.status === 204) {
          alertSuccessfulDeleted();
        }
      }
    } catch (error) {
      alertFailedfulDeleted();
    }
  };

  return {
    data,
    totalPages,
    currentPage,
    setCurrentPage,
    setPageNumber,
    handleDelete,
  };
}
