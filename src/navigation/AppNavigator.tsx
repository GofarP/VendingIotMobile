import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuthStore } from "../store/useAuthStore";  
import LoginScreen from "../pages/LoginScreen";         
import HomeScreen from "../pages/HomeScreen"; 
import DepartmentScreen from "../pages/DepartmentScreen";

const Stack = createStackNavigator();

 const AppNavigator = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isAuthenticated ? (
                    <>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Department" component={DepartmentScreen} />
                    </>
                ) : (
                    <Stack.Screen name="Login" component={LoginScreen} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default AppNavigator;