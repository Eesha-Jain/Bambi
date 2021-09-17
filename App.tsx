import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import FirstScreen from './screens/FirstScreen';
import Map from './screens/Map';

export default function App() {
  const [route, setRoute] = useState("FirstScreen");

  useEffect(() => {
    const makeRequest = async () => {
      await Font.loadAsync({
        ...Ionicons.font,
        'hn-bold': require('./assets/fonts/Bold.otf'),
        'hn-extrabold': require('./assets/fonts/ExtraBold.otf'),
        'hn-hairline': require('./assets/fonts/Hairline.otf'),
        'hn-hairlineitalic': require('./assets/fonts/HairlineItalic.otf'),
        'hn-light': require('./assets/fonts/Light.otf'),
        'hn-medium': require('./assets/fonts/Medium.otf'),
        'hn-regular': require('./assets/fonts/Regular.otf'),
        'hn-semibolditalic': require('./assets/fonts/SemiBoldItalic.otf'),
        'hn-super': require('./assets/fonts/Super.otf'),
        'hn-thin': require('./assets/fonts/Thin.otf'),
        'hn-ultralight': require('./assets/fonts/UltraLight.otf'),
      });
    }

    makeRequest();
  }, []);

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
