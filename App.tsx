import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import theme from './src/theme';
import { ThemeProvider } from 'styled-components/native';
import { Routes } from './src/routes';
import { AuthProvider } from '@hooks/useAuth';


export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium
  });
  if (!fontsLoaded) {
    return <AppLoading />
  };

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style='light' translucent backgroundColor='transparent' />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
};
