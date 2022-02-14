import { StatusBar } from 'expo-status-bar';
import { useFonts, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins';
import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components/native';
import theme from './src/theme';
import { Routes } from './src/routes';


export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium
  });
  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style='light' translucent backgroundColor='transparent' />
      <Routes />
    </ThemeProvider>
  );
}
