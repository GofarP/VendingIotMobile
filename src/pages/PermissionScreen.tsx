import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import PageWrapper from "../components/PageWrapper";
import DataList from "../components/DataList";
import AppModal from "../components/AppModal";
import FloatingActionButton from "../components/FloatingActionButton";
import Input from "../components/Input";
import { useGetPermission } from "../hooks/Permission/usePermissionQuery";
import { usePermissionActions } from "../hooks/Permission/usePermissionAction";
import { Permission } from "../types/permission";
import { useSnackbar } from "../components/SnackbarContext";
import { Pencil, Trash2 } from 'lucide-react-native';
import AsyncSelect from "../components/AsyncSelect";
import { permissionService } from "../services/permissionService";

export default function PermissionScreen() {
    const { showSnackbar } = useSnackbar();
    const [search, setSearch] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const { data, isLoading, refetch, isRefetching } = useGetPermission(
        1,
        search,
    );

    const {
        form,
        setForm,
        openModal,
        handleAction,
        handleDelete,
        serverErrors,
        isSubmitting,
        selectedId,
    } = usePermissionActions();

    const handleOpenModal = (item?: Permission) => {
        openModal(item);
        setModalVisible(true);
    }

    const onSave = () => {
        handleAction(form, {
            onSuccess: () => setModalVisible(false),
        });
    };

    return (
        <PageWrapper title="Permissions">
            <DataList
                data={data?.data || []}
                isLoading={isLoading || isRefetching}
                onRefresh={refetch}
                searchValue={search}
                onSearchChange={v => setSearch(v)}
                placeholder="Search permissions..."
                renderItem={({ item }: { item: Permission }) => (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        className="p-5 bg-white rounded-[32px] mb-4 flex-row items-center border border-slate-100 shadow-sm"
                    >
                        <View className="flex-1 justify-center">
                            <Text className="font-bold text-slate-800 text-base">
                                {item.name}
                            </Text>

                            {item.permissionCategory?.name && (
                                <Text className="text-slate-400 text-sm mt-0.5">
                                    {item.permissionCategory.name}
                                </Text>
                            )}
                        </View>
                        <View className="flex-row items-center space-x-3">
                            <TouchableOpacity
                                onPress={() => handleOpenModal(item)}
                                className="w-10 h-10 bg-yellow-50 rounded-full items-center justify-center border border-yellow-100"
                                activeOpacity={0.6}
                            >
                                <Pencil size={18} className='text-yellow-400' strokeWidth={2.5} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => handleDelete(item.id!)}
                                className="w-10 h-10 bg-red-50 rounded-full items-center justify-center border border-red-100"
                                activeOpacity={0.6}
                            >
                                <Trash2 size={18} color="#ef4444" strokeWidth={2.5} />
                            </TouchableOpacity>
                        </View>

                    </TouchableOpacity>
                )}
            />
            <FloatingActionButton onPress={() => handleOpenModal()} />
            <AppModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                title={selectedId ? 'Update Permission' : 'New Permission'}
                onPrimaryAction={onSave}
                isSubmitting={isSubmitting}
                primaryLabel={selectedId ? 'Confirm Changes' : 'Create Unit'}
            >

                <Input
                    label="Permission Name"
                    placeholder="e.g. create-employee"
                    value={form.name}
                    onChangeText={v => setForm({ ...form, name: v })}
                    error={serverErrors.Name?.[0]}
                />

                <AsyncSelect
                    label="Permission Category"
                    placeholder="Cari kategori..."
                    loadOptions={permissionService.getPermissionCategories}

                    selectedValue={form.permissionCategory?.name}

                    onSelect={(item) => {
                        setForm({
                            ...form,
                            permissionCategoryId: Number(item.id),

                            permissionCategory: {
                                id: Number(item.id),
                                name: item.name
                            } as any 
                        });
                    }}
                />
                {serverErrors.PermissionCategoryId && (
                    <Text className="text-red-500 text-xs ml-1 -mt-2 mb-4">
                        {serverErrors.PermissionCategoryId[0]}
                    </Text>
                )}

            </AppModal>
        </PageWrapper>
    )
}