
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,TouchableOpacity,Button,Keyboard, SafeAreaView, ScrollView,
} from 'react-native';
import {  MapView } from 'expo';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions'
import { TextInput } from 'react-native-paper';
import firebase from '../pages/firebase.js';
const db = firebase.firestore();
export default class Login extends Component<props> {
  constructor({ route, navigation }){
    const {Aid} =route.params;
    super()
    this.state={
      City:'',
      Colony:'',
      ipAddress:'',
      state:'',
      city:'',
      location:null,
      pincode:'',
      home:'',
      Landmark:'',
      name:'',
      mobile:'',
      smobile:'',
      navigation:navigation,
      mapRegion: null,
      hasLocationPermissions: false,
      locationResult: null,
      Aid:Aid,
    }
    if (Aid==1234) {
    }
    else{
                db.collection('address')
                .where('aid','==',Aid)
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(documentSnapshot => {
                        this.setState({
                          City:documentSnapshot.data().city,
                          Colony:documentSnapshot.data().Colony,
                          state:documentSnapshot.data().state,
                          mobile:documentSnapshot.data().mobile,
                          pincode:documentSnapshot.data().pincode,
                          smobile:documentSnapshot.data().smobile,
                          home:documentSnapshot.data().home,
                          name:documentSnapshot.data().name,
                          Landmark:documentSnapshot.data().Landmark,
                        })
                            });                       
                })

          }
}
    componentDidMount() {
    this._getLocationAsync();
  }

  _handleMapRegionChange = mapRegion => {
    console.log(mapRegion);
    this.setState({ mapRegion });
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

   let location = await Location.getCurrentPositionAsync({});
   this.setState({ locationResult: JSON.stringify(location) });
   
   // Center the map on the location we just fetched.
    this.setState({location: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
  };

  render() {
    const Upload = async() =>{
      if (this.state.Aid==1234) {
  db
  .collection('address')
  .add({
    name:this.state.name,
    city:this.state.City,
    state:this.state.state,
    location:this.state.location,
    mobile:this.state.mobile,
    smobile:this.state.smobile,
    Landmark:this.state.Landmark,
    pincode:this.state.pincode,
    home:this.state.home,
    ipAddress:this.state.ipAddress,
    aid:'',
    uid:'',
    Colony:this.state.Colony,

  })
 .then(docRef => {
  db
  .collection('address')
  .doc(docRef.id)
  .update({
    aid:docRef.id,
  })
    .then(dex=>{
    this.state.navigation.navigate("FirstPage");  
    this.state.navigation.navigate("Saddress");
  })

    
})
}
else{
  db
  .collection('address')
  .doc(this.state.Aid)
  .update({
    name:this.state.name,
    city:this.state.City,
    state:this.state.state,
    location:this.state.location,
    mobile:this.state.mobile,
    smobile:this.state.smobile,
    Landmark:this.state.Landmark,
    pincode:this.state.pincode,
    home:this.state.home,
    ipAddress:this.state.ipAddress,
    Colony:this.state.Colony,
  })
  .then(dex=>{
    this.state.navigation.navigate("Saddress");
  })
}
} 
    return (
  <SafeAreaView>
  <ScrollView style={{backgroundColor:"#f6f6f6e8"}}>
  <View style={styles.container}>    
  <TextInput
  placeholder="Pincode *"
  label={"Pincode *"}
  value={this.state.pincode}
  theme={{ colors: { primary: 'gray',underlineColor:'transparent',}}}
  style={{width:"100%",marginTop:20,backgroundColor:"white",borderColor:"red",color:"red"}}
  onChangeText={pincode => this.setState({pincode})}
  />
  
  <TextInput
  placeholder="House No.,Building name *"
  label={"House No.,Building name *"}
  value={this.state.home}
  theme={{ colors: { primary: 'gray',underlineColor:'transparent',}}}
  style={{width:"100%",marginTop:20,backgroundColor:"white",borderColor:"red"}}
  onChangeText={home => this.setState({home})}
  />
  
  <TextInput
  placeholder="Road Name, Area Colony *"
  label={"Road Name, Area Colony *"}
  value={this.state.Colony}
  theme={{ colors: { primary: 'gray',underlineColor:'transparent',}}}
  style={{width:"100%",marginTop:20,backgroundColor:"white"}}
  onChangeText={Colony => this.setState({Colony})}
  />
  <View style={{flexDirection:"row"}}>
  <TextInput
  placeholder="City/Village *"
  label={"City/Village *"}
  value={this.state.City}
  theme={{ colors: { primary: 'gray',underlineColor:'transparent',}}}
  style={{width:"45%",backgroundColor:"white",marginTop:20}}
  onChangeText={City => this.setState({City})}
  />
  <TextInput
  placeholder="State *"
  label={"State *"}
  value={this.state.state}
  theme={{ colors: { primary: 'gray',underlineColor:'transparent',}}}
  style={{width:"45%",backgroundColor:"white",marginTop:20,marginLeft:30}}
  onChangeText={state => this.setState({state})}
  />
  </View>

  <TextInput
  placeholder="Landmark (Optional)"
  label={"Landmark (Optional)"}
  value={this.state.Landmark}
  theme={{ colors: { primary: 'gray',underlineColor:'transparent'}}}
  style={{width:"100%",marginTop:20,backgroundColor:"white"}}
  onChangeText={Landmark => this.setState({Landmark})}
  />
  </View>
<View style={{flex: 1,
    backgroundColor: 'white',
    padding:17,marginTop:3}}>
  <TextInput
  placeholder="Name *"
  label={"Name *"}
  value={this.state.name}
  theme={{ colors: { primary: 'gray',underlineColor:'transparent',}}}
  style={{width:"100%",marginTop:0,backgroundColor:"white"}}
  onChangeText={name => this.setState({name})}
  />
  <TextInput
  placeholder="10-digit mobile number *"
  label={"10-digit mobile number *"}
  value={this.state.mobile}
  theme={{ colors: { primary: 'gray',underlineColor:'transparent',}}}
  style={{width:"100%",marginTop:20,backgroundColor:"white"}}
  onChangeText={mobile => this.setState({mobile})}
  />
  <TextInput
  placeholder="Second Phone Number (Optional)"
  label={"Second Phone Number (Optional)"}
  value={this.state.smobile}
  theme={{ colors: { primary: 'gray',underlineColor:'transparent',}}}
  style={{width:"100%",marginTop:20,backgroundColor:"white",marginBottom:15}}
  onChangeText={smobile => this.setState({smobile})}
  />
  <TouchableOpacity
  onPress={Upload}
  style={{width:"100%",padding:17,backgroundColor:'blue',alignItems:'center',justifyContent:"center",marginTop:15}}>
  <Text style={{color:'white',fontSize:18}}>SAVE</Text>
  </TouchableOpacity>
     </View>
  </ScrollView>
  </SafeAreaView>
   )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding:17,
  },

})
