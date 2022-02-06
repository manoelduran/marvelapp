import { StatusBar } from 'expo-status-bar';
import React from 'react';
import md5 from 'js-md5';
const { PUBLIC_KEY } = process.env;
const { PRIVATE_KEY } = process.env;
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  async function GetCharacters() {
    const timestamp = Number(new Date())
    const hash = md5.create()
    hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY)

    const response = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&orderBy=name&limit=10&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`)
    const listofCharacters = await response.json();
  }
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
