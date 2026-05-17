import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  LayoutDashboard,
  Users,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Key,
  FolderTree,
  Box,
  MonitorSmartphone,
  PackagePlus,
  LogOut,
  LucideIcon,
} from 'lucide-react-native';
import Config from 'react-native-config';

interface MenuItemProps {
  icon: LucideIcon;
  title: string;
  colorClass: string;
  iconColor: string;
  onPress?: () => void;
  isFullWidth?: boolean;
}


const MenuItem = ({
  icon: Icon,
  title,
  colorClass,
  iconColor,
  onPress,
  isFullWidth = false,
}: MenuItemProps) => (
  <Pressable
    onPress={onPress}
    style={{ width: isFullWidth ? '100%' : '48%' }}
    className="bg-white p-5 rounded-[32px] mb-4 shadow-sm border border-slate-100 flex-col items-start active:bg-slate-50"
  >
    <View
      className={`w-12 h-12 ${colorClass} rounded-2xl items-center justify-center mb-4 shadow-sm`}
    >
      <Icon size={22} color={iconColor} strokeWidth={2.5} />
    </View>
    <Text className="font-extrabold text-slate-800 text-[13px] leading-tight uppercase tracking-tight">
      {title}
    </Text>
  </Pressable>
);

const CategoryHeader = ({ title }: { title: string }) => (
  <View className="flex-row items-center mt-8 mb-5 ml-1">
    <Text className="text-blue-600 font-black text-[10px] uppercase tracking-[2px] mr-4">
      {title}
    </Text>
    <View className="flex-1 h-[1px] bg-slate-200" />
  </View>
);

const HomeScreen = () => {
  const { auth, logout } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <View className="px-8 pt-12 pb-14 bg-blue-600 rounded-b-[50px] shadow-2xl shadow-blue-300">
          <View className="flex-row justify-between items-center">
            <View className="flex-1 mr-4">
              <Text className="text-blue-200 font-bold text-[10px] uppercase tracking-[3px]">
                VendingIot System
              </Text>
              <Text
                className="text-white text-3xl font-black mt-1 tracking-tight"
                numberOfLines={1}
              >
                
                {auth?.fullName?.split(' ')[0] || 'Petugas'}
              </Text>
              <View className="bg-white/20 self-start px-4 py-1.5 rounded-full mt-3 border border-white/30">
                <Text className="text-white text-[10px] font-black uppercase tracking-wider">
                  {auth?.roles?.[0] || ''}
                </Text>
              </View>
            </View>

            <View className="w-20 h-20 bg-white/20 rounded-[30px] items-center justify-center border border-white/40 shadow-sm">
              <View className="w-20 h-20 bg-white/20 rounded-[30px] items-center justify-center border border-white/40 shadow-sm overflow-hidden">
                {auth?.photoUrl ? (
                  <Image
                    source={{ uri: `${Config.SITE_URL}/uploads/users/${auth.photoUrl}` }}
                    className="absolute inset-0 w-full h-full"
                    resizeMode="cover"
                  />
                ) : (
                  <Text className="text-white font-black text-3xl">
                    {auth?.fullName?.charAt(0).toUpperCase() || 'V'}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>

        {/* 2. Menu Sections */}
        <View className="px-6 -mt-6">

          {/* KATEGORI: DATA MASTER */}
          <CategoryHeader title="Data Master" />
          <View className="flex-row flex-wrap justify-between">
            <MenuItem
              icon={Users}
              title="Employee"
              colorClass="bg-indigo-50"
              iconColor="#4f46e5"
              onPress={() => navigation.navigate('Employee')}
            />
            <MenuItem
              icon={Building2}
              title="Department"
              colorClass="bg-purple-50"
              iconColor="#9333ea"
              onPress={() => navigation.navigate('Department')}
            />
            <MenuItem
              icon={ShieldCheck}
              title="Perm. Category"
              colorClass="bg-cyan-50"
              iconColor="#0891b2"
              onPress={() => navigation.navigate('PermissionCategory')}
            />
            <MenuItem
              icon={CheckCircle2}
              title="Permission"
              colorClass="bg-teal-50"
              iconColor="#0d9488"
              onPress={() => navigation.navigate('Permission')}
            />
            <MenuItem
              icon={Key}
              title="Role Access"
              colorClass="bg-amber-50"
              iconColor="#d97706"
              onPress={() => navigation.navigate('Role')}
            />
            <MenuItem
              icon={FolderTree}
              title="Item Category"
              colorClass="bg-rose-50"
              iconColor="#e11d48"
              onPress={() => navigation.navigate('ItemCategory')}
            />
          </View>

          <CategoryHeader title="Inventory" />
          <MenuItem
            icon={Box}
            title="Item Inventory"
            colorClass="bg-orange-50"
            iconColor="#ea580c"
            isFullWidth={true}
            onPress={() => navigation.navigate('Item')}
          />

          <CategoryHeader title="Vending Machine" />
          <View className="flex-row flex-wrap justify-between">
            <MenuItem
              icon={MonitorSmartphone}
              title="Machine"
              colorClass="bg-emerald-50"
              iconColor="#059669"
              onPress={() => navigation.navigate('VendingMachine')}
            />
            <MenuItem
              icon={PackagePlus}
              title="Add Item"
              colorClass="bg-sky-50"
              iconColor="#0284c7"
              onPress={() => navigation.navigate('VendingItem')}
            />
          </View>
        </View>

        {/* 3. Logout Section */}
        <View className="px-6 mt-16">
          <Pressable
            onPress={handleLogout}
            disabled={isLoggingOut}
            className={`py-5 rounded-[32px] items-center flex-row justify-center border ${
              isLoggingOut
                ? 'bg-slate-100 border-slate-200'
                : 'bg-red-50 border-red-100 shadow-sm'
            } active:bg-red-100`}
          >
            {isLoggingOut ? (
              <ActivityIndicator color="#ef4444" />
            ) : (
              <>
                <LogOut
                  size={20}
                  color="#ef4444"
                  strokeWidth={2.5}
                  className="mr-3"
                />
                <View className="w-2" />
                <Text className="text-red-600 font-black text-base uppercase tracking-tight">
                  Keluar Aplikasi
                </Text>
              </>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
