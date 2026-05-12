import React from "react";
import {
    View,
    Text,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import Input from "../components/Input"; // Pastikan path benar
import { useLogin } from "../hooks/useLogin";

const Login = () => {
    // Destructuring senjata dari hook dengan struktur baru
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

                    {/* Card Container */}
                    <View className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-100 w-full">

                        {/* Branding Section */}
                        <View className="items-center mb-10">
                            <View className="w-20 h-20 bg-blue-600 rounded-3xl items-center justify-center mb-4 shadow-lg rotate-3">
                                <Text className="text-white font-black text-4xl">V</Text>
                            </View>
                            <Text className="text-gray-900 font-extrabold text-3xl tracking-tight">
                                VendingIot
                            </Text>
                            <Text className="text-blue-500 font-semibold text-xs uppercase tracking-widest mt-1">
                                Secure Access
                            </Text>
                        </View>

                        {/* Input Email */}
                        <Input
                            label="Email Address"
                            placeholder="your@mail.com"
                            value={form.email}
                            onChangeText={(text) => setForm({ ...form, email: text })}
                            type="email"
                            // Ambil pesan error pertama dari array (sesuai gaya Department)
                            error={serverErrors.Email?.[0]}
                        />

                        {/* Input Password */}
                        <Input
                            label="Password"
                            placeholder="Masukkan Password Anda"
                            value={form.password}
                            onChangeText={(text) => setForm({ ...form, password: text })}
                            type="password"
                            // Ambil pesan error pertama dari array
                            error={serverErrors.Password?.[0]}
                        />

                        {/* Tombol Login */}
                        <Pressable
                            className="w-full mt-6"
                            onPress={() => handleLogin()}
                            disabled={isSubmitting}
                        >
                            {({ pressed }) => (
                                <View
                                    className={`py-4 rounded-2xl items-center shadow-md ${isSubmitting
                                            ? 'bg-gray-300'
                                            : (pressed ? 'bg-blue-800' : 'bg-blue-600')
                                        }`}
                                    style={{ transform: [{ scale: pressed ? 0.98 : 1 }] }}
                                >
                                    {isSubmitting ? (
                                        <ActivityIndicator color="white" />
                                    ) : (
                                        <Text className="text-white font-bold text-lg">
                                            Masuk Sekarang
                                        </Text>
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

export default Login;