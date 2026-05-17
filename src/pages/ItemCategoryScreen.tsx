import React, { useState } from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import PageWrapper from "../components/PageWrapper";
import DataList from "../components/DataList";
import AppModal from "../components/AppModal";
import FloatingActionButton from "../components/FloatingActionButton";
import Input from "../components/Input";

import { useGetItemCategory } from "../hooks/ItemCategory/useItemCategoryQuery";
import { useSnackbar } from "../components/SnackbarContext";
import { Pencil, Trash2 } from 'lucide-react-native';
import { useItemCategoryActions } from "../hooks/ItemCategory/useItemCategoryAction";
import { ItemCategory } from "../types/ItemCategory";

export default function ItemCategoryScreen() {
    const { showSnackbar } = useSnackbar();
    const [search, setSearch] = useState('');

    const [modalVisible, setModalVisible] = useState(false);

    const { data, isLoading, refetch, isRefetching } = useGetItemCategory(1, search);

    const {
        form,
        setForm,
        openModal,
        handleAction,
        handleDelete,
        serverErrors,
        isSubmitting,
        selectedId,
    } = useItemCategoryActions();

    const handleOpenModal = (item?: ItemCategory) => {
        openModal(item);
        setModalVisible(true);
    }

    const onSave = () => {
        handleAction(form, {
            onSuccess: () => setModalVisible(false)
        });
    };

    return (
        <PageWrapper title="Item Category">
            <DataList
                data={data?.data || []}
                isLoading={isLoading || isRefetching}
                onRefresh={refetch}
                searchValue={search}
                onSearchChange={v => setSearch(v)}
                placeholder="search category..."
                renderItem={({ item }: { item: ItemCategory }) => (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        className="p-5 bg-white rounded-[32px] mb-4 flex-row items-center border border-slate-100 shadow-sm"
                    >
                        <View className="flex-1">
                            <Text className="font-bold text-slate-800 text-base">
                                {item.name}
                            </Text>
                            <Text
                                className="text-slate-400 text-[11px] mt-0.5"
                                numberOfLines={1}
                            >
                                {item.description || '-'}
                            </Text>
                        </View>
                        <View className="flex-row items-center space-x-3">
                            <TouchableOpacity
                                onPress={() => handleOpenModal(item)}
                                className="w-10 h-10 bg-yellow-50 rounded-full items-center justify-center border border-yellow-100"
                                activeOpacity={0.6}
                            >
                                <Pencil size={18} className="text-yellow-400" strokeWidth={2.5} />
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
                title={selectedId ? "Update Item Category" : "Create Item Category"}
                onPrimaryAction={onSave}
                isSubmitting={isSubmitting}
                primaryLabel={selectedId ? 'Confirm Changes' : 'Create Category'}
            >

                <Input
                    label="Item Category Name"
                    placeholder="e.g. food, drink"
                    value={form.name}
                    onChangeText={v => setForm({ ...form, name: v })}
                    error={serverErrors.Name?.[0]}
                />

                <Input
                    label="Description"
                    placeholder="Explain about this item category"
                    value={form.description}
                    onChangeText={v => setForm({ ...form, description: v })}
                    error={serverErrors.Description?.[0]}
                />

            </AppModal>
        </PageWrapper>
    )
}