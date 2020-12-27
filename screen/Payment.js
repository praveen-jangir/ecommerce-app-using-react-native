import React from 'react';
import MapView,{Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions,Image,TouchableOpacity,Linking,ImageBackground } from 'react-native';
import { WebView } from 'react-native-webview';
import order from '../assets/map.png';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions'
import firebase from '../pages/firebase.js';
import {getDistance} from 'geolib';
import bg from "../assets/xx.png";
import load from "../assets/xxx.gif";
const windowWidth = Dimensions.get('window').width;
const db = firebase.firestore();
function Data() {
  return(
<View>
      <Image style={styles.text} source={load}/>
      <Text style={{color:"red",textAlign:"center",fontSize:26,backgroundColor:"#fff"}}>Your Order is Preparing...</Text>
      <View style={{flex: 1,height:240,width:windowWidth+270,}}>
    <WebView
        style={ {  marginTop: (Platform.OS == 'ios') ? 20 : 0,marginLeft:270} }
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{uri: 'https://www.youtube.com/watch?v=Hw3NH_-_ja8'}}
    />
</View>

  </View>
  );
  
}
export default class App extends React.Component {
  constructor({route,navigation}) {
    const user = firebase.auth().currentUser;
super();
this.state = {
  sec:0,
  min:0,
  distance:null,
  bick:'',
  name:'',
  mobile:0,
  price:0,
  location:null,
  uid:user.uid,
  Uid:'',
  markers: [
  {
    title: 'hello',
    coordinates: {
      latitude: 0.055915799999998,
      longitude: 75.1095379
    },  
  }],
  trackId:'',
  longitude:null,
  latitude:null,
  mapRegion: null,
      hasLocationPermissions: false,
      locationResult: null,
}
}
onPress = () => {
  };
 componentDidMount() {
    this.track();
    this._getLocationAsync();
/*this.trackIdx();*/
if (this.state.trackId=="") {
  this.setState({
    bick:"Searching... Boy",
    name:"Searching... Boy",
  });
}
}
track=()=>{
        db.collection('track')
        .where('Uid', '==', this.state.uid)
        .where('Status', '==',0)
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(documentSnapshot => {
                        this.setState({trackId:documentSnapshot.data().TrackId,price:documentSnapshot.data().TotalP,mobile:documentSnapshot.data().UserMobile})
                        })
                            });
}
test=()=>{
  if (this.state.trackId=='') {
    this.track();
  }
    else
    {
           db.collection('user')
                 .where('uid', '==', this.state.uid)
                 .get()
                 .onSnapshot(documentSnapshot => {
                  this.setState(prevState => ({
                      markers: prevState.markers.map(
                      obj => ({ coordinates: {latitude: documentSnapshot.data().latitude, longitude: documentSnapshot.data().longitude} }))
                  }));
                });
    }
}
time = () => {
var distancex=this.state.distance*1000;
var time = distancex/666;
var min=parseInt(time);
var minx=parseFloat(min+0.00);
var sec=(time-minx).toFixed(2);
if (min<1) {
this.setState({sec:sec.slice(2, 4),min:"01"})
}
else{
  if (min<10) {
  this.setState({sec:sec.slice(2, 4),min:"0"+min})
}
else{
  this.setState({sec:sec.slice(2, 4),min:"0"+min})
}
}
  };

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
                             var dis = getDistance(
                              {latitude: location.coords.latitude, longitude: location.coords.longitude},
                              {latitude: this.state.markers[0].coordinates.latitude, longitude: this.state.markers[0].coordinates.longitude},
                            );
db
  .collection('user')
  .where('uid', '==', this.state.uid)
  .update({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude
  })
  .then(dex=>{
    this.test();
    this._getLocationAsync();
     })
                            this.setState({
                              distance: dis/1000,
                            });

  };
  render() {
    return (
      <View style={styles.containerx}>
      {this.state.trackId == '' ? <Data/>:
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
         <View style={{width:"100%",height:300,marginBottom:1200}}>

         <Image style={{width:100,height:100,marginTop:10,borderRadius:100,marginLeft:10}} source={require('../assets/avatar.png')} />
         <Text style={{marginTop:5,marginLeft:12}}>{this.state.name}</Text>
         <Text style={{marginTop:5,marginLeft:28}}>Order Boy</Text>
         <Image style={{width:30,height:30,marginTop:-150,borderRadius:10,marginLeft:120}} source={require('../assets/bike.png')} />
         <Text style={{marginTop:-30,marginLeft:160,fontSize:20}}>| {this.state.bick}</Text>
         <Image style={{width:25,height:23,marginTop:10,borderRadius:1,marginLeft:120}} source={require('../assets/rupay.png')} />
         <Text style={{marginTop:-27,marginLeft:160,fontSize:20}}>| {this.state.price} /-</Text>
         <Image style={{width:25,height:23,marginTop:10,borderRadius:1,marginLeft:120}} source={{uri:"https://thumbs.gfycat.com/BadFluffyAustralianfurseal-small.gif"}} />
         <Text style={{marginTop:-27,marginLeft:160,fontSize:20}}>| {this.state.min}:{this.state.sec} Min</Text>
         <Image style={{width:25,height:23,marginTop:10,borderRadius:1,marginLeft:120}} source={{uri:"https://media3.giphy.com/media/Ky53q0LBHfMihPOGIp/source.gif"}} />
         <Text style={{marginTop:-27,marginLeft:160,fontSize:20}}>| {this.state.distance} Km</Text>
          <TouchableOpacity
          onPress={this.onPress}
        >
         <Image style={{width:70,height:70,marginTop:-55,borderRadius:10,marginLeft:270}} source={require('../assets/call.png')} />
         </TouchableOpacity>
         </View>
      </View>
    }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  image: {
    justifyContent:"center",
    textAlign:"center",
    backgroundColor:"#000",
    alignItems:"center"
  },
  text: {
    backgroundColor:"#fff",
    height:80,
    justifyContent:"center",
    alignItems:"center"
  },
  containerx:{
    alignItems: 'center',
    width:"100%"
  }
});