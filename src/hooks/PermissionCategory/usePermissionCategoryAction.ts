import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { permissionCategoryService } from "../../services/permissionCategoryService";
import { useSnackbar } from "../../components/SnackbarContext";
import { usePermissionCategoryStore } from "../../store/usePermissionCategoryStore";
import { PermissionCategory } from "../../types/permissionCategory";

export function usePermissionCategoryActions() {
    const { showSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    const setSelectedPermissionCategory = usePermissionCategoryStore((s) => s.setSelectedPermissionCategory);

    const [form, setForm] = useState<PermissionCategory>({ id: 0, name: "", description: "" });
    const [serverErrors, setServerErrors] = useState<Record<string, string[]>>({});
    const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

    const openModal = (item?: PermissionCategory) => {
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
        mutationFn: (data: PermissionCategory) => {
            return selectedId
                ? permissionCategoryService.update(selectedId, data)
                : permissionCategoryService.create(data);
        },
        onMutate: () => setServerErrors({}),
        onSuccess: async (res) => {
            await queryClient.invalidateQueries({ queryKey: ["permissioncategories"] });
            showSnackbar(res.message || "Data berhasil disimpan","success");

            if (selectedId && res.data) {
                setSelectedPermissionCategory(res.data);
            }
        },
        onError: (err: any) => {
            const responseData = err.response?.data;
            if (responseData?.errors) {
                setServerErrors(responseData.errors);
                showSnackbar("validasi gagal", "error");
            } else {
                showSnackbar(responseData?.message || "Terjadi kesalahan", "error");
            }
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => permissionCategoryService.delete(id),
        onSuccess: async (res) => {
            await queryClient.invalidateQueries({ queryKey: ["permissioncategories"] });
            showSnackbar(res.message || "Data berhasil dihapus", "success");
        },
        onError:(err:any)=>{
            const msg=err.response?.data.message|| "Gagal menghapus data";
            showSnackbar(msg,'error');
        }
    });

    return{
        form,
        setForm,
        serverErrors,
        selectedId,
        openModal,
        isSubmitting:mutation.isPending,
        isDisabled:deleteMutation.isPending,
        handleAction:mutation.mutate,
        handleDelete:deleteMutation.mutate
    }
}