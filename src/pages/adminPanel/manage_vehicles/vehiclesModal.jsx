import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useGetFuelTypes } from "../../../api/hooks/useVehicle";
import { useGetVehicleTypes } from "../../../api/hooks/useVehicleType";

export function VehiclesModal({
  showModal,
  handleCloseModal,
  selectedGroup,
  data,
  setData,
  handleSaveOrUpdate,
}) {
  const {
    data: fuelTypes,
    isLoading: fuelLoading,
    isError: fuelError,
  } = useGetFuelTypes();
  const {
    data: vehicleTypes,
    isLoading: typeLoading,
    isError: typeError,
  } = useGetVehicleTypes();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Para alternar canales de video (1..8)
  const handleChannelToggle = (channel) => {
    setData((prev) => {
      const current = new Set(prev.videoChannels || []);
      if (current.has(channel)) {
        current.delete(channel);
      } else {
        current.add(channel);
      }
      return {
        ...prev,
        videoChannels: Array.from(current).sort((a, b) => a - b),
      };
    });
  };

  const hasDvr = data.dvrPhone && data.dvrPhone.trim() !== "";

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          {selectedGroup ? "Editar Vehículo" : "Agregar Vehículo"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="p-4">
          {/* Placa */}
          <Form.Group controlId="licensePlate" className="mb-3">
            <Form.Label>Placa</Form.Label>
            <Form.Control
              type="text"
              name="licensePlate"
              placeholder="Ingrese la placa del vehículo"
              value={data.licensePlate || ""}
              onChange={handleChange}
            />
          </Form.Group>

          {/* IMEI */}
          <Form.Group controlId="imei" className="mb-3">
            <Form.Label>IMEI</Form.Label>
            <Form.Control
              type="text"
              name="imei"
              placeholder="Ingrese el IMEI del dispositivo"
              value={data.imei || ""}
              onChange={handleChange}
            />
          </Form.Group>

          {/* DVR Phone */}
          <Form.Group controlId="dvrPhone" className="mb-3">
            <Form.Label>Teléfono DVR (JT1078)</Form.Label>
            <Form.Control
              type="text"
              name="dvrPhone"
              placeholder="Ej: 000012345678"
              value={data.dvrPhone || ""}
              onChange={handleChange}
            />
            <Form.Text muted>
              Si lo dejas vacío, el vehículo no tendrá video asociado.
            </Form.Text>
          </Form.Group>

          {/* Canales de video */}
          <fieldset className="mb-3">
            <Form.Label>Canales de video disponibles</Form.Label>
            <div className="d-flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((ch) => (
                <Form.Check
                  key={ch}
                  type="checkbox"
                  id={`channel-${ch}`}
                  label={`Canal ${ch}`}
                  checked={(data.videoChannels || []).includes(ch)}
                  onChange={() => handleChannelToggle(ch)}
                  disabled={!hasDvr}
                />
              ))}
            </div>
            <Form.Text muted>
              Solo se utilizarán si hay un DVR Phone configurado. Si borras el
              DVR, los canales se limpiarán en el backend.
            </Form.Text>
          </fieldset>

          {/* Tipo de combustible */}
          <Form.Group controlId="fuelType" className="mb-3">
            <Form.Label>Tipo de combustible</Form.Label>
            <Form.Select
              name="fuelType"
              value={data.fuelType || ""}
              onChange={handleChange}
              disabled={fuelLoading || fuelError}
            >
              <option value="">Seleccione un tipo de combustible</option>
              {fuelTypes &&
                fuelTypes.map((fuel) => (
                  <option key={fuel} value={fuel}>
                    {fuel}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>

          {/* Velocidad máxima */}
          <Form.Group controlId="maxSpeed" className="mb-3">
            <Form.Label>Velocidad máxima del dispositivo</Form.Label>
            <Form.Control
              type="number"
              name="maxSpeed"
              placeholder="Ingrese la velocidad máxima del dispositivo"
              value={data.maxSpeed || ""}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Tipo de vehículo */}
          <Form.Group controlId="vehicleType" className="mb-3">
            <Form.Label>Tipo de vehículo</Form.Label>
            <Form.Select
              name="vehicleTypeId"
              value={data.vehicleTypeId || ""}
              onChange={handleChange}
              disabled={typeLoading || typeError}
            >
              <option value="">Seleccione un tipo de vehículo</option>
              {vehicleTypes &&
                vehicleTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSaveOrUpdate}>
          {selectedGroup ? "Actualizar" : "Guardar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
