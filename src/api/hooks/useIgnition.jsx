import { useQuery } from "@tanstack/react-query";
import * as ignitionService from "../services/ignitionService";

// ✅ Obtener todos los registros de encendidos
export const useGetAllIgnitionRecords = () => {
  return useQuery({
    queryKey: ["ignitionRecords"],
    queryFn: ignitionService.getAllignitionRecords,
  });
};

// ✅ Obtener registros paginados
export const useGetAllIgnitionRecordsPaged = (page, size) => {
  return useQuery({
    queryKey: ["ignitionRecordsPaged", page, size],
    queryFn: () => ignitionService.getAllIgnitionRecordsPaged(page, size),
    enabled: page !== undefined && size !== undefined,
  });
};

// ✅ Obtener registros por vehículo
export const useGetIgnitionRecordsByVehicle = (vehicleId) => {
  return useQuery({
    queryKey: ["ignitionRecordsByVehicle", vehicleId],
    queryFn: () => ignitionService.getIgnitionRecordsByVehicle(vehicleId),
    enabled: !!vehicleId,
  });
};

// ✅ Obtener registros por vehículo paginados
export const useGetIgnitionRecordsByVehiclePaged = (vehicleId, page, size) => {
  return useQuery({
    queryKey: ["ignitionRecordsByVehiclePaged", vehicleId, page, size],
    queryFn: () => ignitionService.getIgnitionRecordsByVehiclePaged(vehicleId, page, size),
    enabled: !!vehicleId && page !== undefined && size !== undefined,
    keepPreviousData: true,
  });
};

// ✅ Obtener conteo por vehículo
export const useGetIgnitionRecordsCount = (vehicleId) => {
  return useQuery({
    queryKey: ["ignitionRecordsCount", vehicleId],
    queryFn: () => ignitionService.getIgnitionRecordsCount(vehicleId),
    enabled: !!vehicleId,
  });
};

// ✅ Obtener conteos por todos los meses (para gráficos, por ejemplo)
export const useGetIgnitionRecordsCountsAllMonths = (vehicleId) => {
  return useQuery({
    queryKey: ["ignitionRecordsCountsAllMonths", vehicleId],
    queryFn: () => ignitionService.getIgnitionRecordsCountsAllMonths(vehicleId),
    enabled: !!vehicleId,
  });
};

// ✅ Obtener conteos por todos los días (para gráficos diarios)
export const useGetIgnitionRecordsCountsAllDays = (vehicleId) => {
  return useQuery({
    queryKey: ["ignitionRecordsCountsAllDays", vehicleId],
    queryFn: () => ignitionService.getIgnitionRecordsCountsAllDays(vehicleId),
    enabled: !!vehicleId,
  });
};
