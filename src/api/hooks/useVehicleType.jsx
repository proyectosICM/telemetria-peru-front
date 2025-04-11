import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as vehicleTypeService from "../services/vehicleTypeService";

export const useGetVehicleTypes = () => {
  return useQuery({
    queryKey: ["vehicleTypes"],
    queryFn: vehicleTypeService.getAllVehicleTypes,
  });
};

export const useGetVehicleTypesPaged = (page, size) => {
  return useQuery({
    queryKey: ["vehicleTypes", page, size],
    queryFn: () => vehicleTypeService.getAllVehicleTypesPaged(page, size),
  });
};

export const useGetVehicleTypeById = (id) => {
  return useQuery({
    queryKey: ["vehicleType", id],
    queryFn: () => vehicleTypeService.getVehicleTypeById(id),
    enabled: !!id,
  });
};

export const useCreateVehicleType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: vehicleTypeService.createVehicleType,
    onSuccess: () => {
      queryClient.invalidateQueries(["vehicleTypes"]);
    },
  });
};

export const useUpdateVehicleType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: vehicleTypeService.updateVehicleType,
    onSuccess: () => {
      queryClient.invalidateQueries(["vehicleTypes"]);
    },
  });
};

export const useDeleteVehicleType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: vehicleTypeService.deleteVehicleType,
    onSuccess: () => {
      queryClient.invalidateQueries(["vehicleTypes"]);
    },
  });
};
