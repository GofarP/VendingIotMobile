import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

interface InputProps {
    label: string;
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    type?: 'text' | 'number' | 'email' | 'password';
}

const Input = ({ label, placeholder, value, onChangeText, type = 'text' }: InputProps) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isPassword = type === 'password';
    const keyboardType =
        type === 'number' ? 'numeric' :
            type === 'email' ? 'email-address' : 'default';

    return (
        <View className='w-full mb-4'>
            <Text className='text-gray-600 font-semibold mb-2 ml-1 text-sm uppercase tracking-wider'>
                {label}
            </Text>

            <View className='flex-row items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 focus:border-blue-500'>
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
                        <Text className="text-blue-600 font-bold text-xs">
                            {isPasswordVisible ? 'HIDE' : 'SHOW'}
                        </Text>
                    </TouchableOpacity>
                )}

            </View>
        </View>
    )
}
export default Input;