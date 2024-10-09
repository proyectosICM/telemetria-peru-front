import { useState } from "react";
import { companiesPageURL, companiesURL } from "../../../api/apiurls";
import { ListItemsPaginated } from "../../../hooks/listItems";
import { deleteItem } from "../../../hooks/deleteItem";
import { alertDeleteConfirmation, alertFailedfulDeleted, alertSuccessfulDeleted } from "../../../messages/apiResponseMessages";

export function useCompanyAdminLogic() {
  const [pageNumber, setPageNumber] = useState(0);
  const { datos, totalPages, currentPage, setCurrentPage } = ListItemsPaginated(`${companiesPageURL}`, pageNumber);

  const handleDelete = async (id) => {
    try {
      const result = await alertDeleteConfirmation();
      if (result.isConfirmed) {
        const response = await deleteItem(`${companiesURL}/${id}`);
        console.log(response)
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
