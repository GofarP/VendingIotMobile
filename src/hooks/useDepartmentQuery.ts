import { useQuery } from "@tanstack/react-query";
import { departmentService } from "../services/departmentService";
export function useGetDepartments(page: number, search: string = "") {
    return useQuery({
        queryKey: ["departments", { page, search }],
        queryFn: () => departmentService.getAll(page, 10, search),
        placeholderData: (prev) => prev,
    });
}