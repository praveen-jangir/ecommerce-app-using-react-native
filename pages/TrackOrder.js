import React from 'react';
import MapView,{Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions,Image,TouchableOpacity,Linking } from 'react-native';
import order from '../assets/mapx.png';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions'
import firebase from './firebase.js';
const db = firebase.firestore();
export default class App extends React.Component {
  constructor({route,navigation}) {
    console.disableYellowBox = true;
    const {Customar}=route.params;
    const user = firebase.auth().currentUser;
super();

this.state = {
  Customar:'rTZzkaJVS1doj4DUK8In',
  location:null,
  uid:user.uid,
  markers: [
  {
    title: 'hello',
    coordinates: {
      latitude: 28.055915799999998,
      longitude: 75.1095379
    },  
  }],
  longitude:null,
  latitude:null,
  mapRegion: null,
      hasLocationPermissions: false,
      locationResult: null,
}
}
onPress = () => {
   Linking.openURL(`tel:9649215382`)
  };
 componentDidMount() {
   this._getLocationAsync();
  }

  _getLocationAsync = async () => {

   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
     });
   } else {
     this.setState({ hasLocationPermissions: true });
   }

   let location = await Location.getCurrentPositionAsync({
   });
   this.setState({ locationResult: JSON.stringify(location) });
   // Center the map on the location we just fetched.
    this.setState({
      latitude: location.coords.latitude, longitude: location.coords.longitude,
      location: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
  db.collection('user')
  .doc(this.state.Customar)
  .update({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude
  })
  .then(dex=>{
    db.collection('user')
    .where('uid','==',this.state.uid)                 
                 .onSnapshot(documentSnapshot => {
                  this.setState(prevState => ({
                      markers: prevState.markers.map(
                      obj => ({ coordinates: {latitude: documentSnapshot.data().latitude, longitude: documentSnapshot.data().longitude} }))
                  }));
                });
                 this._getLocationAsync();
  })

  }
  render() {
    return (
      <View style={styles.container}>
        <MapView 
        showsIndoorLevelPicker={true}
        showsIndoors={true}
      showsBuildings={true}
      mapType={"hybrid"}
      showsUserLocation={true}
      showsUserLocation={true}
      followUserLocation={true}
      zoomEnabled={true}
      initialRegion={{
      latitude: 28.055915799999998,
      longitude: 75.1585369,
      latitudeDelta: 0.0900,
      longitudeDelta: 0.0421,
       }}
        style={styles.mapStyle}
         >
{this.state.markers.map(marker => (
    <MapView.Marker 
      coordinate={marker.coordinates}
      title={marker.title}
      image={order}
      style={{padding:10}}
    />
  ))}
         </MapView>
         <View style={{width:"100%",height:300}}>
         <Image style={{width:100,height:100,marginTop:10,borderRadius:100,marginLeft:10}} source={require('../assets/avatar.png')} />
         <Text style={{marginTop:5,marginLeft:12}}>Praveen Kumar</Text>
         <Text style={{marginTop:5,marginLeft:28}}>Order Boy</Text>
         <Image style={{width:30,height:30,marginTop:-150,borderRadius:10,marginLeft:120}} source={require('../assets/bike.png')} />
         <Text style={{marginTop:-30,marginLeft:160,fontSize:20}}>| RJ18SV0568</Text>
         <Image style={{width:25,height:23,marginTop:10,borderRadius:1,marginLeft:120}} source={require('../assets/rupay.png')} />
         <Text style={{marginTop:-27,marginLeft:160,fontSize:20}}>| 390 /-</Text>
          <TouchableOpacity
          style={styles.button}
          onPress={this.onPress}
        >
         <Image style={{width:70,height:70,marginTop:10,borderRadius:10,marginLeft:270}} source={require('../assets/call.png')} />
         </TouchableOpacity>
         </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});