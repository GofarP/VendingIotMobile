import api from "./api";
import { ActionResponse } from "../types/common";

import { ItemCategory, ItemCategoryListResponse } from "../types/ItemCategory";
export const itemCategoryService = {
    getAll: async (page: number, pageSize: number, search: string): Promise<ItemCategoryListResponse> => {
        const response = await api.get('/itemcategory', {
            params: { page, pageSize, search: search || undefined }
        });

        return response.data;
    },

    getById: async (id: number): Promise<ItemCategory> => {
        const response = await api.get(`/itemcategory/${id}`);
        return response.data;
    },

    create: async (data: ItemCategory): Promise<ActionResponse<ItemCategory>> => {
        const response = await api.post('/itemcategory', data);
        return response.data;
    },
    update: async (id: number, data: ItemCategory): Promise<ActionResponse<ItemCategory>> => {
        const response = await api.put(`/itemcategory/${id}`, data);
        return response.data;
    },

    delete: async (id: number): Promise<ActionResponse<any>> => {
        const response = await api.delete(`/itemcategory/${id}`);
        return response.data;
    }


}