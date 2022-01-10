import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
const win = Dimensions.get('window');
import colors from '../assets/files/Colors';
import MapView from 'react-native-maps';
import data from '../tempmapdata.ts';
import * as Location from 'expo-location';
import uuid from 'react-native-uuid';
import firebase, { initializeApp } from 'firebase/app';
import config from './config.tsx';
import "firebase/firestore";
import { getFirestore, doc, collection, getDocs, setDoc, addDoc, get } from "firebase/firestore";

const app = firebase.initializeApp(config);
const firestore = app.firestore();

export default function Map({navigation: {navigate}}) {
  const [reports, setReports] = useState([]);
  const [position, setPosition] = useState({
    coords: {
      accuracy: 65,
      altitude: 131.98288917541504,
      altitudeAccuracy: 10,
      heading: -1,
      latitude: 0,
      longitude: 0,
      speed: -1,
    },
    timestamp: 1632112627679.3599,
  });
  const [loading, setLoading] = useState(true);

  Location.installWebGeolocationPolyfill();

  async function addReport() {
    navigator.geolocation.getCurrentPosition(setPosition);
    const id = uuid.v4();
    const dic = {
      id: id,
      location: "DEER SIGHTING",
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      created_at: new Date(),
    };

    await firestore.collection("deersighting").doc(id).set(dic);
    const report = [...reports];
    report.push(dic);
    setReports(report);
  }

  useEffect(() => {
    const run = async () => {
      await navigator.geolocation.getCurrentPosition(setPosition);
      const arr = [];

      const querySnapshot = await firestore.collection("deersighting").get(); //make this work and not delete values in database
      querySnapshot.forEach(async (doc) => {
        if (new Date() - doc.data().created_at > 300000) {
          doc.ref.delete();
        } else {
          arr.push(doc.data());
        }
      });

      setReports(arr);
      setLoading(false);
    }

    if (loading) {run();}
  }, [loading, reports]);

  return (
    <View style={styles.container}>
        <View style={{paddingTop: 25}}><Image source={require('../assets/images/Top.png')} style={{width: win.width, height: win.width * (119 / 1242)}} /></View>

        <MapView
          style={styles.map}
          region={{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 2,
            longitudeDelta: 2
          }} >
            {
              reports.map((report) => <MapView.Marker
                key={ report.id }
                coordinate={{ latitude: report.latitude, longitude: report.longitude }}
                title="DEER SIGHTING"
                description={ "Created at " + (report.created_at.getHours() % 12 ? report.created_at.getHours() % 12 : 0) + ": " + report.created_at.getMinutes() }
              >
              </MapView.Marker>)
            }
        </MapView>

        <TouchableOpacity onPress={() => {addReport()}} style={{marginTop: 20, backgroundColor: colors.yellow, padding: 20, width: win.width * 0.9, borderRadius: 10}}><Text style={{color: colors.brown, fontFamily: "ns-regular", fontSize: 14, textAlign: "center"}}>REPORT DEER CROSSING AT YOUR LOCATION</Text></TouchableOpacity>
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
