import Swal from "sweetalert2";

// Cambia la función para recibir `navigate` como un argumento
export const handleRecordsMessage = (navigate, showAlert, path) => {
  if (showAlert) {
    Swal.fire({
      title: "¿Desea ver los registros detallados?",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(path);
      }
    });
  } else {
    navigate(path);
  }
};
