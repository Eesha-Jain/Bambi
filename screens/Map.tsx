import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
const win = Dimensions.get('window');
import colors from '../assets/files/Colors';

export default function Map({navigation: {navigate}}) {
  return (
    <View style={styles.container}>
      <Text style={{fontFamily: "ns-light", fontSize: 16, color: colors.brown, marginTop: 20, marginLeft: 20, marginRight: 20, textAlign: "center"}}>BAMBI</Text>
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
