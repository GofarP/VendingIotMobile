import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

interface InputProps {
    label: string;
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    type?: 'text' | 'number' | 'email' | 'password';
    error?: string; // Menambahkan prop error
}

const Input = ({ label, placeholder, value, onChangeText, type = 'text', error }: InputProps) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    
    const isPassword = type === 'password';
    const hasError = Boolean(error); // Cek apakah ada pesan error

    const keyboardType =
        type === 'number' ? 'numeric' :
            type === 'email' ? 'email-address' : 'default';

    return (
        <View className='w-full mb-4'>
            {/* Label */}
            <Text className={`font-semibold mb-2 ml-1 text-sm uppercase tracking-wider ${hasError ? 'text-red-500' : 'text-gray-600'}`}>
                {label}
            </Text>

            {/* Input Container */}
            <View 
                className={`flex-row items-center bg-gray-50 border rounded-2xl px-4 
                ${hasError ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'}`}
            >
                <TextInput
                    className='flex-1 py-4 text-gray-800 text-base'
                    placeholder={placeholder}
                    placeholderTextColor="#9ca3af"
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                    secureTextEntry={isPassword && !isPasswordVisible}
                    autoCapitalize='none'
                />

                {isPassword && (
                    <TouchableOpacity
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        className='ml-2'
                    >
                        <Text className={`font-bold text-xs ${hasError ? 'text-red-500' : 'text-blue-600'}`}>
                            {isPasswordVisible ? 'HIDE' : 'SHOW'}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Error Message (Muncul di bawah input) */}
            {hasError && (
                <Text className="text-red-500 text-[10px] mt-1 ml-2 font-medium italic">
                    {error}
                </Text>
            )}
        </View>
    )
}

export default Input;