import { useQuery } from '@tanstack/react-query';
import { itemCategoryService } from '../../services/itemCategoryService';
export function useGetItemCategory(page: number, search: string = "") {
    return useQuery({
        queryKey: ["itemcategories", { page: search }],
        queryFn: () => itemCategoryService.getAll(page, 10, search),
        placeholderData: (prev) => prev,
    })
}