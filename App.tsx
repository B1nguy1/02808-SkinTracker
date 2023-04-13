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

/*
  <NavigationContainer>
      <BottomTapNavigator />
    </NavigationContainer>


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