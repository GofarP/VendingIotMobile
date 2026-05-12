import React, { useState } from 'react';
import { 
    View, 
    Text, 
    Pressable, 
    SafeAreaView, 
    ActivityIndicator, 
    ScrollView 
} from 'react-native';
import { useAuthStore } from '../store/useAuthStore';

const Home = () => {
    const { auth, logout } = useAuthStore();
    
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logout();
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="p-6">
                    
                    {/* Header Profil Box */}
                    <View className="bg-blue-600 p-8 rounded-[40px] shadow-xl">
                        <View className="flex-row justify-between items-start">
                            <View>
                                <Text className="text-blue-100 text-xs font-bold uppercase tracking-widest">
                                    Selamat Datang,
                                </Text>
                                <Text className="text-white text-3xl font-black mt-1">
                                    {auth?.fullName || "Petugas"}
                                </Text>
                            </View>
                            {/* Inisial Nama Bulat */}
                            <View className="w-12 h-12 bg-blue-400 rounded-2xl items-center justify-center border border-blue-300">
                                <Text className="text-white font-bold text-lg">
                                    {auth?.fullName?.charAt(0) || "P"}
                                </Text>
                            </View>
                        </View>
                        
                        <View className="bg-blue-500/50 self-start px-4 py-1.5 rounded-xl mt-6 border border-blue-400/30">
                            <Text className="text-white text-[10px] font-bold uppercase tracking-tighter">
                                🔐 Role: {auth?.roles?.[0] || "No Role"}
                            </Text>
                        </View>
                    </View>

                    {/* Dashboard Menu Section */}
                    <View className="mt-10">
                        <Text className="text-gray-900 font-black text-xl mb-6">
                            Menu VendingIot
                        </Text>
                        
                        {/* Grid Menu (Contoh Implementasi) */}
                        <View className="flex-row flex-wrap justify-between">
                            <View className="w-[48%] bg-white p-6 rounded-3xl mb-4 border border-gray-100 shadow-sm">
                                <View className="w-10 h-10 bg-orange-100 rounded-xl items-center justify-center mb-3">
                                    <Text>📦</Text>
                                </View>
                                <Text className="font-bold text-gray-800">Stok Barang</Text>
                            </View>
                            
                            <View className="w-[48%] bg-white p-6 rounded-3xl mb-4 border border-gray-100 shadow-sm">
                                <View className="w-10 h-10 bg-green-100 rounded-xl items-center justify-center mb-3">
                                    <Text>📟</Text>
                                </View>
                                <Text className="font-bold text-gray-800">Status Mesin</Text>
                            </View>
                        </View>
                    </View>

                    {/* Tombol Logout dengan Loading State */}
                    <Pressable 
                        onPress={handleLogout}
                        disabled={isLoggingOut}
                        className={`mt-10 py-5 rounded-[25px] items-center border ${
                            isLoggingOut ? 'bg-gray-100 border-gray-200' : 'bg-red-50 border-red-100'
                        }`}
                    >
                        {isLoggingOut ? (
                            <ActivityIndicator color="#ef4444" />
                        ) : (
                            <Text className="text-red-600 font-extrabold text-base">
                                Keluar Aplikasi
                            </Text>
                        )}
                    </Pressable>

                    {/* Footer Info */}
                    <Text className="text-center text-gray-400 text-[10px] mt-10">
                        Logged in as: {auth?.email}
                    </Text>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;