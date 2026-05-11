import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Home from './src/components/Home';
import Toast from 'react-native-toast-message';
import { SnackbarProvider } from './src/components/SnackbarContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <SnackbarProvider>
        <Home />
        <Toast />
      </SnackbarProvider>
    </SafeAreaProvider>
  );
}