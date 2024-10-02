import { useState } from "react";

export function useImageHandler() {
  const [imagenes, setImagenes] = useState([]);

  // Funcion para agregar imagenes a la variable de estado
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImagenes((prevImagenes) => [...prevImagenes, ...files]);
  };

  // Funcion para eliminar imagenes a la variable de estado
  const handleRemoveImage = (index) => {
    setImagenes((prevImagenes) => prevImagenes.filter((_, i) => i !== index));
  };

  return {
    imagenes,
    handleImageChange,
    handleRemoveImage,
  };
}
