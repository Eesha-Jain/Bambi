import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
const win = Dimensions.get('window');
import colors from '../assets/files/Colors';
import MapView from 'react-native-maps';
import data from '../tempmapdata.ts';

export default function Map({navigation: {navigate}}) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    setReports(data.reports);
  }, []);

  return (
    <View style={styles.container}>
        <View style={{paddingTop: 25}}><Image source={require('../assets/images/Top.png')} style={{width: win.width, height: win.width * (119 / 1242)}} /></View>

        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.1,
            longitude: -95.7,
            latitudeDelta: 10,
            longitudeDelta: 45
          }} >
            {
              reports.map((report) => <MapView.Marker
                key={report.id}
                coordinate={{ latitude: report.lat, longitude: report.lon }}
                title={report.location}
                description={report.comments}
              >
              </MapView.Marker>)
            }
        </MapView>

        <TouchableOpacity style={{marginTop: 20, backgroundColor: colors.yellow, padding: 20, width: win.width * 0.9, borderRadius: 10}}><Text style={{color: colors.brown, fontFamily: "ns-regular", fontSize: 14, textAlign: "center"}}>REPORT DEER CROSSING AT YOUR LOCATION</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  map: {
    marginTop: 20,
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.73,
  }
});
