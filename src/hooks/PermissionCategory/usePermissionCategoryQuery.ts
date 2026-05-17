import {useQuery} from '@tanstack/react-query';
import { permissionCategoryService } from '../../services/permissionCategoryService';
export function useGetPermissionCategory(page:number, search:string=""){
    return useQuery({
        queryKey:["permissioncategories",{page:search}],
        queryFn:()=>permissionCategoryService.getAll(page, 10,search),
        placeholderData:(prev)=>prev,
    })
}