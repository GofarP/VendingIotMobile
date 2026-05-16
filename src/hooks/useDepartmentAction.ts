import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { departmentService } from "../services/departmentService";
import { useSnackbar } from "../components/SnackbarContext";
import { useDepartmentStore } from "../store/useDepartmentStore";
import { Department } from "../types/department";

export function useDepartmentActions() {
    const { showSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const setSelectedDepartment = useDepartmentStore((s) => s.setSelectedDepartment);

    const [form, setForm] = useState<Department>({ id: 0, name: "", description: "" });
    const [serverErrors, setServerErrors] = useState<Record<string, string[]>>({});
    const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

    const openModal = (item?: Department) => {
        setServerErrors({}); 
        if (item) {
            setSelectedId(item.id);
            setForm({ 
                id: item.id, 
                name: item.name, 
                description: item.description 
            });
        } else {
            setSelectedId(undefined);
            setForm({ id: 0, name: '', description: '' });
        }
    };

    const mutation = useMutation({
        mutationFn: (data: Department) => {
            return selectedId 
                ? departmentService.update(selectedId, data) 
                : departmentService.create(data);
        },
        onMutate: () => setServerErrors({}),
        onSuccess: (res) => {
            if (res.success) {
                queryClient.invalidateQueries({ queryKey: ["departments"] });
                showSnackbar(res.message, "success");
                if (selectedId && res.data) setSelectedDepartment(res.data);
            }
        },
        onError: (err: any) => {
            const responseData = err.response?.data;
            if (responseData?.errors) {
                setServerErrors(responseData.errors);
                showSnackbar("Validasi gagal", "error");
            } else {
                showSnackbar(responseData?.message || "Terjadi kesalahan", "error");
            }
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => departmentService.delete(id),
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["departments"] });
            showSnackbar(res.message, "success");
        },
        onError: () => showSnackbar("Gagal menghapus", "error")
    });

    return {
        form,
        setForm,
        serverErrors,
        selectedId,
        openModal, // Eksport fungsi ini ke Screen
        isSubmitting: mutation.isPending,
        isDeleting: deleteMutation.isPending,
        handleAction: mutation.mutate,
        handleDelete: deleteMutation.mutate
    };
}