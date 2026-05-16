import api from "./api";

import { ActionResponse } from "../types/common";

import {
    Department,
    DepartmentListResponse,
} from "../types/department";

export const departmentService = {
    getAll: async (page: number, pageSize: number, search: string): Promise<DepartmentListResponse> => {
        const response = await api.get('/department', {
            params: { page, pageSize, search: search || undefined }
        });
        console.log(response.data)
        return response.data;
    },
    getById: async (id: number): Promise<Department> => {
        const response = await api.get(`/department/${id}`);
        return response.data;
    },

    create: async (data: Department): Promise<ActionResponse<Department>> => {
        const response = await api.post('/department', data);
        return response.data;
    },

    update: async (id: number, data: Department): Promise<ActionResponse<Department>> => {
        const response = await api.put(`/department/${id}`, data);
        return response.data;
    },

    delete: async (id: number): Promise<ActionResponse> => {
        const response = await api.delete(`/department/${id}`);
        return response.data;
    }
}