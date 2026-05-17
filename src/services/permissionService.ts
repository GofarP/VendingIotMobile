import api from "./api";
import { ActionResponse } from "../types/common";
import { Permission, PermissionListResponse } from "../types/permission";

export const permissionService = {
    getAll: async (page: number, pageSize: number, search: string): Promise<PermissionListResponse> => {
        const response = await api.get('/permission', {
            params: { page, pageSize, search: search || undefined }
        });

        return response.data;
    },
    getById: async (id: number): Promise<Permission> => {
        const response = await api.get(`/permission/${id}`);
        return response.data;
    },

    create: async (data: Permission): Promise<ActionResponse<Permission>> => {
        const response = await api.post(`/permission/`, data);
        return response.data;
    },
    update: async (id: number, data: Permission): Promise<ActionResponse<Permission>> => {
        const response = await api.put(`/permission/${id}`, data);
        return response.data;
    },

    delete: async (id: number): Promise<ActionResponse<any>> => {
        const response = await api.delete(`/permission/${id}`);
        return response.data;
    },
    getPermissionCategories: async (query: string) => {
        try {
            const response = await api.get(`/permissioncategory`, {
                params: { search: query }
            });

            const results = response.data.data || [];

            return results.map((item: any) => ({
                id: item.id,
                name: item.name,
            }));
        } catch (error) {
            console.error("Fetch categories failed:", error);
            return [];
        }
    }

}