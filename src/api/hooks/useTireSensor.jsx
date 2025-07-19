import { useQuery } from "@tanstack/react-query";
import * as tireSensorService from "../services/tireSensorService";

export const useGetById = (id) => {
  return useQuery({
    queryKey: ["tireSensorById", id],
    queryFn: () => tireSensorService.getById(id),
    enabled: !!id,
  });
};

export const useGetByIdentificationCode = (identificationCode) => {
  return useQuery({
    queryKey: ["tireSensorByIdentificationCode", identificationCode],
    queryFn: () => tireSensorService.getByIdentificationCode(identificationCode),
    enabled: !!identificationCode,
  });
};

export const useGetByCompanyId = (companyId) => {
  return useQuery({
    queryKey: ["tireSensorsByCompanyId", companyId],
    queryFn: () => tireSensorService.getByCompanyId(companyId),
    enabled: !!companyId,
  });
};

export const useGetByCompanyIdPaged = (companyId, page, size) => {
  return useQuery({
    queryKey: ["tireSensorsByCompanyIdPaged", companyId, page, size],
    queryFn: () => tireSensorService.getByCompanyIdPaged(companyId, page, size),
    enabled: !!companyId && page !== undefined && size !== undefined,
    keepPreviousData: true,
  });
};

export const useGetByVehicleId = (vehicleId) => {
  return useQuery({
    queryKey: ["tireSensorsByVehicleId", vehicleId],
    queryFn: () => tireSensorService.getByVehicleId(vehicleId),
    enabled: !!vehicleId,
  });
};

export const useGetByVehicleIdPaged = (vehicleId, page, size) => {
  return useQuery({
    queryKey: ["tireSensorsByVehicleIdPaged", vehicleId, page, size],
    queryFn: () => tireSensorService.getByVehicleIdPaged(vehicleId, page, size),
    enabled: !!vehicleId && page !== undefined && size !== undefined,
    keepPreviousData: true,
  });
};

export const useGetByStatus = (status) => {
  return useQuery({
    queryKey: ["tireSensorsByStatus", status],
    queryFn: () => tireSensorService.getByStatus(status),
    enabled: !!status,
  });
};

export const useGetByStatusPaged = (status, page, size) => {
  return useQuery({
    queryKey: ["tireSensorsByStatusPaged", status, page, size],
    queryFn: () => tireSensorService.getByStatusPaged(status, page, size),
    enabled: !!status && page !== undefined && size !== undefined,
    keepPreviousData: true,
  });
};

export const useSaveTireSensor = (tireSensor) => {
  return useQuery({
    queryKey: ["saveTireSensor"],
    queryFn: () => tireSensorService.saveTireSensor(tireSensor),
    enabled: !!tireSensor,
  });
};