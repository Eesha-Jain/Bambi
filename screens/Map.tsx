import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
const win = Dimensions.get('window');
import colors from '../assets/files/Colors';
import MapView from 'react-native-maps';
import data from '../tempmapdata.ts';
import * as Location from 'expo-location';

export default function Map({navigation: {navigate}}) {
  let [reports, setReports] = useState([]);
  let [position, setPosition] = useState({
    "coords": {
      "accuracy": 65,
      "altitude": 131.98288917541504,
      "altitudeAccuracy": 10,
      "heading": -1,
      "latitude": 47.62433193633936,
      "longitude": -122.12524060705351,
      "speed": -1,
    },
    "timestamp": 1632112627679.3599,
  });

  useEffect(() => {
    setReports(data.reports);
    findCoordinates();
  }, []);

  function findCoordinates() {
    Location.installWebGeolocationPolyfill();
    navigator.geolocation.getCurrentPosition(setPosition);
	};

  return (
    <View style={styles.container}>
        <View style={{paddingTop: 25}}><Image source={require('../assets/images/Top.png')} style={{width: win.width, height: win.width * (119 / 1242)}} /></View>

        <MapView
          style={styles.map}
          initialRegion={{
            latitude: position["coords"]["latitude"],
            longitude: position["coords"]["longitude"],
            latitudeDelta: 2,
            longitudeDelta: 2
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
