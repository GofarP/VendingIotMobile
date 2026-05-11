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
import { useSnackbar } from "./SnackbarContext";
import Input from "./Input";

const Home = () => {
    const { showSnackbar } = useSnackbar();
    
    // 1. Tambahkan State untuk Input
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handlePress = () => {
        // Validasi sederhana sebelum muncul Alert
        if (!username || !password) {
            showSnackbar("Harap isi username dan password!", "warning");
            return;
        }

        Alert.alert(
            "Konfirmasi Koneksi",
            "Apakah Anda yakin ingin menghubungkan ke sistem VendingIot?",
            [
                {
                    text: "Batal",
                    onPress: () => {
                        showSnackbar("Koneksi dibatalkan oleh pengguna.", "error");
                    },
                    style: 'cancel'
                },
                {
                    text: "Ya, Hubungkan",
                    onPress: () => {
                        showSnackbar(`Halo ${username}, Berhasil Terhubung!`, "success");
                    }
                }
            ]
        );
    };

    return (
        // KeyboardAvoidingView agar layar naik saat keyboard muncul
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-gray-100"
        >
            <ScrollView 
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-1 justify-center items-center px-6 py-10">
                    <View className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-200 w-full items-center">
                        
                        {/* Logo Area */}
                        <View className="w-20 h-20 bg-blue-600 rounded-3xl items-center justify-center mb-6 shadow-lg rotate-3">
                            <Text className="text-white font-black text-4xl">V</Text>
                        </View>

                        <Text className="text-gray-900 font-extrabold text-3xl tracking-tight">
                            VendingIot
                        </Text>

                        <Text className="text-gray-500 text-center mt-3 leading-6 mb-6">
                            Sistem Inventory & Monitoring{"\n"}
                            <Text className="text-blue-500 font-semibold italic">NativeWind v2 Stable</Text>
                        </Text>

                        {/* 2. Form Input Section */}
                        <Input 
                            label="Username / Email"
                            placeholder="Ketik username Anda"
                            value={username}
                            onChangeText={setUsername}
                            type="text"
                        />

                        <Input 
                            label="Password"
                            placeholder="Masukkan password"
                            value={password}
                            onChangeText={setPassword}
                            type="password"
                        />

                        {/* Status Info (Opsional, diletakkan di bawah input) */}
                        <View className="mt-4 bg-blue-50 px-6 py-3 rounded-2xl border border-blue-100 w-full items-center">
                            <Text className="text-blue-600 font-bold uppercase tracking-widest text-xs">System Status</Text>
                            <Text className="text-gray-700 font-medium mt-1">Ready to Connect</Text>
                        </View>

                        {/* Button Monitoring */}
                        <Pressable
                            className="w-full mt-6"
                            onPress={handlePress}
                            children={({ pressed }) => (
                                <View
                                    className={`py-4 rounded-2xl items-center shadow-md ${pressed ? 'bg-blue-800' : 'bg-blue-600'}`}
                                    style={{ transform: [{ scale: pressed ? 0.98 : 1 }] }}
                                >
                                    <Text className="text-white font-bold text-lg">
                                        {pressed ? 'Menghubungkan...' : 'Mulai Monitoring'}
                                    </Text>
                                </View>
                            )}
                        />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Home;