import React, {Component} from 'react';
import { ImageBackground,TouchableOpacity,StyleSheet, Text, View, SafeAreaView, Image, ScrollView,  FlatList,
  ActivityIndicator, } from "react-native";
  import {
  Header,Item,Icon,
} from 'native-base';
import { Camera } from 'expo-camera';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import styled from 'styled-components/native';
import Poster from './poster.js';
import firebase from './firebase.js';
import DatePicker from 'react-native-datepicker';
import { TextInput } from 'react-native-paper';
import 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
const dbh = firebase.firestore();
export default class Edit extends Component<props> {
    constructor({ route, navigation }){
     super();
      this.state = {
        hasPermission: null,
    cameraType: Camera.Constants.Type.back,
          userName:'its_praveen_jd',
          Imagex:'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
          DOB:"17-10-2000",
          Name:"Praveen Kumar Jangir",
          Mobile:"9649215382",
          Instagram:"its_jd_jr",
          Bio:"hello i am a enginer so tell me about your self",
          navigation:navigation,
      }
      const user = firebase.auth().currentUser;
          if (user) {
         const data = dbh.collection("user").where('uid', '==',user.uid).get().then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
              this.setState({Imagex:documentSnapshot.data().Avatar})
              this.setState({userName:documentSnapshot.data().username})
              this.setState({Name:documentSnapshot.data().name})
              this.setState({Bio:documentSnapshot.data().bio})
              this.setState({DOB:documentSnapshot.data().dob})
              this.setState({Instagram:documentSnapshot.data().Instagram})
                            });
         });
       }
    }
      async componentDidMount() {
    this.getPermissionAsync()
  }
  getPermissionAsync = async () => {
    // Camera roll Permission 
    if (Platform.OS === 'android') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
    // Camera Permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA,Permissions.AUDIO_RECORDING
);
    this.setState({ hasPermission: status === 'granted' });
  }

  handleCameraType=()=>{
    const { cameraType } = this.state

    this.setState({cameraType:
      cameraType === Camera.Constants.Type.back
      ? Camera.Constants.Type.front
      : Camera.Constants.Type.back
    })
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,allowsEditing: true,
      aspect: [1,1],
      quality: 1,
    });
    if (!result.cancelled) {
       this.setState({Imagex:result.uri})
      }
  }
Account = async () => {
   this.state.navigation.navigate("Account");
   this.state.navigation.goBack();
   this.state.navigation.navigate("Account");
  }
render(){
    
  const Upload = async() =>{
        const {Instagram,Name,Bio,DOB,Imagex,userName,navigation}=this.state;
  const user = firebase.auth().currentUser;
  async function datax(){
        firebase
        .storage()
        .ref("avatar/"+user.uid+".png")
        .getDownloadURL()
        .then((snapshot) => {
  const db = firebase.firestore();
  const subscriber = db
      .collection('user')
      .where('uid','==',user.uid)
      .get()
      .then(querySnapshot => {
          db.collection("user").doc("XpFOZftaLYXN5SHCEcuX")
          .update({
          name:Name,
          Instagram: Instagram,
          Avatar: snapshot,
          username:userName,
          dob: DOB,
          bio: Bio,
      })
  .then(() => {
      navigation.navigate("Home");
      navigation.navigate("Home");
      navigation.navigate("Home");
      navigation.navigate("Account");
  })
    })
});
}
    const uri=this.state.Imagex;
    
    const response =await fetch(uri);
    const blob = await response.blob();
    var ref = await firebase.storage().ref().child("avatar/"+user.uid+".png");
    datax();
    return ref.put(blob);    
}
    return (
        <SafeAreaView style={styles.container}>
        <Header style={{backgroundColor:'#FFFFFF',marginTop:35}} searchBar rounded>
          <Item>
          <TouchableOpacity onPress={()=>this.Account()}>
            <Icon name="close"/>
            </TouchableOpacity>
            <Text style={{fontSize:18,fontWeight:"bold",marginLeft:10}}>Edit Profile</Text>
            <TouchableOpacity onPress={Upload}>
            <Icon style={{color:"#5BA8EB",marginLeft:160}} name="send"/>
            </TouchableOpacity>
          </Item>
        </Header>
            <ScrollView>
                <View style={{ alignSelf: "center" }}>
                <TouchableOpacity onPress={()=>this.pickImage()}>
                    <View style={styles.profileImage}>
                        <Image source={{uri:this.state.Imagex}} style={styles.image}></Image>
                    </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={()=>this.pickImage()}>
                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 20,color:"#5BA8EA",marginTop:10 }]}>Change Profile Photo</Text>
                </View>
                </TouchableOpacity>
                <View style={{marginTop:10}}>
                <TextInput
                style={{marginTop:15,backgroundColor:"white"}}
      label="Name"
      value={this.state.Name}
      onChangeText={Name => this.setState({Name})}
    />
              <TextInput
                style={{marginTop:15,backgroundColor:"white"}}
      label="Username"
      value={this.state.userName}
      onChangeText={userName => this.setState({userName})}
    />
              <TextInput
                style={{marginTop:15,backgroundColor:"white"}}
      label="Instagram Username"
      value={this.state.Instagram}
      onChangeText={Instagram => this.setState({Instagram})}
    />
                  <TextInput
                style={{marginTop:15,backgroundColor:"white"}}
      label="Mobile No."
      value={this.state.Mobile}
      onChangeText={Mobile => this.setState({Mobile})}
    />

              <TextInput
                style={{marginTop:15,backgroundColor:"white"}}
      label="Bio"
      value={this.state.Bio}
      onChangeText={Bio => this.setState({Bio})}
    />
    <DatePicker
          style={{width:"99%",marginTop:20}}
          date={this.state.DOB} //initial date from state
          mode="date" //The enum of date, datetime and time
          label="DOB"
          placeholder="Date of Birth"
          format="DD-MM-YYYY"
          minDate="01-01-1900"
          maxDate="01-01-2035"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={(DOB) => {this.setState({DOB: date})}}
        />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
    }
}

const Separator = styled.View`
    width: 1px;
    height: 13px;
    background-color: #d8d8d8;
    opacity: 0.6;
`
const Button = styled.View`
    width: 130px;
    height: 36px;
    justify-content: center;
    align-items: center;
    margin-left:100px;
    margin-top:12px
`
const Menu = styled.View`
    margin-top:-38px;
    margin-left:150px;
    align-items: center;
`
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:0,
        backgroundColor: "#FFF"
    },
    text: {
        color: "#52575D"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined,
        borderRadius:80
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 80,
        overflow: "hidden"
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        top:100,
        left: 40,
        width: 35,
        height: 35,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 0
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 12
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 343,
        height: 650,
        borderRadius: 12,
        overflow: "hidden",
        marginTop:10,
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },

    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    },
    gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  sectionHeader: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    alignItems: 'center',
    backgroundColor: '#636e72',
    color: 'white',
    padding: 10,
  },
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 30,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width:'100%',
  },
});