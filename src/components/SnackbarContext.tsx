import React, { createContext, useContext, useState, ReactNode } from 'react';
import Snackbar, { SnackbarType } from '../components/Snackbar';

interface SnackbarContextData {
  showSnackbar: (message: string, type?: SnackbarType) => void;
}

const SnackbarContext = createContext<SnackbarContextData>({} as SnackbarContextData);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState({
    visible: false,
    message: '',
    type: 'default' as SnackbarType,
  });

  const showSnackbar = (message: string, type: SnackbarType = 'default') => {
    setState({ visible: true, message, type });
  };

  const hideSnackbar = () => {
    setState((prev) => ({ ...prev, visible: false }));
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar 
        visible={state.visible} 
        message={state.message} 
        type={state.type} 
        onDismiss={hideSnackbar} 
      />
    </SnackbarContext.Provider>
  );
};

// Hook kustom agar mudah dipanggil
export const useSnackbar = () => useContext(SnackbarContext);