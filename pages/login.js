import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,TouchableOpacity,TextInput,Button,Keyboard
} from 'react-native';
import firebase from './firebase.js'
import publicIP from 'react-native-public-ip';
const dbh = firebase.firestore();
export default class Login extends Component<props> {
	constructor({ route, navigation }){
		        const user = firebase.auth().currentUser;
		super()
		this.state={
			userEmail:'',
			userPassword:'',
			ipAddress:'',
			state:'',
			city:'',
			lang:'',
			navigation:navigation,
	     
		}
		if (user) {
		        	this.state.navigation.navigate("FirstPage");
		        }
		publicIP()
				  .then(ip => {
							    var url = 'http://api.ipstack.com/'+ip+'?access_key=7d2446dd2b89b6bbbe347e21777e6cb5';
			    fetch(url)
			      .then((response) => response.json())
			      .then((responseJson) => {
			        this.setState({
			        	state:responseJson.region_code,
			        	ipAddress:responseJson.ip,
			        	city:responseJson.city,
			        	lang:responseJson.location.languages[0].code,
			        })

			      })
			      .catch((error) => {
			       //console.error(error);
			      });
				  })
				  .catch(error => {
				    console.log(error);
				    // 'Unable to get IP address.'
				  });	
		
		}
	login = () =>{
		const {userEmail,userPassword} = this.state;
		firebase.auth().signInWithEmailAndPassword(userEmail,userPassword)
		.then(()=> {
					/*const subscriber = dbh.collection("user").add({
			          uid:firebase.auth().currentUser.uid,
			          ipAddress:this.state.ipAddress,
			          location:"",
			          name: "",
			          aid: '',
			          mobile:9649215382,
			      })*/
			this.state.navigation.navigate("FirstPage");
		})
	}

  render() {
    return (
	<View style={styles.container}>    
	<Text style={{padding:10,margin:10,color:'red'}}>{this.state.email}</Text>
	
	<TextInput
	placeholder="Enter Email"
	style={{width:200, margin:10}}
	onChangeText={userEmail => this.setState({userEmail})}
	/>
	
	<TextInput
	placeholder="Enter Password"
	style={{width:200, margin:10}}
	onChangeText={userPassword => this.setState({userPassword})}
	
	/>
	
	
	<TouchableOpacity
	onPress={this.login}
	style={{width:200,padding:10,backgroundColor:'magenta',alignItems:'center'}}>
	<Text style={{color:'white'}}>Login</Text>
	</TouchableOpacity>
	
	
     </View>
  
   );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

});

AppRegistry.registerComponent('login', () => login);
