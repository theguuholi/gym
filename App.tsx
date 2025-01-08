import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({Roboto_700Bold, Roboto_400Regular});
  return (
    <View style={styles.container}>
      {
        fontsLoaded ? (
          <Text style={{fontFamily: 'Roboto_700Bold', fontSize: 24}}>Hello, World!</Text>
        ) : <View />
      }
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202024',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
