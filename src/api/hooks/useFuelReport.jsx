import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as fuelReportService from "../services/fuelReportService";

// 🔄 Obtener todos los reportes sin paginación
export const useFuelReports = () => {
  return useQuery({
    queryKey: ["fuelReports"],
    queryFn: fuelReportService.getAllFuelReports,
  });
};

// 📄 Obtener todos los reportes con paginación
export const useFuelReportsPaged = (page, size) => {
  return useQuery({
    queryKey: ["fuelReportsPaged", page, size],
    queryFn: () => fuelReportService.getAllFuelReportsPaged(page, size),
    keepPreviousData: true, // mantiene los datos anteriores mientras carga nuevos
  });
};

// 🚗 Obtener reportes por vehículo sin paginación
export const useFuelReportsByVehicle = (vehicleId) => {
  return useQuery({
    queryKey: ["fuelReportsByVehicle", vehicleId],
    queryFn: () => fuelReportService.getByVehicleId(vehicleId),
    enabled: !!vehicleId, // se asegura de que el ID esté definido
  });
};

// 📑 Obtener reportes por vehículo con paginación
export const useFuelReportsByVehiclePaged = (vehicleId, page, size) => {
  return useQuery({
    queryKey: ["fuelReportsByVehiclePaged", vehicleId, page, size],
    queryFn: () => fuelReportService.getByVehicleIdPaged(vehicleId, page, size),
    enabled: !!vehicleId,
    keepPreviousData: true,
  });
};
