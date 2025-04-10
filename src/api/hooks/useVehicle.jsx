import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as vehicleService from "../services/vehicleService";


export const useGetAllVehicles = () => {
    return useQuery({
        queryKey: ["vehicles"],
        queryFn: () => vehicleService.getAllVehicles()
    });
}; 

export const useGetVehicleById = (id) => {
    return useQuery({
        queryKey: ["vehicle", id],
        queryFn: () => vehicleService.getVehicleById(id),
        enabled: !!id,
    });
};

export const useGetVehiclesByCompanyId = (companyId) => {
    return useQuery({
        queryKey: ["vehicles", "company", companyId],
        queryFn: () => vehicleService.getByCompanyId(companyId),
        enabled: !!companyId,
    });
};

export const useGetVehiclesByCompanyIdPaged = (companyId, page, size) => { 
    return useQuery({
        queryKey: ["vehicles", "company", companyId, page, size],
        queryFn: () => vehicleService.getByCompanyIdPaged(companyId, page, size),
        enabled: !!companyId && !!page && !!size,
    });
};

export const useGetVehiclesByStatus = (status) => {
    return useQuery({
        queryKey: ["vehicles", "status", status],
        queryFn: () => vehicleService.getByStatus(status),
        enabled: !!status,
    });
};

export const useGetVehiclesByStatusPaged = (status, page, size) => {
    return useQuery({
        queryKey: ["vehicles", "status", status, page, size],
        queryFn: () => vehicleService.getByStatusPaged(status, page, size),
        enabled: !!status && !!page && !!size,
    });
};

export const useGetOptionsData = (vehicleId) => {
    return useQuery({
        queryKey: ["optionsData"],
        queryFn: () => vehicleService.getOptionsData(vehicleId),
        enabled: !!vehicleId,
    });
}

export const useCreateVehicle = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: vehicleService.createVehicle,
        onSuccess: () => {
            queryClient.invalidateQueries(["vehicles"]);
        },
    });
};

export const useUpdateVehicle = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: vehicleService.updateVehicle,
        onSuccess: () => {
            queryClient.invalidateQueries(["vehicles"]);
        },
    });
};

export const useUpdateOptions = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: vehicleService.updateOptions,
        onSuccess: () => {
            queryClient.invalidateQueries(["vehicles"]);
        },
    });
};

export const useUpdateVehicleStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: vehicleService.updateStatus,
        onSuccess: () => {
            queryClient.invalidateQueries(["vehicles"]);
        },
    });
};

export const useUpdateVehicleDriver = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: vehicleService.updateDriver,
        onSuccess: () => {
            queryClient.invalidateQueries(["vehicles"]);
        },
    });
};

export const useDeleteVehicle = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: vehicleService.deleteVehicle,
        onSuccess: () => {
            queryClient.invalidateQueries(["vehicles"]);
        },
    });
};