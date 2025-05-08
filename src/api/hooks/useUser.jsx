import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as userService from "../services/userService";

export const useGetInfoUser = (username) => {
    return useQuery({
        queryKey: ["user", username],
        queryFn: () => userService.getInfoUser(username),
        enabled: !!username,
    });
}