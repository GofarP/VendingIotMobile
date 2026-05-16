import React from 'react';
import { TouchableOpacity, Text, ViewStyle } from 'react-native';
import { Plus, LucideIcon } from 'lucide-react-native';

interface FloatingActionButtonProps {
  onPress: () => void;
  icon?: LucideIcon;
  color?: string;
}

const FloatingActionButton = ({
  onPress,
  icon: Icon = Plus,
  color = 'bg-blue-600',
}: FloatingActionButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        shadowColor: '#2563eb',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 15,
        elevation: 12, 
      }}
      className={`absolute bottom-10 right-8 ${color} w-16 h-16 rounded-full justify-center items-center`}
    >
      <Icon size={32} color="white" strokeWidth={3} />
    </TouchableOpacity>
  );
};

export default FloatingActionButton;
