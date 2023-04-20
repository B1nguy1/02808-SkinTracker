//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { BottomTabNavigator, ScreenNavigator } from './navigations';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <ScreenNavigator />
    </NavigationContainer>
  );
}
