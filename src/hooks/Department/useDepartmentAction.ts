import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { departmentService } from "../../services/departmentService";
import { useSnackbar } from "../../components/SnackbarContext";
import { useDepartmentStore } from "../../store/useDepartmentStore";
import { Department } from "../../types/department";

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
        onSuccess: async (res) => {
            await queryClient.invalidateQueries({ queryKey: ["departments"] });
            
            showSnackbar(res.message || "Data berhasil disimpan", "success");

            if (selectedId && res.data) {
                setSelectedDepartment(res.data);
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
        onSuccess: async (res) => {
            await queryClient.invalidateQueries({ queryKey: ["departments"] });
            showSnackbar(res.message || "Data berhasil dihapus", "success");
        },
        onError: (err: any) => {
            const msg = err.response?.data?.message || "Gagal menghapus data";
            showSnackbar(msg, "error");
        }
    });

    return {
        form,
        setForm,
        serverErrors,
        selectedId,
        openModal,
        isSubmitting: mutation.isPending,
        isDeleting: deleteMutation.isPending,
        handleAction: mutation.mutate,
        handleDelete: deleteMutation.mutate
    };
}