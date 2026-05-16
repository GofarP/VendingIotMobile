import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

interface PageWrapperProps {
  title: string;
  children: React.ReactNode;
}

const PageWrapper = ({ title, children }: PageWrapperProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" />
      <View
        style={{ paddingTop: insets.top + 10 }}
        className="bg-white px-6 pb-8 shadow-sm rounded-b[40px]"
      >
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="w-12 h-12 bg-slate-100 rounded-2xl items-center justify-center mr-4"
          >
            <ChevronLeft size={28} color="#1e293b" strokeWidth={2.5} />
          </TouchableOpacity>
          <Text className="text-3xl font-black text-blue-600 tracking-tighter">
            {title}
          </Text>
        </View>
      </View>
      {children}
    </View>
  );
};

export default PageWrapper;