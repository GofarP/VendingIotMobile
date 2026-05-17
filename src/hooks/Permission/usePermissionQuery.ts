import {useQuery} from "@tanstack/react-query";
import { permissionService } from "../../services/permissionService";
export function useGetPermission(page:number, search:string=""){
    return useQuery({
        queryKey:['permissions',{page, search}],
        queryFn:()=>permissionService.getAll(page,10,search),
        placeholderData:(prev)=>prev
    });
}