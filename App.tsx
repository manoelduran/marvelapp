import { StatusBar } from 'expo-status-bar';
import { useFonts, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins';
import React from 'react';
import md5 from 'js-md5';
const { PUBLIC_KEY } = process.env;
const { PRIVATE_KEY } = process.env;
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useTheme } from 'styled-components/native';
import { SignIn } from '@src/screens/SignIn';


export default function App() {
  const theme = useTheme();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium
  });
  if (!fontsLoaded) {
    return <AppLoading />
  }
  // async function GetCharacters() {
  //   const timestamp = Number(new Date())
  //   const hash = md5.create()
  //   hash.update(timestamp + String(PRIVATE_KEY) + String(PUBLIC_KEY))

  //   const response = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&orderBy=name&limit=10&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`)
  //   const listofCharacters = await response.json();
  // }
  return (
    <View>
      <StatusBar
        translucent
        backgroundColor={theme.COLORS.ALERT_50}
      />
      <SignIn />
    </View>
  );
}
