import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { itemCategoryService } from "../../services/itemCategoryService";
import { useSnackbar } from "../../components/SnackbarContext";
import { useItemCategoryStore } from "../../store/useItemCategoryStore";
import { ItemCategory } from "../../types/ItemCategory";
import { Alert } from "react-native";
import { usePermissionCategoryStore } from "../../store/usePermissionCategoryStore";

export function useItemCategoryActions() {
    const { showSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    const [form, setForm] = useState<ItemCategory>({ id: 0, name: "", description: "" });

    const setSelectedItemCategory = useItemCategoryStore((s) => s.setSelectedItemCategory);
    const [serverErrors, setServerErrors] = useState<Record<string, string[]>>({});
    const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

    const openModal = (item?: ItemCategory) => {
        setServerErrors({});
        if (item) {
            setSelectedId(item.id);
            setForm({
                id: item.id,
                name: item.name,
                description: item.description
            })
        } else {
            setSelectedId(undefined);
            setForm({ id: 0, name: '', description: '' });
        }
    }

    const mutation = useMutation({
        mutationFn: (data: ItemCategory) => {
            return selectedId
                ? itemCategoryService.update(selectedId, data)
                : itemCategoryService.create(data);
        },
        onMutate: () => setServerErrors({}),
        onSuccess: async (res) => {
            await queryClient.invalidateQueries({ queryKey: ["itemcategories"] });
            showSnackbar(res.message || "Data berhasil disimpan", "success");

            if (selectedId && res.data) {
                setSelectedItemCategory(res.data);
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
        mutationFn: (id: number) => itemCategoryService.delete(id),
        onSuccess: async (res) => {
            await queryClient.invalidateQueries({ queryKey: ["permissioncategories"] });
            showSnackbar(res.message || "Data berhasil dihapus", "success");
        },
        onError: (err: any) => {
            const msg = err.response?.data.message || "Gagal menghapus data";
            showSnackbar(msg, 'error');
        }
    });

    const handleDelete = (id: number) => {
        Alert.alert(
            "Konfirmasi Hapus",
            "Apakah Anda yakin ingin menghapus item category ini?",
            [
                { text: "Batal", style: 'cancel' },
                {
                    text: "Hapus",
                    style: "destructive",
                    onPress: () => deleteMutation.mutate(id)
                }
            ]
        )
    }

     return{
        form,
        setForm,
        serverErrors,
        selectedId,
        openModal,
        isSubmitting:mutation.isPending,
        isDisabled:deleteMutation.isPending,
        handleAction:mutation.mutate,
        handleDelete
    }


}