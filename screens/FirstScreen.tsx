import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
const win = Dimensions.get('window');
import colors from '../assets/files/Colors';
import storage from "@react-native-async-storage/async-storage";

export default function FirstScreen({navigation: {navigate}}) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/Logo.png')} style={styles.topImage} />
      <Text style={{fontFamily: "ns-bold", fontSize: 25, color: colors.brown}}>Welcome to Bambi!</Text>
      <Text style={{fontFamily: "ns-light", fontSize: 16, color: colors.brown, marginTop: 20, marginLeft: 20, marginRight: 20, textAlign: "center"}}>There are 1.5m deer related accidents every year, so thank you for doing your part in helping deer survive!</Text>

      <TouchableOpacity onPress={async () => {
        await storage.setItem('firsttime', 'false');
        navigate("Map");
      }} style={{marginTop: 20, backgroundColor: colors.yellow, padding: 20, paddingLeft: 40, paddingRight: 40, borderRadius: 10}}><Text style={{color: colors.brown, fontFamily: "ns-regular", fontSize: 16}}>START NOW!</Text></TouchableOpacity>
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
  topImage: {
    width: win.width * 0.8,
    height: win.width * 0.8,
    marginTop: 30
  },
});
