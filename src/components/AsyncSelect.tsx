import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  TextInput, 
  FlatList, 
  ActivityIndicator,
  SafeAreaView 
} from 'react-native';

interface Option {
  id: string | number;
  name: string;
}

interface AsyncSelectProps {
  label: string;
  placeholder?: string;
  loadOptions: (query: string) => Promise<Option[]>;
  onSelect: (item: Option) => void;
  selectedValue?: string;
  error?: string; // Tambahkan prop error
}

const AsyncSelect = ({ label, placeholder, loadOptions, onSelect, selectedValue, error }: AsyncSelectProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (searchQuery: string) => {
    setLoading(true);
    try {
      const results = await loadOptions(searchQuery);
      setOptions(results);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, [loadOptions]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (modalVisible) fetchData(query);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [query, modalVisible, fetchData]);

  // Tentukan warna border berdasarkan status error
  const borderColor = error ? "border-red-500" : "border-gray-200";

  return (
    <View className="w-full mb-4">
      <Text className="text-gray-600 font-semibold mb-2 ml-1 text-sm uppercase tracking-wider">
        {label}
      </Text>
      
      {/* TRIGGER */}
      <TouchableOpacity 
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
        // Dinamis ganti border color jika ada error
        className={`bg-gray-50 border ${borderColor} rounded-2xl px-5 py-4 flex-row justify-between items-center`}
      >
        <Text className={selectedValue ? "text-gray-800 text-base font-medium" : "text-gray-400 text-base"}>
          {selectedValue || placeholder || "Pilih data..."}
        </Text>

        <View 
            style={{ 
                width: 0, height: 0, 
                borderLeftWidth: 5, borderRightWidth: 5, borderTopWidth: 6,
                borderLeftColor: 'transparent', borderRightColor: 'transparent', 
                // Panah juga ikut merah jika error
                borderTopColor: error ? '#ef4444' : '#6b7280' 
            }} 
        />
      </TouchableOpacity>

      {/* PESAN ERROR */}
      {error && (
        <Text className="text-red-500 text-xs mt-1 ml-2 font-medium">
          {error}
        </Text>
      )}

      {/* MODAL SEARCH */}
      <Modal visible={modalVisible} animationType="slide">
        <SafeAreaView className="flex-1 bg-white">
          <View className="p-6 flex-1">
            
            <View className="flex-row justify-between items-center mb-6">
              <View>
                <Text className="text-2xl font-black text-gray-900">{label}</Text>
              </View>
              <TouchableOpacity 
                onPress={() => setModalVisible(false)}
                className="bg-gray-100 h-10 w-10 rounded-full items-center justify-center"
              >
                <Text className="text-gray-600 font-bold">✕</Text>
              </TouchableOpacity>
            </View>

            <View className="bg-gray-50 rounded-2xl px-4 py-1 flex-row items-center mb-6 border border-gray-200">
              <TextInput
                autoFocus
                className="flex-1 py-3 text-gray-800 text-base"
                placeholder="Ketik untuk mencari..."
                value={query}
                onChangeText={setQuery}
              />
              {loading && <ActivityIndicator size="small" color="#2563eb" />}
            </View>

            <FlatList
              data={options}
              keyboardShouldPersistTaps="handled"
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  onPress={() => {
                    onSelect(item);
                    setModalVisible(false);
                    setQuery('');
                  }}
                  className={`py-4 px-4 rounded-xl mb-2 ${
                    selectedValue === item.name ? 'bg-blue-50 border border-blue-200' : 'bg-white'
                  }`}
                >
                  <Text className={`text-lg ${selectedValue === item.name ? 'text-blue-700 font-bold' : 'text-gray-700'}`}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={() => (
                <View className="items-center mt-20">
                    <Text className="text-gray-400">
                        {loading ? "Mencari..." : "Data tidak ditemukan."}
                    </Text>
                </View>
              )}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default AsyncSelect;