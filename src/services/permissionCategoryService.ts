import api from "./api";
import { ActionResponse } from "../types/common";

import { PermissionCategory, PermissionCategoryListResponse } from "../types/permissionCategory";

export const permissionCategoryService = {
    getAll: async (page: number, pageSize: number, search: string): Promise<PermissionCategoryListResponse> => {
        const response = await api.get('/permissioncategory', {
            params: { page, pageSize, search: search || undefined }
        });

        return response.data;
    },
    getById: async (id: number): Promise<PermissionCategory> => {
        const response = await api.get(`/permissioncategory/${id}`);
        return response.data;
    },
    create: async (data: PermissionCategory): Promise<ActionResponse<PermissionCategory>> => {
        const response = await api.post('/permissioncategory', data);
        return response.data;
    },
    update: async (id: number, data: PermissionCategory): Promise<ActionResponse<PermissionCategory>> => {
        const response = await api.put(`/permissioncategory/${id}`, data);
        return response.data;
    },

    delete: async (id: number): Promise<ActionResponse<any>> => {
        const response = await api.delete(`/permissioncategory/${id}`);
        return response.data;
    }

}