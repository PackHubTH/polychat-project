import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import React, { useEffect } from 'react';
import { enableScreens } from 'react-native-screens';

import Routes from './src/routes';
import { AuthContextProvider } from './src/utils/auth/AuthContext';

export default function App() {
  useEffect(() => {
    if (Platform.OS === "ios") {
      enableScreens(false);
    }
  }, []);
  //ref: https://github.com/react-navigation/react-navigation/issues/10432

  return (
    <AuthContextProvider>
      <NativeBaseProvider>
        <Routes />
      </NativeBaseProvider>
    </AuthContextProvider>
  );
}
