import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { permissionService } from "../../services/permissionService";
import { useSnackbar } from "../../components/SnackbarContext";
import { usePermissionStore } from "../../store/usePermission";
import { Permission } from "../../types/permission";
import { Alert } from "react-native";

type UpsertPermissionRequest = Omit<Permission, 'id' | 'permissionCategory'>;

export function usePermissionActions() {
    const { showSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const setSelectedPermission = usePermissionStore((s) => s.setSelectedPermission);
    
    const [form, setForm] = useState<Permission>({ 
        id: 0, 
        name: '', 
        permissionCategoryId: 0 
    });

    const [serverErrors, setServerErrors] = useState<Record<string, string[]>>({});
    const [selectedId, setSelectedId] = useState<number | undefined>(undefined);
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = (item?: Permission) => {
        setServerErrors({});
        if (item) {
            setSelectedId(item.id);
            setForm({
                id: item.id,
                name: item.name,
                permissionCategoryId: item.permissionCategoryId,
                permissionCategory: item.permissionCategory
            });
        } else {
            setSelectedId(undefined);
            setForm({ id: 0, name: '', permissionCategoryId: 0 });
        }
        setModalVisible(true);
    };

    const mutation = useMutation({
        mutationFn: (data: Permission) => {
            const payload: UpsertPermissionRequest = {
                name: data.name,
                permissionCategoryId: Number(data.permissionCategoryId),
            };

            return selectedId
                ? permissionService.update(selectedId, payload as Permission)
                : permissionService.create(payload as Permission);
        },
        onMutate: () => setServerErrors({}),
        onSuccess: async (res) => {
            await queryClient.invalidateQueries({ queryKey: ["permissions"] });
            showSnackbar(res.message || "Data berhasil disimpan", 'success');
            setModalVisible(false);
            if (selectedId && res.data) {
                setSelectedPermission(res.data);
            }
        },
        onError: (error: AxiosError<any>) => {
            const responseData = error.response?.data;
            if (responseData?.errors) {
                setServerErrors(responseData.errors);
                showSnackbar("Validasi gagal", "error");
            } else {
                showSnackbar(responseData?.message || "Terjadi kesalahan", "error");
            }
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => permissionService.delete(id),
        onSuccess: async (res) => {
            await queryClient.invalidateQueries({ queryKey: ["permissions"] });
            showSnackbar(res.message || 'Data berhasil dihapus', "success");
        },
        onError: (err: AxiosError<any>) => {
            const msg = err.response?.data?.message || "Gagal menghapus data";
            showSnackbar(msg, "error");
        }
    });

     const handleDelete=(id:number)=>{
            Alert.alert(
                "Konfirmasi Hapus",
                "Apakah Anda yakin ingin menghapus permission category ini?",
                [
                    {text:"Batal",style:'cancel'},
                    {
                        text:"Hapus",
                        style:"destructive",
                        onPress:()=>deleteMutation.mutate(id)
                    }
                ]
            )
        }

    return {
        form,
        setForm,
        serverErrors,
        selectedId,
        modalVisible,
        setModalVisible,
        openModal,
        isSubmitting: mutation.isPending,
        isDeleting: deleteMutation.isPending,
        handleAction: mutation.mutate,
        handleDelete
    };
}