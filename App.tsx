import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import FirstScreen from './screens/FirstScreen';
import Map from './screens/Map';

export default function App() {
  const [route, setRoute] = useState("FirstScreen");

  const [loaded] = useFonts({
    'ns-light': require('./assets/fonts/ns-light.otf'),
    'ns-bold': require('./assets/fonts/ns-bold.otf'),
    'ns-medium': require('./assets/fonts/ns-medium.otf'),
    'ns-mediumbold': require('./assets/fonts/ns-mediumbold.otf'),
    'ns-regular': require('./assets/fonts/ns-regular.otf')
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName={route}>
        <Stack.Screen name="FirstScreen" options={{headerShown:false}} component={FirstScreen} />
        <Stack.Screen name="Map" options={{headerShown:false}} component={Map} />
      </Stack.Navigator>

      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
