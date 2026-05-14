import React, { useState } from 'react';
import { 
  View, Text, FlatList, TextInput, TouchableOpacity, 
  Modal, ActivityIndicator, KeyboardAvoidingView, Platform 
} from 'react-native';
import { useGetDepartments } from '../hooks/useDepartmentQuery';
import { useDepartmentActions } from '../hooks/useDepartmentAction';
import { useDepartmentStore } from '../store/useDepartmentStore';
import { Department } from "../types/department";

export default function DepartmentScreen() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const { selectedDepartment, setSelectedDepartment } = useDepartmentStore();

    const { data, isLoading, refetch, isRefetching } = useGetDepartments(page, search);
    
    const { 
        form, setForm, openModal, handleAction, handleDelete, serverErrors, isSubmitting, selectedId 
    } = useDepartmentActions();

    // Fungsi pembungkus untuk mengatur visibility modal
    const handleOpenModal = (item?: Department) => {
        openModal(item);
        setModalVisible(true);
    };

    const onSave = () => {
        handleAction(form, { 
            onSuccess: () => setModalVisible(false) 
        });
    };

    return (
        <View className="flex-1 bg-gray-50">
            {/* --- HEADER & SEARCH --- */}
            <View className="bg-white px-4 pt-4 pb-6 shadow-sm rounded-b-[30px]">
                <Text className="text-2xl font-bold text-gray-800 mb-4">Departments</Text>
                
                {/* Search Bar */}
                <View className="flex-row items-center bg-gray-100 px-4 py-2 rounded-2xl border border-gray-200">
                    <TextInput 
                        className="flex-1 text-gray-700 h-10"
                        placeholder="Search by name..."
                        placeholderTextColor="#9ca3af"
                        value={search}
                        onChangeText={(v) => { setSearch(v); setPage(1); }}
                    />
                </View>

                {/* Selected Status (Zustand) */}
                {selectedDepartment && (
                    <View className="mt-4 flex-row items-center bg-blue-50 p-3 rounded-xl border border-blue-100">
                        <View className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
                        <Text className="text-blue-700 text-xs font-medium">
                            Active: <Text className="font-bold">{selectedDepartment.name}</Text>
                        </Text>
                    </View>
                )}
            </View>

            {/* --- LIST CONTENT --- */}
            <FlatList
                className="px-4 pt-4"
                data={data?.data}
                keyExtractor={(item) => String(item.id)}
                showsVerticalScrollIndicator={false}
                onRefresh={refetch}
                refreshing={isLoading || isRefetching}
                renderItem={({ item }: { item: Department }) => (
                    <TouchableOpacity 
                        onLongPress={() => setSelectedDepartment(item)}
                        className={`p-4 bg-white rounded-2xl mb-4 flex-row items-center border shadow-sm ${selectedDepartment?.id === item.id ? 'border-blue-400 bg-blue-50/30' : 'border-gray-100'}`}
                    >
                        <View className="flex-1">
                            <Text className="font-bold text-gray-800 text-lg">{item.name}</Text>
                            <Text className="text-gray-500 text-sm mt-1" numberOfLines={1}>
                                {item.description || 'No description available'}
                            </Text>
                        </View>
                        
                        <View className="flex-row items-center space-x-2">
                            <TouchableOpacity 
                                className="bg-gray-100 p-2 rounded-lg"
                                onPress={() => handleOpenModal(item)}
                            >
                                <Text className="text-blue-600 font-bold px-2">Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                className="bg-red-50 p-2 rounded-lg"
                                onPress={() => handleDelete(item.id!)}
                            >
                                <Text className="text-red-500 font-bold px-2">Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    !isLoading ? (
                        <View className="items-center mt-20">
                            <Text className="text-gray-400">No departments found.</Text>
                        </View>
                    ) : null
                }
                ListFooterComponent={<View className="h-24" />}
            />

            {/* --- FLOATING ACTION BUTTON --- */}
            <TouchableOpacity 
                activeOpacity={0.8}
                className="absolute bottom-8 right-8 bg-blue-600 w-16 h-16 rounded-full justify-center items-center shadow-2xl"
                onPress={() => handleOpenModal()}
            >
                <Text className="text-white text-4xl mt-[-4px]">+</Text>
            </TouchableOpacity>

            {/* --- MODAL FORM --- */}
            <Modal visible={modalVisible} transparent animationType="slide">
                <KeyboardAvoidingView 
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    className="flex-1 bg-black/60 justify-end"
                >
                    <View className="bg-white rounded-t-[40px] p-8 shadow-2xl">
                        <View className="items-center mb-6">
                            <View className="w-12 h-1.5 bg-gray-200 rounded-full mb-4" />
                            <Text className="text-xl font-bold text-gray-800">
                                {selectedId ? 'Update Department' : 'New Department'}
                            </Text>
                        </View>

                        <View className="space-y-4">
                            <View>
                                <Text className="text-gray-500 mb-2 ml-1 text-xs font-bold uppercase tracking-widest">Name</Text>
                                <TextInput 
                                    className={`bg-gray-50 p-4 rounded-2xl border ${serverErrors.name ? 'border-red-500' : 'border-gray-200'} text-gray-800`}
                                    placeholder="Enter department name"
                                    value={form.name}
                                    onChangeText={(v) => setForm({ ...form, name: v })}
                                />
                                {serverErrors.name && (
                                    <Text className="text-red-500 text-[10px] mt-1 ml-2 font-medium">{serverErrors.name[0]}</Text>
                                )}
                            </View>

                            <View>
                                <Text className="text-gray-500 mb-2 ml-1 text-xs font-bold uppercase tracking-widest">Description</Text>
                                <TextInput 
                                    className="bg-gray-50 p-4 rounded-2xl border border-gray-200 text-gray-800"
                                    placeholder="Brief description"
                                    multiline
                                    numberOfLines={3}
                                    textAlignVertical="top"
                                    value={form.description}
                                    onChangeText={(v) => setForm({ ...form, description: v })}
                                />
                            </View>
                        </View>

                        <View className="flex-row items-center justify-between mt-8">
                            <TouchableOpacity 
                                className="flex-1 mr-4 py-4 items-center"
                                onPress={() => setModalVisible(false)}
                            >
                                <Text className="text-gray-400 font-bold text-lg">Cancel</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                activeOpacity={0.9}
                                className={`flex-[2] py-4 rounded-2xl shadow-lg items-center ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600'}`}
                                onPress={onSave}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text className="text-white font-bold text-lg">Save Changes</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
}