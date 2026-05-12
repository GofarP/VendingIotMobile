import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  Alert, 
  ActivityIndicator 
} from 'react-native';
import { launchImageLibrary, Asset, ImagePickerResponse } from 'react-native-image-picker';

interface ImagePickerProps {
  label: string;
  onImageValidated: (file: Asset | null) => void;
  value: Asset | null;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // Limit 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

const ImagePicker = ({ label, onImageValidated, value }: ImagePickerProps) => {
  const [loading, setLoading] = useState(false);

  const handlePickImage = async () => {
    setLoading(true);
    
    try {
      const result: ImagePickerResponse = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.6, // Kompresi otomatis ke 60% untuk bandwidth
        selectionLimit: 1,
        includeExtra: true,
      });

      if (result.didCancel) {
        setLoading(false);
        return;
      }

      if (result.errorCode) {
        Alert.alert('Error', result.errorMessage || 'Gagal membuka galeri');
        setLoading(false);
        return;
      }

      if (result.assets && result.assets.length > 0) {
        const file = result.assets[0];

        // Validasi Tipe File
        if (!ALLOWED_TYPES.includes(file.type || '')) {
          Alert.alert('Format Tidak Aman', 'Hanya diperbolehkan format JPG atau PNG.');
          setLoading(false);
          return;
        }

        // Validasi Ukuran File
        if (file.fileSize && file.fileSize > MAX_FILE_SIZE) {
          Alert.alert('File Terlalu Besar', 'Maksimal ukuran foto adalah 5MB.');
          setLoading(false);
          return;
        }

        onImageValidated(file);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('System Error', 'Terjadi kesalahan pada modul galeri.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="w-full mb-6">
      {/* Label Komponen */}
      <Text className="text-gray-500 font-bold mb-2 ml-1 text-xs uppercase tracking-widest">
        {label}
      </Text>

      {/* Container Utama (Fixed Height h-48 agar tidak melar) */}
      <TouchableOpacity 
        onPress={handlePickImage}
        disabled={loading}
        activeOpacity={0.8}
        className={`bg-gray-50 border-2 border-dashed rounded-[30px] overflow-hidden items-center justify-center h-48 ${
          value ? 'border-blue-300' : 'border-gray-200'
        }`}
      >
        {loading ? (
          <ActivityIndicator color="#2563eb" />
        ) : value ? (
          /* Tampilan saat Foto Terpilih */
          <View className="w-full h-full relative">
            <Image 
              source={{ uri: value.uri }} 
              className="w-full h-full"
              resizeMode="cover"
            />
            {/* Overlay Text */}
            <View className="absolute bottom-0 left-0 right-0 bg-black/40 py-2">
              <Text className="text-white text-center text-[10px] font-black tracking-widest">
                KETUK UNTUK MENGGANTI
              </Text>
            </View>
          </View>
        ) : (
          /* Tampilan Placeholder Kosong */
          <View className="items-center">
            <View className="bg-blue-100 w-12 h-12 rounded-full items-center justify-center mb-2">
               <Text className="text-blue-600 text-2xl font-light">+</Text>
            </View>
            <Text className="text-gray-500 font-bold text-sm">Pilih Bukti Foto</Text>
            <Text className="text-gray-400 text-[10px] mt-1 italic">
              JPG/PNG (Maks 5MB)
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Tombol Hapus (Hanya muncul jika ada foto) */}
      {value && (
        <TouchableOpacity 
          onPress={() => onImageValidated(null)}
          className="mt-2 self-end px-2"
        >
          <Text className="text-red-500 font-bold text-xs">Hapus & Batalkan</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ImagePicker;