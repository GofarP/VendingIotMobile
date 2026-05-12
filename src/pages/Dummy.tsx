import React, { useState } from "react";
import {
    View,
    Text,
    Pressable,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import { useSnackbar } from "../components/SnackbarContext";
import Input from "../components/Input";
import AsyncSelect from "../components/AsyncSelect";
import ImagePicker from "../components/ImagePicker";
import { Asset } from "react-native-image-picker";

const VENDING_DATA = [
    { id: 'VM-01', name: 'Lobby Sudirman - VM01' },
    { id: 'VM-02', name: 'Kantin Lantai 2 - VM02' },
    { id: 'VM-03', name: 'Area Parkir - VM03' },
    { id: 'VM-04', name: 'Gudang Central - VM04' },
    { id: 'VM-05', name: 'Rest Area KM 57 - VM05' },
];

const Dummy = () => {
    const { showSnackbar } = useSnackbar();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [photo, setPhoto] = useState<Asset | null>(null);
    const [selectedMachine, setSelectedMachine] = useState<{ id: string | number, name: string } | null>(null);

    const loadVendingOptions = async (query: string) => {
        await new Promise(resolve => setTimeout(resolve, 600));
        if (!query) return VENDING_DATA;
        return VENDING_DATA.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase())
        );
    };

    const handleConnect = () => {
        if (!username || !password || !selectedMachine || !photo) {
            showSnackbar("Lengkapi semua data termasuk foto!", "warning");
            return;
        }

        Alert.alert(
            "Konfirmasi Koneksi",
            `Hubungkan petugas ${username} ke unit ${selectedMachine.name}?`,
            [
                {
                    text: "Batal", 
                    onPress: () => showSnackbar(`Proses dibatalkan`, "error"), 
                    style: 'cancel'
                },
                {
                    text: "Ya, Hubungkan",
                    onPress: () => showSnackbar(`Berhasil Terhubung ke ${selectedMachine.name}!`, "success")
                }
            ]
        );
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            className="flex-1 bg-gray-50"
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Padding atas dan bawah diperlebar agar konten tidak menempel ke pinggir layar */}
                <View className="px-6 pt-12 pb-20">
                    
                    <View className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 w-full">

                        {/* Logo & Branding */}
                        <View className="items-center mb-8">
                            <View className="w-20 h-20 bg-blue-600 rounded-3xl items-center justify-center mb-4 shadow-lg rotate-3">
                                <Text className="text-white font-black text-4xl">V</Text>
                            </View>
                            <Text className="text-gray-900 font-extrabold text-3xl tracking-tight">
                                VendingIot
                            </Text>
                            <Text className="text-blue-500 font-semibold text-xs uppercase tracking-widest mt-1">
                                Monitoring Node
                            </Text>
                        </View>

                        {/* Input Section */}
                        <Input
                            label="Username Petugas"
                            placeholder="Ketik username Anda"
                            value={username}
                            onChangeText={setUsername}
                        />

                        <Input
                            label="Password"
                            placeholder="Masukkan password"
                            value={password}
                            onChangeText={setPassword}
                            type="password"
                        />

                        {/* Async Select Section */}
                        <AsyncSelect
                            label="Pilih Unit Mesin"
                            placeholder="Klik untuk mencari mesin..."
                            loadOptions={loadVendingOptions}
                            onSelect={(item) => setSelectedMachine(item)}
                            selectedValue={selectedMachine?.name}
                        />

                        {/* Image Picker Section */}
                        <ImagePicker
                            label="Lampiran Bukti Vending"
                            value={photo}
                            onImageValidated={(file) => setPhoto(file)}
                        />

                        {/* Info Status */}
                        <View className="mt-2 bg-gray-50 px-6 py-4 rounded-2xl border border-gray-100 w-full flex-row justify-between items-center">
                            <View>
                                <Text className="text-gray-400 font-bold uppercase text-[10px]">Status</Text>
                                <Text className="text-gray-700 font-bold text-sm">Ready to Connect</Text>
                            </View>
                            <View className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                        </View>

                        {/* Main Action Button */}
                        <Pressable
                            className="w-full mt-8"
                            onPress={handleConnect}
                        >
                            {({ pressed }) => (
                                <View
                                    className={`py-4 rounded-2xl items-center shadow-md ${(!selectedMachine || !username || !photo) ? 'bg-gray-300' : (pressed ? 'bg-blue-800' : 'bg-blue-600')
                                        }`}
                                    style={{ transform: [{ scale: pressed ? 0.98 : 1 }] }}
                                >
                                    <Text className="text-white font-bold text-lg">
                                        {pressed ? 'Connecting...' : 'Mulai Monitoring'}
                                    </Text>
                                </View>
                            )}
                        </Pressable>

                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Dummy;