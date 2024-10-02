import React, { useEffect, useState } from "react";
import { NavbarCommon } from "../../common/navbarCommon";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { checklistJSONURL, ImagesCLIdURL, ImagesCLNameViewURL } from "../../api/apiurls";
import { ListItems } from "../../hooks/listItems";

export function VerCL() {
  const navigate = useNavigate();
  const { idcl } = useParams();
  const [jsonContent, setJsonContent] = useState(null);
  const [imagesURL, setImagesURL] = useState(null);
  //const [error, setError] = useState(null); // Estado para almacenar errores
  //ImagesCLNameViewURL //variable qie contiene sdominio/api/images-cl/images
  useEffect(() => {
    ListItems(`${checklistJSONURL}/${idcl}`, setJsonContent);
  }, [idcl]);

  useEffect(() => {
    ListItems(`${ImagesCLIdURL}/${idcl}`, setImagesURL);
  }, [idcl]);

  const renderJsonContent = (data) => {
    return Object.keys(data).map((key) => (
      <div key={key} style={{ marginBottom: "15px", padding: "10px", border: "1px solid white", borderRadius: "8px" }}>
        <h4 style={{ color: "white" }}>{key}</h4>
        <ul style={{ listStyleType: "none", padding: "0" }}>
          {Object.entries(data[key]).map(([subKey, value]) => (
            <li key={subKey} style={{ color: "lightgray" }}>
              <strong>{subKey}:</strong> {renderValue(value)}
            </li>
          ))}
        </ul>
      </div>
    ));
  };

  // Función para renderizar el valor con colores específicos
  const renderValue = (value) => {
    const styles = {
      Bueno: { color: "green", fontWeight: "bold" },
      Malo: { color: "red", fontWeight: "bold" },
      "N/A": { color: "orange", fontWeight: "bold" },
    };

    return <span style={styles[value] || { color: "lightgray" }}>{value}</span>;
  };

  const renderImages = (images) => {
    console.log(images);
    console.log(`${ImagesCLNameViewURL}?filename=`);
    return (
      <div style={{ marginTop: "20px" }}>
        <h4 style={{ color: "white" }}>Imágenes Asociadas:</h4>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
          {images.map((image) => (
            <div key={image.id} style={{ marginBottom: "10px", color: "lightgray", flex: "1 0 calc(33.333% - 10px)", margin: "5px" }}>
              <img
                src={`${ImagesCLNameViewURL}?filename=${image.urlImage}`} // Asegúrate de que este sea el endpoint correcto
                alt={image.urlImage}
                style={{ width: "100%", height: "auto", borderRadius: "8px" }} // Ajustar el tamaño aquí
              />
            </div>
          ))}
        </div>
      </div>
    );
  };
  

  return (
    <div className="g-background" style={{ backgroundColor: "black", color: "white", minHeight: "100vh" }}>
      <NavbarCommon />
      <Button onClick={() => navigate("/checklist-panel")} className="back-button" style={{ margin: "20px" }}>
        Atrás
      </Button>
      <div style={{ margin: "20px 10%", padding: "20px", border: "2px solid white", borderRadius: "8px" }}>
        {/*error && <p style={{ color: "red", textAlign: 'center' }}>{error}</p>} {/* Mostrar error si hay */}
        {jsonContent && renderJsonContent(jsonContent)}
        {imagesURL && renderImages(imagesURL)}
      </div>
    </div>
  );
}
