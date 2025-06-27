import { useQuery } from "@tanstack/react-query";
import * as gasRecordService from "../services/gasRecordService";

export const useGetById = (id) => {
  return useQuery({
    queryKey: ["gasRecord", id],
    queryFn: () => gasRecordService.getById(id),
    enabled: !!id,
  });
};

export const useGetByVehicleId = (vehicleId) => {
  return useQuery({
    queryKey: ["gasRecordsByVehicle", vehicleId],
    queryFn: () => gasRecordService.getByVehicleId(vehicleId),
    enabled: !!vehicleId,
  });
};

export const useGetByVehicleIdPaged = (vehicleId, page, size) => {
  return useQuery({
    queryKey: ["gasRecordsByVehiclePaged", vehicleId, page, size],
    queryFn: () => gasRecordService.getByVehicleIdPaged(vehicleId, page, size),
    enabled: !!vehicleId && page !== undefined && size !== undefined,
    keepPreviousData: true,
  });
};

export const useGetByVehicleToday = (vehicleId) => {
  return useQuery({
    queryKey: ["gasRecordsByVehicleToday", vehicleId],
    queryFn: () => gasRecordService.getByVehicleToday(vehicleId),
    enabled: !!vehicleId,
  });
};

export const useGetByDate = (params, enabled = true) => {
  return useQuery({
    queryKey: ["gasRecordsByDate", params],
    queryFn: () => gasRecordService.getByDate(params),
    enabled: enabled && !!params?.vehicleId && !!params?.viewType && !!params?.year,
  });
};