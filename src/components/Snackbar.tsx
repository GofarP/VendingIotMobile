import React, { useEffect, useRef } from "react";
import { Animated, View, Text, TouchableOpacity } from 'react-native';

const AnimatedView = Animated.createAnimatedComponent(View);

export type SnackbarType = 'success' | 'warning' | 'error' | 'default';

interface SnackbarProps {
    visible: boolean;
    message: string;
    type?: SnackbarType;
    onDismiss: () => void
}

const Snackbar = ({ visible, message, type = "default", onDismiss }: SnackbarProps) => {
    const translateY = useRef(new Animated.Value(150)).current;

    const bgColors = {
        success: 'bg-green-600',
        warning: 'bg-amber-500',
        error: 'bg-red-600',
        default: 'bg-gray-900'
    }

    useEffect(() => {
        if (visible) {
            Animated.spring(translateY, {
                toValue: 0,
                damping: 15,
                stiffness: 100,
                useNativeDriver: true,
            }).start();

            const timer = setTimeout(() => handleClose(), 4000);
            return () => clearTimeout(timer);
        }
    }, [visible]);

    const handleClose = () => {
        Animated.timing(translateY, {
            toValue: 150,
            duration: 250,
            useNativeDriver: true,
        }).start(() => onDismiss());
    };

    if (!visible) return null;

    return (
        <AnimatedView
            style={{ transform: [{ translateY }] }}
            className="absolute bottom-8 left-5 right-5 z-50"
        >
            <View className={`${bgColors[type]} px-5 py-4 rounded-2xl flex-row justify-between items-center shadow-2xl`}>
                <View className="flex-1 mr-4">
                    <Text className="text-white font-bold text-sm leading-5">{message}</Text>
                </View>
                <TouchableOpacity
                    onPress={handleClose}
                    className="bg-white/20 h-8 w-8 rounded-full items-center justify-center"
                >
                    <Text className="text-white font-bold text-[10px]">x</Text>
                </TouchableOpacity>
            </View>

        </AnimatedView>
    )
}

export default Snackbar;