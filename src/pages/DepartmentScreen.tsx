import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import PageWrapper from '../components/PageWrapper';
import DataList from '../components/DataList';
import AppModal from '../components/AppModal';
import FloatingActionButton from '../components/FloatingActionButton';
import Input from '../components/Input';

import { useGetDepartments } from '../hooks/Department/useDepartmentQuery';
import { useDepartmentActions } from '../hooks/Department/useDepartmentAction';
import { Department } from '../types/department';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Snackbar from '../components/Snackbar';
import { useSnackbar } from '../components/SnackbarContext';
import { Pencil, Trash2 } from 'lucide-react-native';

export default function DepartmentScreen() {
  const { showSnackbar } = useSnackbar();
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const { data, isLoading, refetch, isRefetching } = useGetDepartments(
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
  } = useDepartmentActions();

  const handleOpenModal = (item?: Department) => {
    openModal(item);
    setModalVisible(true);
  };


  const onSave = () => {
    handleAction(form, {
      onSuccess: () => setModalVisible(false),
    });
  };

  return (
    <PageWrapper title="Departments">
      <DataList
        data={data?.data || []}
        isLoading={isLoading || isRefetching}
        onRefresh={refetch}
        searchValue={search}
        onSearchChange={v => setSearch(v)}
        placeholder="Search units..."
        renderItem={({ item }: { item: Department }) => (
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

            {/* Tombol Aksi Langsung */}
            <View className="flex-row items-center space-x-3">
              {/* Tombol EDIT */}
              <TouchableOpacity
                onPress={() => handleOpenModal(item)}
                className="w-10 h-10 bg-yellow-50 rounded-full items-center justify-center border border-yellow-100"
                activeOpacity={0.6}
              >
                <Pencil size={18} className='text-yellow-400' strokeWidth={2.5} />
              </TouchableOpacity>

              {/* Tombol DELETE */}
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
        title={selectedId ? 'Update Department' : 'New Department'}
        onPrimaryAction={onSave}
        isSubmitting={isSubmitting}
        primaryLabel={selectedId ? 'Confirm Changes' : 'Create Unit'}
      >
        <Input
          label="Department Name"
          placeholder="e.g. Production"
          value={form.name}
          onChangeText={v => setForm({ ...form, name: v })}
          error={serverErrors.Name?.[0]}
        />

        <Input
          label="Description"
          placeholder="Briefly describe the unit..."
          value={form.description}
          onChangeText={v => setForm({ ...form, description: v })}
          error={serverErrors.Description?.[0]}
        />
      </AppModal>
    </PageWrapper>
  );
}
