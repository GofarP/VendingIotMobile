import React from "react";
import {
    View,
    Text,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import Input from "../components/Input";
import { useLogin } from "../hooks/useLogin";

const LoginScreen = () => {
    const {
        form,
        setForm,
        isSubmitting,
        serverErrors,
        handleLogin
    } = useLogin();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            className="flex-1 bg-gray-50"
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View className="flex-1 justify-center px-6 py-12">
                    <View className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-100 w-full">
                        
                        {/* Branding */}
                        <View className="items-center mb-10">
                            <View className="w-20 h-20 bg-blue-600 rounded-3xl items-center justify-center mb-4 shadow-lg rotate-3">
                                <Text className="text-white font-black text-4xl">V</Text>
                            </View>
                            <Text className="text-gray-900 font-extrabold text-3xl tracking-tight">VendingIot</Text>
                            <Text className="text-blue-500 font-semibold text-xs uppercase tracking-widest mt-1">Secure Access</Text>
                        </View>

                        <Input
                            label="Email Address"
                            placeholder="your@mail.com"
                            value={form.email}
                            onChangeText={(text) => setForm({ ...form, email: text })}
                            type="email"
                            // Menyesuaikan key dari backend (PascalCase)
                            error={serverErrors.Email?.[0]}
                        />

                        <Input
                            label="Password"
                            placeholder="Masukkan Password Anda"
                            value={form.password}
                            onChangeText={(text) => setForm({ ...form, password: text })}
                            type="password"
                            error={serverErrors.Password?.[0]}
                        />

                        <Pressable
                            className="w-full mt-6"
                            onPress={() => handleLogin()} // Trigger mutation
                            disabled={isSubmitting}
                        >
                            {({ pressed }) => (
                                <View
                                    className={`py-4 rounded-2xl items-center shadow-md ${
                                        isSubmitting ? 'bg-gray-300' : (pressed ? 'bg-blue-800' : 'bg-blue-600')
                                    }`}
                                    style={{ transform: [{ scale: pressed ? 0.98 : 1 }] }}
                                >
                                    {isSubmitting ? (
                                        <ActivityIndicator color="white" />
                                    ) : (
                                        <Text className="text-white font-bold text-lg">Masuk Sekarang</Text>
                                    )}
                                </View>
                            )}
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;