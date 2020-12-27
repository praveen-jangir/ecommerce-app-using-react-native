import React, {Component} from 'react';
import { ImageBackground,TouchableOpacity,StyleSheet, Text, View, SafeAreaView, Image, ScrollView,  FlatList,
  ActivityIndicator, } from "react-native";
  import {
  Header,Item,Icon,
} from 'native-base';
import { Camera } from 'expo-camera';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import styled from 'styled-components/native';
import firebase from './firebase.js';
import DatePicker from 'react-native-datepicker';
import { TextInput } from 'react-native-paper';
import 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
const dbh = firebase.firestore();
export default class Edit extends Component<props> {
    constructor({ route, navigation }){
      const {Catid} =route.params;
     super();
      this.state = {
        hasPermission: null,
        cameraType: Camera.Constants.Type.back,
          userName:'its_praveen_jd',
          Imagex:'https://cdn.dribbble.com/users/6295/screenshots/2344334/plaid_dribbble.png',
          DOB:"17-10-2000",
          Name:"Praveen Kumar Jangir",
          Mobile:"9649215382",
          Instagram:"its_jd_jr",
          Bio:"hello i am a enginer so tell me about your self",
          navigation:navigation,
          LocalImage:[],
          multipleUrl:[],
          Catid:Catid,
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
  pickImageM = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    base64: true,
    allowsEditing: true,
    aspect: [4, 3],
    });
          let imageUri = result ?   `data:image/jpg;base64,${result.base64}` : null
         imageUri && {uri: imageUri}
         this.state.multipleUrl.push(imageUri)
              this.setState({
          LocalImage: this.state.LocalImage.concat([result.uri]),
          })
              console.log(this.state.LocalImage);
  }
Account = async () => {
   this.state.navigation.navigate("Account");
   this.state.navigation.goBack();
   this.state.navigation.navigate("Account");
  }
datax=(name)=>{
  const {Instagram,Name,Bio,DOB,Imagex,userName,navigation,Catid}=this.state;
  firebase
        .storage()
        .ref("ProductImage/"+name)
        .getDownloadURL()
        .then((snapshot) => {
       dbh
      .collection('Product')
      .add({
              title: Name,
              catId: Catid,
              ipAddress:"",
              dis:Bio,
              newPrice:userName,
              oldPrice:Instagram,
              Fimage:snapshot,
              pId:"",
              shopName:"M-mart",
            })
 .then(docRef => {
   dbh
  .collection('Product')
  .doc(docRef.id)
  .update({
    pId:docRef.id,
  })
  .then(() => {
    this.state.navigation.goBack();
    this.state.navigation.navigate("Pinsert");
    console.log('User added!');
  });    
})
.catch(error => console.error("Error adding document: ", error))

}).catch((e)=>{
          this.datax(name);
        })
}
  Upload = async() =>{
    const {Instagram,Name,Bio,DOB,Imagex,userName,navigation,Catid}=this.state;
    const uri=this.state.Imagex;
    const res = uri.split("/");
    const sln = res.length;
    const name = res[sln-1];
    const response =await fetch(uri);
    const blob = await response.blob();
    var ref = await firebase.storage().ref().child("ProductImage/"+name);
    this.datax(name);
    return ref.put(blob);    
}
render(){
    return (
        <SafeAreaView style={styles.container}>
        <Header style={{backgroundColor:'#FFFFFF'}} searchBar rounded>
          <Item>
          <TouchableOpacity onPress={()=>this.state.navigation.goBack()}>
            <Icon name="close"/>
            </TouchableOpacity>
            <Text style={{fontSize:18,fontWeight:"bold",marginLeft:10,width:180}}>Upload New Product</Text>
            <TouchableOpacity onPress={this.Upload}>
            <Icon style={{color:"#5BA8EB",marginLeft:75}} name="send"/>
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
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 20,color:"#5BA8EA",marginTop:10 }]}>Upload Product Image</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.pickImageM()} style={{backgroundColor:"blue",width:150,padding:7,justifyContent:"center",alignItems:"center", alignSelf: "center",borderRadius:5}}>
                <Text style={{fontSize:18,color:"white"}}>
                Add More Image
                </Text>
                </TouchableOpacity>
                <View style={{marginTop:10}}>
                <TextInput
                style={{marginTop:15,backgroundColor:"white"}}
      label="Product Title"
      value={this.state.Name}
      onChangeText={Name => this.setState({Name})}
    />
    <View style={{flexDirection:"row",width:"100%"}}>
              <TextInput
                style={{marginTop:15,backgroundColor:"white",width:"40%"}}
      label="Your price"
      value={this.state.userName}
      onChangeText={userName => this.setState({userName})}
    />
              <TextInput
                style={{marginTop:15,backgroundColor:"white",width:"45%",marginLeft:25}}
      label="Market Price"
      value={this.state.Instagram}
      onChangeText={Instagram => this.setState({Instagram})}
    />
    </View>
                  <TextInput
                style={{marginTop:15,backgroundColor:"white"}}
      label="Product Short details"
      value={this.state.Mobile}
      onChangeText={Mobile => this.setState({Mobile})}
    />

              <TextInput
                style={{marginTop:15,backgroundColor:"white"}}
      label="Product description"
      value={this.state.Bio}
      onChangeText={Bio => this.setState({Bio})}
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
        width: 150,
        height: 150,
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