import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
const win = Dimensions.get('window');
import colors from '../assets/files/Colors';
import MapView from 'react-native-maps';
import data from '../tempmapdata.ts';
import * as Location from 'expo-location';
import uuid from 'react-native-uuid';

export default function Map({navigation: {navigate}}) {
  let [reports, setReports] = useState([]);
  let [position, setPosition] = useState({
    "coords": {
      "accuracy": 65,
      "altitude": 131.98288917541504,
      "altitudeAccuracy": 10,
      "heading": -1,
      "latitude": 0,
      "longitude": 0,
      "speed": -1,
    },
    "timestamp": 1632112627679.3599,
  });

  Location.installWebGeolocationPolyfill();

  function addReport() {
    navigator.geolocation.getCurrentPosition(setPosition);
    reports.push({
      "id": uuid.v4(),
      "location": "DEER SIGHTING",
      "lat": position.lat,
      "lon": position.long,
      "comments": (Date.now().getMinutes() - Date.now().getMinutes()) + " minutes ago",
      "created_at": Date.now(),
    });
  }

  useEffect(() => {
    setReports(data.reports);
    navigator.geolocation.getCurrentPosition(setPosition);
  }, []);

  return (
    <View style={styles.container}>
        <View style={{paddingTop: 25}}><Image source={require('../assets/images/Top.png')} style={{width: win.width, height: win.width * (119 / 1242)}} /></View>

        <MapView
          style={styles.map}
          region={{
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

        <TouchableOpacity onPress={() => {addReport();}} style={{marginTop: 20, backgroundColor: colors.yellow, padding: 20, width: win.width * 0.9, borderRadius: 10}}><Text style={{color: colors.brown, fontFamily: "ns-regular", fontSize: 14, textAlign: "center"}}>REPORT DEER CROSSING AT YOUR LOCATION</Text></TouchableOpacity>
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
