import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuthStore } from "../store/useAuthStore";

import Login from "../pages/Login";
import Home from "../pages/Home";

const Stack = createStackNavigator();

export const AppNavigator = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isAuthenticated ? (
                    <Stack.Screen name="Home" component={Home} />
                ) : (
                    <Stack.Screen name="Login" component={Login} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}