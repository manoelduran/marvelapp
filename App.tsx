import { StatusBar } from 'expo-status-bar';
import { useFonts, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins';
import React from 'react';

import { View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { SignIn } from '@screens/SignIn';


export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium
  });
  if (!fontsLoaded) {
    return <AppLoading />
  }
 
  return (
    <View>
      <StatusBar
        translucent
      />
      <SignIn />
    </View>
  );
}
