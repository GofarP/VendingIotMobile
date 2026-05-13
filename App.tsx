import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
// 1. Tambahkan Import TanStack Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useAuthStore } from './src/store/useAuthStore';
import { SnackbarProvider } from './src/components/SnackbarContext';

import Login from './src/pages/Login';
import Home from './src/pages/Home';

const queryClient = new QueryClient();

export default function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <SnackbarProvider>
          <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
          
          {isAuthenticated ? (
            <Home />
          ) : (
            <Login />
          )}

          <Toast />
        </SnackbarProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}