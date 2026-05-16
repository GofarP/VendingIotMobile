import React from 'react';
import {
  Modal,
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
} from 'react-native';

interface AppModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onPrimaryAction?: () => void;
  primaryLabel?: string;
  isSubmitting?: boolean;
  primaryColor?: string;
}

const AppModal = ({
  visible,
  onClose,
  title,
  children,
  onPrimaryAction,
  primaryLabel = 'Save Changes',
  isSubmitting = false,
  primaryColor = 'bg-blue-600',
}: AppModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* 1. Backdrop Utama menggunakan StyleSheet standar (Lebih Aman) */}
      <View style={styles.centeredView}>
        
        {/* 2. Pressable untuk menutup modal jika klik area luar */}
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        {/* 3. KeyboardAvoidingView membungkus kartu putih saja */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalWrapper}
        >
          <View className="bg-white rounded-t-[45px] p-10 shadow-2xl w-full">
            {/* Handle Bar */}
            <View className="items-center mb-8">
              <View className="w-16 h-1.5 bg-slate-100 rounded-full mb-6" />
              <Text className="text-2xl font-black text-slate-900 text-center">
                {title}
              </Text>
            </View>

            {/* Content Area */}
            <View className="space-y-4">
              {children}
            </View>

            {/* Action Buttons */}
            <View className="flex-row items-center justify-between mt-10">
              <TouchableOpacity
                className="flex-1 py-4 items-center"
                onPress={onClose}
                disabled={isSubmitting}
              >
                <Text className="text-slate-400 font-bold text-lg">Cancel</Text>
              </TouchableOpacity>

              {onPrimaryAction && (
                <TouchableOpacity
                  activeOpacity={0.9}
                  className={`flex-[2.5] ${primaryColor} py-4 rounded-2xl items-center shadow-lg shadow-blue-200`}
                  onPress={onPrimaryAction}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text className="text-white font-bold text-lg">
                      {primaryLabel}
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fallback jika bg-black/70 gagal
  },
  modalWrapper: {
    width: '100%',
    justifyContent: 'flex-end',
  },
});

export default AppModal;