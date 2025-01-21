import Swal from "sweetalert2";

export function alertMessageValidated(value, message) {
  if (!value.trim()) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: `${message}`,
    });
    throw new Error(message);
  }
}

export function alertMessageUnauthorized(status) {
  if (status === 403) {
    Swal.fire({
      icon: "error",
      title: "Acceso denegado",
      text: `No tienes los permisos necesarios para realizar esta acción.`,
    });
  }
}

export function alertMessageCreated(status) {
  if (status === 201) {
    Swal.fire({
      icon: "success",
      title: "Éxito",
      text: `Registro agregado con éxito `,
    });
  }
}

export function alertMessageEdited(status) {
  if (status === 200) {
    Swal.fire({
      icon: "success",
      title: "Éxito",
      text: `Registro editado con éxito `,
    });
  }
}

export function alertMessageError(error) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: `Hubo un error al guardar los datos. Inténtalo nuevamente.`,
  });
}

export function alertMessageExpiredToken() {
  return Swal.fire({
    icon: "warning",
    title: "Sesión expirada",
    text: "Tu sesión ha expirado. Por favor, inicia sesión de nuevo.",
    confirmButtonText: "Aceptar",
  });
}

export function alertDeleteConfirmation() {
  return Swal.fire({
    title: "¿Estás seguro?",
    text: "Esto eliminará este registro y todos los registros asociados de manera directa.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
  });
}

export function alertSuccessfulDeleted() {
  Swal.fire("Eliminado!", "El registro ha sido eliminado.", "success");
}

export function alertFailedfulDeleted() {
  Swal.fire("Error!", "Hubo un problema al eliminar el registro. Inténtalo de nuevo.", "error");
}
