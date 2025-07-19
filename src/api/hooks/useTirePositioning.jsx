import { useQuery } from "@tanstack/react-query";
import * as tirePositioningService from "../services/tirePositioningService";

export const useGetByVehicleId = (vehicleId) => {
  return useQuery({
    queryKey: ["tirePositioningByVehicle", vehicleId],
    queryFn: () => tirePositioningService.getByVehicleId(vehicleId),
    enabled: !!vehicleId,
  });
}

export const useGetByVehicleIdPaged = (vehicleId, page, size) => {
  return useQuery({
    queryKey: ["tirePositioningByVehiclePaged", vehicleId, page, size],
    queryFn: () => tirePositioningService.getByVehicleIdPaged(vehicleId, page, size),
    enabled: !!vehicleId && page !== undefined && size !== undefined,
    keepPreviousData: true,
  });
};

export const useSaveTirePositioning = (vehicleId, tirePositioning) => {
  return useQuery({
    queryKey: ["saveTirePositioning", vehicleId],
    queryFn: () => tirePositioningService.saveTirePositioning(vehicleId, tirePositioning),
    enabled: !!vehicleId && tirePositioning !== undefined,
  });
};

export const useUpdateTirePositioning = (vehicleId, tirePositioning) => {
  return useQuery({
    queryKey: ["updateTirePositioning", vehicleId],
    queryFn: () => tirePositioningService.updateTirePositioning(vehicleId, tirePositioning),
    enabled: !!vehicleId && tirePositioning !== undefined,
  });
};