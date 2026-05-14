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
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';

const HomeScreen = () => {
    const { auth, logout } = useAuthStore();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigation = useNavigation<StackNavigationProp<any>>();

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

  
    const MenuItem = ({ 
        icon, 
        title, 
        colorClass, 
        onPress, 
        isFullWidth = false 
    }: { 
        icon: string, 
        title: string, 
        colorClass: string, 
        onPress?: () => void,
        isFullWidth?: boolean 
    }) => (
        <Pressable 
            onPress={onPress}
            className={`bg-white ${isFullWidth ? 'w-full' : 'w-[48%]'} p-5 rounded-[30px] mb-4 shadow-sm border border-gray-100 flex-col items-start active:bg-gray-50`}
        >
            <View className={`w-10 h-10 ${colorClass} rounded-2xl items-center justify-center mb-3`}>
                <Text className="text-lg">{icon}</Text>
            </View>
            <Text className="font-bold text-gray-800 text-[13px] leading-tight">{title}</Text>
        </Pressable>
    );

    const CategoryHeader = ({ title }: { title: string }) => (
        <Text className="text-blue-600 font-black text-[10px] uppercase tracking-[2px] mb-4 mt-6 ml-1">
            {title}
        </Text>
    );

    return (
        <SafeAreaView className="flex-1 bg-[#F8FAFC]">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                
                {/* 1. Header Profile */}
                <View className="px-6 pt-10 pb-12 bg-blue-600 rounded-b-[50px] shadow-2xl shadow-blue-200">
                    <View className="flex-row justify-between items-center">
                        <View>
                            <Text className="text-blue-100 font-bold text-xs uppercase tracking-widest">VendingIot System</Text>
                            <Text className="text-white text-3xl font-black mt-1">
                                {auth?.fullName?.split(' ')[0] || "Petugas"}
                            </Text>
                            <View className="bg-blue-400/30 self-start px-3 py-1 rounded-full mt-2 border border-white/20">
                                <Text className="text-white text-[10px] font-bold">{auth?.roles?.[0] || "Staff"}</Text>
                            </View>
                        </View>
                        <View className="w-16 h-16 bg-white/20 rounded-3xl items-center justify-center border border-white/30 backdrop-blur-md">
                            <Text className="text-white font-black text-2xl">
                                {auth?.fullName?.charAt(0) || "V"}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* 2. Menu Sections */}
                <View className="px-6 mt-4">
                    
                    {/* KATEGORI: UTAMA */}
                    <CategoryHeader title="Utama" />
                    <MenuItem 
                        icon="📱" 
                        title="Dashboard" 
                        colorClass="bg-blue-100" 
                        isFullWidth={true}
                        onPress={() => navigation.navigate("Dashboard")} 
                    />

                    {/* KATEGORI: DATA MASTER */}
                    <CategoryHeader title="Data Master" />
                    <View className="flex-row flex-wrap justify-between">
                        <MenuItem icon="👥" title="Employee" colorClass="bg-indigo-100" onPress={() => navigation.navigate("Employee")} />
                        <MenuItem icon="🏢" title="Department" colorClass="bg-purple-100" onPress={() => navigation.navigate("Department")} />
                        <MenuItem icon="🛡️" title="Perm. Category" colorClass="bg-cyan-100" onPress={() => navigation.navigate("PermCategory")} />
                        <MenuItem icon="✅" title="Permission" colorClass="bg-teal-100" onPress={() => navigation.navigate("Permission")} />
                        <MenuItem icon="🔑" title="Role" colorClass="bg-amber-100" onPress={() => navigation.navigate("Role")} />
                        <MenuItem icon="📁" title="Item Category" colorClass="bg-rose-100" onPress={() => navigation.navigate("ItemCategory")} />
                    </View>

                    {/* KATEGORI: ITEM */}
                    <CategoryHeader title="Item" />
                    <MenuItem 
                        icon="📦" 
                        title="Item" 
                        colorClass="bg-orange-100" 
                        isFullWidth={true}
                        onPress={() => navigation.navigate("Item")} 
                    />

                    {/* KATEGORI: VENDING MACHINE */}
                    <CategoryHeader title="Vending Machine" />
                    <View className="flex-row flex-wrap justify-between">
                        <MenuItem icon="📟" title="Vending Machine" colorClass="bg-emerald-100" onPress={() => navigation.navigate("VendingMachine")} />
                        <MenuItem icon="➕" title="Vending Item" colorClass="bg-sky-100" onPress={() => navigation.navigate("VendingItem")} />
                    </View>

                </View>

                {/* 3. Logout Section */}
                <View className="px-6 mt-12">
                    <Pressable 
                        onPress={handleLogout}
                        disabled={isLoggingOut}
                        className={`py-5 rounded-[30px] items-center flex-row justify-center border ${
                            isLoggingOut ? 'bg-gray-100 border-gray-200' : 'bg-red-50 border-red-100 shadow-sm'
                        }`}
                    >
                        {isLoggingOut ? (
                            <ActivityIndicator color="#ef4444" />
                        ) : (
                            <Text className="text-red-600 font-black text-base">Keluar Aplikasi</Text>
                        )}
                    </Pressable>
                    <Text className="text-center text-gray-300 text-[10px] mt-6 font-bold uppercase tracking-widest">
                        Build v1.0.26 • {auth?.email}
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;