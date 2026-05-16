import React from 'react';
import { View, TextInput, FlatList, Text } from 'react-native';
import { Search } from 'lucide-react-native';
interface SearchableListProps {
  data: any[];
  renderItem: ({ item }: { item: any }) => React.ReactElement;
  searchValue: string;
  onSearchChange: (text: string) => void;
  isLoading: boolean;
  onRefresh: () => void;
  placeholder?: string;
}

const DataList = ({
  data,
  renderItem,
  searchValue,
  onSearchChange,
  isLoading,
  onRefresh,
  placeholder = 'search...',
}: SearchableListProps) => {
  return (
    <View className="flex-1 px-4">
      <View className="mx-2 mt-[-25px] flex-row items-center bg-white px-4 rounded-2xl border border-slate-200 shadow-sm h-14">
        <Search size={20} color="#94a3b8" strokeWidth={2} />
        <TextInput
          className="flex-1 text-slate-700 font-medium ml-2"
          placeholder={placeholder}
          placeholderTextColor="#cbd5e1"
          value={searchValue}
          onChangeText={onSearchChange}
        />
      </View>
      <FlatList
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 120 }}
        data={data}
        keyExtractor={item => String(item.id)}
        showsVerticalScrollIndicator={false}
        onRefresh={onRefresh}
        refreshing={isLoading}
        renderItem={renderItem}
        ListEmptyComponent={
          !isLoading ? (
            <View className="items-center mt-20">
              <Text className="text-4xl mb-4">📂</Text>
              <Text className="text-slate-400 font-medium text-center">
                No data found.
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default DataList;
