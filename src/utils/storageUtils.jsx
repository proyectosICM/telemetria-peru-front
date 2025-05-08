// src/utils/storageUtils.js

export const clearLocalStorage = () => {
  // Eliminar el token
  localStorage.removeItem("tp_token");
  // Eliminar el resto de localStorages
  localStorage.removeItem("tp_rolId");
  localStorage.removeItem("tp_companyId");
  localStorage.removeItem("tp_userId");
};
