import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { Center, GluestackUIProvider, Text } from '@gluestack-ui/themed';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { config } from './config/gluestack-ui.config';
import Loading from '@components/Loading';
import Routes from '@routes/index';
import { AuthContext, AuthContextProvider } from '@contexts/AuthContext';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular });
  return (
    <GluestackUIProvider config={config}>
      <AuthContextProvider>
        {
          fontsLoaded ? (
            <Routes />
          ) : <Loading />
        }
      </AuthContextProvider>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
    </GluestackUIProvider>

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
