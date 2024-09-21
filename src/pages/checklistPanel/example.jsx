import React, { useState } from "react";
import { NavbarCommon } from "../../common/navbarCommon";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export function Example() {
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
        <div style={{ margin: "20px 0" }}></div>
        <h1>Inspección diaria de unidades ({type})</h1>

        {/* Panel de Documentación del Vehículo y Operador/Conductor */}
        <div style={{ margin: "20px 0", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
          <h3>1 | DOCUMENTACIÓN DEL VEHÍCULO Y OPERADOR / CONDUCTOR</h3>
          <p>
            ¿El vehículo cuenta con la documentación completa y vigente física o digital según reglamentación de Perú? (Tarjeta de propiedad,
            Inspección Técnica, Tarjeta de transporte de mercancías, SOAT, Licencia, conducción manejo defensivo)
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <Button variant="success">Bueno</Button>
            <Button variant="danger">Malo</Button>
          </div>
        </div>

        {/* 2 | Niveles y Fugas */}
        <div style={{ margin: "20px 0", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
          <h3>2 | NIVELES Y FUGAS</h3>
          <p>
            El vehículo cuenta con todos sus niveles adecuados (Combustible: Gasolina, Diesel, Urea, Gas o GLP, Refrigerante, Aceite Motor, Líquido de
            frenos (si aplica), Aceite Dirección, Líquido del Embrague, Agua Limpiabrisas) y sin fugas de aceite en caja, transmisión y diferencial.
            Se drena la trampa de agua en el combustible (si aplica o se requiere).
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <Button variant="success">Bueno</Button>
            <Button variant="danger">Malo</Button>
          </div>
        </div>

        {/* 3 | Sistema Audible / Sonoro */}
        <div style={{ margin: "20px 0", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
          <h3>3 | SISTEMA AUDIBLE / SONORO</h3>
          <p>¿El sistema audible está en buen estado y funciona correctamente? (Bocina o claxon y alarma de reversa)</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <Button variant="success">Bueno</Button>
            <Button variant="danger">Malo</Button>
          </div>
        </div>

        {/* 4 | Vidrios y Espejos */}
        <div style={{ margin: "20px 0", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
          <h3>4 | VIDRIOS Y ESPEJOS</h3>
          <p>
            ¿Todos los vidrios y espejos están en buen estado y funcionan correctamente? (Vidrio panorámico/parabrisas, limpiabrisas, espejos
            laterales/principales, espejos auxiliares, vidrios de puertas, laterales y traseros de cabina).
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <Button variant="success">Bueno</Button>
            <Button variant="danger">Malo</Button>
          </div>
        </div>

        {/* 5 | Cabina */}
        <div style={{ margin: "20px 0", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
          <h3>5 | CABINA</h3>
          <p>
            ¿El vehículo cuenta con sus puntos de apoyo, asientos, cinturón de seguridad por cada asiento en buen estado y no presenta indicadores de
            tablero encendidos?
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <Button variant="success">Bueno</Button>
            <Button variant="danger">Malo</Button>
          </div>
        </div>

        {/* 6 | Equipo de Carretera */}
        <div style={{ margin: "20px 0", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
          <h3>6 | EQUIPO DE CARRETERA</h3>
          <p>
            ¿El vehículo cuenta con el equipo de carretera en buen estado, completo y vigente según reglamentación? (Gato/Gata, Llave de ruedas y
            palanca, extintor, botiquín, conos, tacos, carretillas, llanta de repuesto)
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <Button variant="success">Bueno</Button>
            <Button variant="danger">Malo</Button>
          </div>
        </div>

        {/* 7 | Sistema de Iluminación */}
        <div style={{ margin: "20px 0", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
          <h3>7 | SISTEMA DE ILUMINACIÓN</h3>
          <p>
            ¿El sistema de iluminación está en buen estado y funciona correctamente? (Luces de: unidades altas y bajas, freno, reversa, direccionales,
            estacionarias de parqueo o intermitentes, delimitadoras o de ruta si aplica)
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <Button variant="success">Bueno</Button>
            <Button variant="danger">Malo</Button>
          </div>
        </div>

        {/* 8 | Llantas */}
        <div style={{ margin: "20px 0", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
          <h3>8 | LLANTAS</h3>
          <p>
            ¿Todas las llantas se encuentran en buen estado? (Presión, milimetraje/profundidad, banda de rodamiento, costados de la llanta, pernos o
            tuercas)
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <Button variant="success">Bueno</Button>
            <Button variant="danger">Malo</Button>
          </div>
        </div>

        {/* 9 | Carrocería */}
        <div style={{ margin: "20px 0", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
          <h3>9 | CARROCERÍA</h3>
          <p>
            El vehículo cuenta con su carrocería en buen estado y funcional? (Cortinas, correa para cierre de cortina, sistema anticaida de cortina si
            aplica, chapas o seguros de cortinas/carpas, carpas, sistema de rieles y rodamientos de carpas, filtración de agua a la carrocería, bumper
            o defensa delantera, bumper o defensa trasera, porta carretillas/diablos, planchas/bandeja o escalera de acceso, correas de
            amarre/varillas de sujeción de carga si aplica, mamparas - divisiones de bahías)
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <Button variant="success">Bueno</Button>
            <Button variant="danger">Malo</Button>
          </div>
        </div>

        {/* 10 | Señalización */}
        <div style={{ margin: "20px 0", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
          <h3>10 | SEÑALIZACIÓN (CINTAS REFLECTIVAS Y STICKER/CALCOMANÍAS)</h3>
          <p>
            El vehículo cuenta con todos sus avisos y calcomanías completas y en buen estado? (Prevención de la violencia, estándar de 5s, capacidad
            de carga del vehículo, identificación - placas reflectivas en puertas, EPPS, puntos de apoyo y rombo de seguridad, estándar de presión de
            neumáticos)
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <Button variant="success">Bueno</Button>
            <Button variant="danger">Malo</Button>
          </div>
        </div>

        {/* 11 | EXTERIOR */}
        <div style={{ margin: "20px 0", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
          <h3>11 | EXTERIOR</h3>
          <p>¿El vehículo se encuentra en optimas condiciones, libre de golpes, rayones y abolladuras en cabina y carrocería?</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <Button variant="success">Bueno</Button>
            <Button variant="danger">Malo</Button>
          </div>
        </div>

        {/* 12 | EQUIPOS DE CARGUE Y DESCARGUE */}
        <div style={{ margin: "20px 0", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
          <h3>12 | EQUIPOS DE CARGUE Y DESCARGUE</h3>
          <p>
            Los equipos de cargue y descargue ( carretillas / diablitos, jetpallet, buggie ) se encuentran completos, funcionales y en buen estado?⚠️
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <Button variant="success">Bueno</Button>
            <Button variant="danger">Malo</Button>
          </div>
        </div>

        {/* 13 | PROGRAMA (5S) */}
        <div style={{ margin: "20px 0", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
          <h3>13 | PROGRAMA (5S)</h3>
          <p>Se le aplica 5S ( orden, limpieza ) al vehículo?</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <Button variant="success">Bueno</Button>
            <Button variant="danger">Malo</Button>
          </div>
        </div>

        {/* 14 | SISTEMA DE DIRECCIÓN */}
        <div style={{ margin: "20px 0", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
          <h3>14 | SISTEMA DE DIRECCIÓN</h3>
          <p>Encienda el motor del vehículo para verificar los siguentes items: </p>

          <p>¿El sistema de dirección esta en buen estado y funciona correctamente? ( Ruido anormal, vibración o juego anormal )⚠️</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <Button variant="success">Bueno</Button>
            <Button variant="danger">Malo</Button>
          </div>
        </div>

        {/* 15 | SISTEMA DE FRENOS */}
        <div style={{ margin: "20px 0", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
          <h3>15 | SISTEMA DE FRENOS</h3>
          <p>Encienda el motor del vehículo para verificar los siguentes items: </p>

          <p>
            ¿El sistema de frenos esta en buen estado y funciona correctamente? ( Fuga de aire o líquido de frenos, bajo nivel de aire o líquido de
            frenos, ruido anormal en los frenos, juego anormal en pedal de freno, frenos largos, protector de pedal de freno, freno de estacionamiento
            o parqueo.⚠️
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <Button variant="success">Bueno</Button>
            <Button variant="danger">Malo</Button>
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

        {/* Continuar con las demás secciones... */}
      </div>
    </div>
  );
}
