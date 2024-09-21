import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NavbarCommon } from "../../common/navbarCommon";
import { Button, Form } from "react-bootstrap";

export function Example2() {
  const navigate = useNavigate();
  const [observaciones, setObservaciones] = useState("");
  const { type } = useParams();
  return (
    <div className="g-background">
      <NavbarCommon />
      <Button onClick={() => navigate("/checklist-panel")} className="back-button">
        Atras
      </Button>
      <div style={{ margin: "2px 10%", padding: "2px 10%", border: "2px solid white" }}>
        {/* Sección para el nombre del conductor */}
        <div style={{ margin: "20px 0" }}>
          <h2>Nombre del conductor:</h2>
          <Form.Control type="text" placeholder="Ingrese el nombre del conductor" />
        </div>

        {/* Kilometraje de la unidad */}
        <div style={{ margin: "20px 0" }}>
          <h2>Kilometraje de la unidad:</h2>
          <Form.Control type="text" placeholder="Ingrese el kilometraje de la unidad" />
        </div>

        {/* Título de Inspección vehicular de salida */}
        <div style={{ margin: "20px 0" }}>
          <h1>Inspección diaria de unidad ({type})</h1>
        </div>

        {/* Sección 1: Documentación */}
        <div style={{ margin: "20px 0", backgroundColor: "black", color: "white", padding: "20px", border: "2px solid white", borderRadius: "10px" }}>
          <h3>1 | Documentación</h3>
          <div className="row">
            <div style={{ borderBottom: "1px solid white", margin: "30px 0" }}></div>
            <div className="col-md-6">
              <p>Tarjeta de propiedad</p>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Button variant="success">Bueno</Button>
                <Button variant="danger">Malo</Button>
              </div>
            </div>
            <div className="col-md-6">
              <p>SOAT</p>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Button variant="success">Bueno</Button>
                <Button variant="danger">Malo</Button>
              </div>
            </div>
            <div style={{ borderBottom: "1px solid white", margin: "30px 0" }}></div>
            <div className="col-md-6">
              <p>Permiso Municipal N/A</p>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Button variant="success">Bueno</Button>
                <Button variant="danger">Malo</Button>
              </div>
            </div>
            <div className="col-md-6">
              <p>Certificado de inspección técnica - N/A</p>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Button variant="success">Bueno</Button>
                <Button variant="danger">Malo</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Sección 2: Carrocería */}
        <div style={{ margin: "20px 0", backgroundColor: "black", color: "white", padding: "20px", border: "2px solid white", borderRadius: "10px" }}>
          <h3>2 | Carrocería</h3>
          <div className="row">
            <div style={{ borderBottom: "1px solid white", margin: "30px 0" }}></div>
            <div className="col-md-6">
              <p>Seguros de compuerta posterior</p>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Button variant="success">Bueno</Button>
                <Button variant="danger">Malo</Button>
              </div>
            </div>
            <div className="col-md-6">
              <p>Pisadera de compuerta posterior</p>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Button variant="success">Bueno</Button>
                <Button variant="danger">Malo</Button>
              </div>
            </div>
            <div style={{ borderBottom: "1px solid white", margin: "30px 0" }}></div>
            <div className="col-md-6">
              <p>Estructura de furgon</p>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Button variant="success">Bueno</Button>
                <Button variant="danger">Malo</Button>
              </div>
            </div>
            <div className="col-md-6">
              <p>Caja fuerte</p>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Button variant="success">Bueno</Button>
                <Button variant="danger">Malo</Button>
              </div>
            </div>
          </div>
        </div>

        {/* 3 | Sistema Mecánico - Eléctrico */}
        <div style={{ margin: "20px 0", backgroundColor: "black", color: "white", padding: "20px", border: "2px solid white", borderRadius: "10px" }}>
          <h3 style={{ textAlign: "center" }}>3 | Sistema Mecánico - Eléctrico</h3>
          <div className="row" style={{ justifyContent: "center" }}>
            <div style={{ borderBottom: "1px solid white", margin: "30px 0", width: "100%" }}></div>
            <div className="col-md-6">
              <p style={{ textAlign: "center" }}>Funcionamiento de frenos de servicio</p>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Button variant="success">Bueno</Button>
                <Button variant="danger">Malo</Button>
              </div>
            </div>
            <div className="col-md-6">
              <p style={{ textAlign: "center" }}>Funcionamiento de pedales de cambio</p>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Button variant="success">Bueno</Button>
                <Button variant="danger">Malo</Button>
              </div>
            </div>
            <div style={{ borderBottom: "1px solid white", margin: "30px 0", width: "100%" }}></div>
            <div className="col-md-6">
              <p style={{ textAlign: "center" }}>Fugas de aceite (motor y transmisión)</p>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Button variant="success">Bueno</Button>
                <Button variant="danger">Malo</Button>
              </div>
            </div>
            <div className="col-md-6">
              <p style={{ textAlign: "center" }}>Arranque (arrancador, alternador y batería)</p>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Button variant="success">Bueno</Button>
                <Button variant="danger">Malo</Button>
              </div>
            </div>
            <div style={{ borderBottom: "1px solid white", margin: "30px 0", width: "100%" }}></div>
            <div className="col-md-6">
              <p style={{ textAlign: "center" }}>Funcionamiento del ventilador de refrigeración</p>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Button variant="success">Bueno</Button>
                <Button variant="danger">Malo</Button>
              </div>
            </div>
          </div>
        </div>

        {/* 4 | Líquidos */}
        <div style={{ margin: "20px 0", backgroundColor: "black", color: "white", padding: "20px", border: "2px solid white", borderRadius: "10px" }}>
          <h3 style={{ textAlign: "center" }}>4 | Líquidos</h3>
          <div className="row" style={{ justifyContent: "center" }}>
            <div style={{ borderBottom: "1px solid white", margin: "30px 0", width: "100%" }}></div>
            <div className="col-md-6">
              <p style={{ textAlign: "center" }}>NIVEL DE COMBUSTIBLE FINAL (GAL) 90 Oct.</p>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Button variant="success">Bueno</Button>
                <Button variant="danger">Malo</Button>
              </div>
            </div>
            <div style={{ borderBottom: "1px solid white", margin: "30px 0", width: "100%" }}></div>
          </div>
        </div>

        {/* 16 | Observaciones - si marco "NO" arriba - describir */}
        <div style={{ margin: "20px 0", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
          <h3>16 | Observaciones - si marcó "Malo" arriba - describir</h3>
          <p>Por favor, describa el problema encontrado en el sistema de frenos:</p>
          <Form.Group controlId="observaciones">
            <Form.Label>Observaciones:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Escribe tus observaciones aquí..."
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
            />
          </Form.Group>
        </div>
      </div>
    </div>
  );
}
