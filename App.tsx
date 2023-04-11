//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { BottomTapNavigator } from './navigations';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <BottomTapNavigator />
    </NavigationContainer>
  );
}

/*
 <View style={styles.container}>
      <Text>Hello world</Text>
      <StatusBar style="auto" />
    </View>
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/