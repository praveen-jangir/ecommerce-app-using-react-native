import React, { Component } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,ScrollView,FlatList, TouchableOpacity
} from "react-native";
import {
  Container,
  Header,
  Content,
  Left,
  Right,
  Body,
  Icon,
  ListItem,
  Thumbnail,
  Input,
  Footer,
} from 'native-base';

import firebase from '../pages/firebase.js';
const db = firebase.firestore();
function Item({ item,navigation}) {
  return (
    <View style={{width:"100%"}}>
      <TouchableOpacity onPress={() => navigation.navigate("Insert",{Catid:item.catId})}>         
              <Text style={{marginBottom: 15,textAlign: "center",fontSize:18,shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 20
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,backgroundColor:"#ebebeb80",padding:5,width:300,borderRadius:10,paddingTop:20,paddingBottom:20
     }}>{item.title}</Text>
      </TouchableOpacity>
    </View>

    );
  }

const videos=[];
class App extends Component {
  constructor({route,navigation}){
    console.disableYellowBox = true;
   super();
    this.state = {
      navigation:navigation,
      modalVisible: false,
      
    };
    db.collection('cat')
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(documentSnapshot => {
                  videos.push(documentSnapshot.data());
                  console.log(videos);
                });
                });

  }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  CatidData = (visible,catId) => {
    this.setState({ modalVisible: visible });
    this.state.navigation.navigate("Insert",{Catid:catId});
  }
  render() {
    const { modalVisible } = this.state;
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.modalView}>
          <View style={{flexDirection:"row",}}>
          <Text style={{fontSize:19}}>
          Select Product Category
          </Text>
          <TouchableHighlight
          style={{backgroundColor:"white"}}
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}
              >
          <Icon style={{color:"black",marginLeft:40,fontSize:36,marginTop:-3}} name="ios-close"/>
          </TouchableHighlight>
          </View>
          <ScrollView>
            <View style={styles.modalViewx}>
            <FlatList
          style={{flex:1}}
          data={videos}
          renderItem={({ item }) => (
          <View style={{width:"100%"}}>
          <TouchableOpacity onPress={() => {
                  this.CatidData(!modalVisible,item.catId);
                }}>         
          <Text style={{marginBottom: 15,textAlign: "center",fontSize:18,shadowColor: "#000",
            shadowOffset: {
              width: 2,
              height: 20
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,backgroundColor:"#ebebeb80",padding:5,width:300,borderRadius:10,paddingTop:20,paddingBottom:20
             }}>{item.title}</Text>
          </TouchableOpacity>
        
    </View>
   )}
   numColumns={1}
          keyExtractor={item => item.catId}
        />
              
      </View>
       </ScrollView>     
          </View>
        </Modal>
   <View style={{flexDirection:"row"}}>
        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text style={styles.textStyle}><Text style={{fontWeight:"bold"}}>+</Text> Add Product</Text>
        </TouchableHighlight>
        <View style={{height:10,padding:12}}
        ></View>
        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {this.state.navigation.navigate("VProduct",{Pid:1234})}}
        >
          <Text style={styles.textStyle}><Text style={{fontSize:16}}> Products</Text></Text>
        </TouchableHighlight>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
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
  modalViewx: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    width:300,
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
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default App;