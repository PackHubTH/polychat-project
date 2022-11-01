import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import React from 'react';

import Routes from './src/routes';
import { AuthContextProvider } from './src/utils/auth/AuthContext';

export default function App() {
  return (
    <AuthContextProvider>
      <NativeBaseProvider>
        <Routes />
      </NativeBaseProvider>
    </AuthContextProvider>
  );
}
