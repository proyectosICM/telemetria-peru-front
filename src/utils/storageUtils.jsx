// src/utils/storageUtils.js

export const clearLocalStorage = () => {
  // Eliminar el token
  localStorage.removeItem("token");
  // Eliminar el resto de localStorages
  localStorage.removeItem("rolId");
  localStorage.removeItem("companyId");
  localStorage.removeItem("userId");
};
