import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { Component, useState } from 'react';
import { Image, View, Dimensions, StyleSheet, TouchableOpacity,Modal,Alert,Platform,Linking,StatusBar } from 'react-native';
import { Container, Content, Item, Input, Text, Button} from 'native-base';
import firebase from './firebase';
import publicIP from 'react-native-public-ip';

import AsyncStorage from '@react-native-community/async-storage';
const db=firebase.firestore();
const {width, height} = Dimensions.get("window");
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
StatusBar.setBackgroundColor('#f66262',true);
export default class Login extends Component {
    constructor({route,navigation}) {  
        super();  
        this.state = {text: '',pass: 'dsf',emailWarn:'',passWarn:'',modalVisible: false,OTP:null,token:"",UidError:"no"
        ,uid:"",navigation:navigation,notification:"",otpd1:"",
        otpd2:"",otpd3:"",otpd4:"",ipAddress:"",latitude:0,longitude:0,lode:0,url:""
      };
      publicIP()
          .then(ip => {
                  var url = 'http://api.ipstack.com/'+ip+'?access_key=7d2446dd2b89b6bbbe347e21777e6cb5';
          fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({
                ipAddress:responseJson.ip,
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
     setModalVisible = (visible) => {
    if (this.state.emailWarn!="yes") {
      if (this.state.text.length==10) {
        var otp=this.getRndInteger(1111,9999);
        this.setState({OTP:otp});
        schedulePushNotification(otp);
      this.setState({ modalVisible: visible });
   
    }else{
      alert("Invalid Mobile Number");
    }
    }
    else{
      this.setState({ lode:1 });
     var InsertAPI =this.state.url+'user.php?user='+this.state.text;
        var headers={
        'Accept':'application/json',
        'Content-Type':'application.json'
        }
        fetch(InsertAPI,{
            method:'POST',
            headers:headers,
        }).then((response)=>response.json()).then((response)=>{
          if(response===null){
            this.setState({})
          }
          else{
            
            this.sendPushNotification("ExponentPushToken[LEU_lkOGxSzrT2Nrd2502D]");
            this.storeData(response[0].uid,response[0].uid);
            this.setState({ lode:0 });
                  this.state.navigation.replace("FirstPage");
                      }
        })
        .catch(err=>{
            alert('Something went wrong3');
        })
    }
  }
 getRndInteger=(min, max)=> {
  return Math.floor(Math.random() * (max - min)) + min;
}

storeData = async (value,x) => {
  if (value) {
      AsyncStorage.setItem('@uid', value.toString());
      AsyncStorage.setItem('@Amobile',this.state.text);
      AsyncStorage.setItem('@userId', x);
    }
}

    fireData=(xx)=>{
      this.getData();
     this.setState({ lode:1 });
    if (this.state.OTP==this.state.OTP) {      
    if (this.state.emailWarn!="yes") {
      var Data={mobile:this.state.text,
       latitude:this.state.latitude,
       longitude:this.state.longitude,
       aid:"",
       Password:"1234",
       uid:xx.toString(),
       ip:this.state.ipAddress,};
            var headers={
            'Accept':'application/json',
            'Content-Type':'application.json'
            }
            fetch("https://www.mandawamart.com/MMart/userIn.php",{
                method:'POST',
                headers:headers,
                body:JSON.stringify(Data),
            }).then((response)=>response.json()).then((response)=>{
                if(response){
                    //console.log(response[0]);
                    this.storeData(xx,xx.toString());
                    this.sendPushNotification("ExponentPushToken[LEU_lkOGxSzrT2Nrd2502D]");
                    this.setState({ modalVisible: false,lode:0 });
                    this.state.navigation.replace("FirstPage");
                   
                }
                else{
                    
                }
            })
            .catch(err=>{
                console.log(err);
                this.setState({btnsnipper:0});
            })
    }
    else{
      var InsertAPI =this.state.url+'user.php?user='+this.state.text;
        var headers={
        'Accept':'application/json',
        'Content-Type':'application.json'
        }
        fetch(InsertAPI,{
            method:'POST',
            headers:headers,
        }).then((response)=>response.json()).then((response)=>{
          if(response===null){
            this.setState({})
          }
          else{
            
            console.log(response[0].uid)
            this.sendPushNotification("ExponentPushToken[LEU_lkOGxSzrT2Nrd2502D]");
            this.storeData(response[0].uid,response[0].uid);
                  this.state.navigation.replace("FirstPage");
                      }
        })
        .catch(err=>{
            alert('Something went wrong3');
        })

    }
    }
  }
    componentDidMount() {
      this.getData();
       registerForPushNotificationsAsync().then(token => this.setState({token}));
      Notifications.addNotificationReceivedListener(notification => { this.setState({notification})
    });
    }
    find=(text)=>{
      if (text) {
       var InsertAPI =this.state.url+'user.php?user='+text.text;
        var headers={
        'Accept':'application/json',
        'Content-Type':'application.json'
        }
        this.setState({text:text.text,emailWarn:"no"})
        fetch(InsertAPI,{
            method:'POST',
            headers:headers,
        }).then((response)=>response.json()).then((response)=>{
          if(response===null){
            this.setState({})
          }
          else{
            
            this.setState({emailWarn:"yes"})
                      }
        })
        .catch(err=>{
            alert('Something went wrong3');
        })
      }
    }
    sendPushNotification=async(expoPushToken)=> {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Corogulation   m   Mart get new user',
    body: 'm   Mart get new user',
    data: { data: 'User' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}
getData=()=>{
    db.collection('update')
               .where('admin', '==','yes')
               .get()
               .then(querySnapshot => {
                  querySnapshot.forEach(documentSnapshot => {
                    this.setState({url:documentSnapshot.data().url});
                  })})
}
  render() {
    const { modalVisible } = this.state;
    return (
    <Container>   
            <Content>
            <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Enter OTP First");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Verify the Authorization Code</Text>
              <Text style={{fontSize:18,margin:20}}>Enter OTP</Text>
               <View style={{flexDirection:"row",marginBottom:20}}>
               <Input onChangeText={(otpd1) => this.setState({otpd1})} maxLength={1} keyboardType='number-pad' style={{borderWidth:1,height:50,width:50,textAlign:"center",marginRight:10,borderRadius:6}} value={this.state.notification && JSON.stringify(this.state.notification.request.content.data.OTPd1)}/>
               <Input onChangeText={(otpd2) => this.setState({otpd2})} maxLength={1} keyboardType='number-pad' style={{borderWidth:1,height:50,width:50,textAlign:"center",marginRight:10,borderRadius:6}} value={this.state.notification && JSON.stringify(this.state.notification.request.content.data.OTPd2)}/>
               <Input onChangeText={(otpd3) => this.setState({otpd3})} maxLength={1} keyboardType='number-pad' style={{borderWidth:1,height:50,width:50,textAlign:"center",marginRight:10,borderRadius:6}} value={this.state.notification && JSON.stringify(this.state.notification.request.content.data.OTPd3)}/>
               <Input onChangeText={(otpd4) => this.setState({otpd4})} maxLength={1} keyboardType='number-pad' style={{borderWidth:1,height:50,width:50,textAlign:"center"}} value={this.state.notification && JSON.stringify(this.state.notification.request.content.data.OTPd4)}/>
               </View>
              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: "#f66262" }}
                onPress={() => {
                  this.fireData(this.getRndInteger(1111,9999));
                }}
              >
                <Text style={styles.textStyle}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
                <View>
                    <View style={{flexDirection:'row',backgroundColor:"#f66262",marginTop:-23}}>
                        <View style={{height:(height/3)+30,justifyContent:'center'}}>
                        <Text style={styles.title}>
                          M-Mart
                        </Text>
                        </View>
                    </View>
                    <Image source={require('../assets/wave.png')} style={{width:width,height:(height/9)+5.9, resizeMode:'stretch', marginTop:0}}/>
                    <View style={{alignItems:'center',height:300}}>
                        <View style={styles.LoginBox}>
                            <Item style={{marginTop:-18}}>
                                <Image style={{width:25,height:25}} source={require('../assets/emailicon.png')}/>
                                <Input floatingLabel last placeholderTextColor="#fff" keyboardType='number-pad' placeholder='Mobile No' style={{color:"white"}}
                                placeholderStyle={{ fontFamily: "AnotherFont", borderColor: 'red',color:"white"}}
                                onChangeText={(text) => {this.find({text})}}/>
                            </Item>
                            <Text style={{color:'red'}}>{this.state.passWarn}</Text>

                            
                        </View>
                <Button block info  style={{marginTop:45,backgroundColor:'#f66262',width:width-100,borderRadius:15,justifyContent:'center',alignItems: 'center',alignSelf:'center'}} onPress={() => {
                  this.setModalVisible(true);
                }}>
                                <Text>LOGIN</Text>
                            </Button>
                    </View>
                    <View style={{padding:4,marginTop:10}}><Text>Please review & accept our <Text style={{color:"green"}} onPress={() => Linking.openURL('http://www.mandawamart.com/MMart/policy.php')}>Privacy Policy</Text> & <Text style={{color:"green"}} onPress={() => Linking.openURL('http://www.mandawamart.com/MMart/Terms.php')}>Terms & Conditions </Text> to continue</Text></View>

                </View>
                {this.state.lode==1?
       <View style={{backgroundColor: 'rgba(255, 255, 255, 0.8)',justifyContent:"center",position:"absolute",alignItems:"center",textAlign:"center",alignSelf:"center",height:"100%",width:"100%",flex:0}}>
        <Image
          style={styles.stretch}
          source={{uri:'https://i.stack.imgur.com/kOnzy.gif'}}
        />
      </View>:null}
            </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    title:{
      fontSize:52,
      padding:15,
      color:'white',
    },
    LoginBox:{
      height:50,
      width: width-40,
      backgroundColor: '#f66262',
      borderRadius:15,
      marginTop:0,
      shadowRadius:0.5,
      shadowColor:'#000',
      shadowOffset:{width:0.5,height:0.5},
      shadowOpacity:0.5,
      elevation:5,
      padding:15,
    },
    centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    width:"100%"
  },
  modalView: {
    margin: 20,
    width:"100%",
    height:500,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#f66262",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width:200
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    fontSize:22,
  }
  })
  async function schedulePushNotification(xx) {
    var x=xx.toString();
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "M-Mart Login",
      body: 'Your OTP Code is - '+ x ,
      data: { OTPd1: parseInt(x[0]),OTPd2: parseInt(x[1]),OTPd3:parseInt(x[2]),OTPd4: parseInt(x[3]) },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      this.registerForPushNotificationsAsync();
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      this.registerForPushNotificationsAsync();
      alert('Failed to get push token for push notification!');
      return;
    }
     token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    this.registerForPushNotificationsAsync();
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
