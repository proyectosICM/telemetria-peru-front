import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as vehicleSnapshots from "../services/vehicleSnapshots";

export const useGetByCompanyId = (companyId) => {
  return useQuery({
    queryKey: ["vehicleSnapshots", companyId],
    queryFn: () => vehicleSnapshots.getByCompanyId(companyId),
    enabled: !!companyId,
  });
};
