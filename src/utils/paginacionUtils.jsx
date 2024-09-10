import { Button } from "react-bootstrap";

export function PaginacionUtils({ setPageNumber, setCurrentPage, currentPage, totalPages }) {
  const goToPreviousPage = () => {
    setPageNumber((prevPage) => (prevPage > 0 ? prevPage - 1 : prevPage));
    setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : prevPage)); 
  };

  const goToNextPage = () => {
    setPageNumber((prevPage) => (prevPage < totalPages - 1 ? prevPage + 1 : prevPage));
    setCurrentPage((prevPage) => (prevPage < totalPages - 1 ? prevPage + 1 : prevPage)); 
  };

  return (
    <div style={{ marginTop: "30px", marginBottom: "30px", width: "100%", userSelect: "none" }}>
      <Button onClick={goToPreviousPage} disabled={currentPage === 0}>
        Anterior
      </Button>
      <span style={{ margin: "0 10px", color: "white" }}>
        Página {currentPage + 1} de {totalPages}
      </span>
      <Button onClick={goToNextPage} disabled={currentPage === totalPages - 1}>
        Siguiente
      </Button>
    </div>
  );
}