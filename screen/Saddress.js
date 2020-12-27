import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity,Picker, SafeAreaView, ScrollView, } from 'react-native';
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
import styles from "./styles"
import firebase from '../pages/firebase.js';
const db = firebase.firestore();
const address=[];
const cat="Man cloths with today offer";
export default class App extends React.Component {
 constructor({route,navigation}){
   super();
   const {from,Pid,Size}=route.params;
    this.state = {
    navigation:navigation,
    Value:"",
    data:[],
    datax:null,
    addressId:'',
    from:from,
    Size:Size,
    Pid:Pid,
  }
  while(address.length > 0) {
    address.pop();
}
      db.collection('address')
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(documentSnapshot => {
                        address.push(documentSnapshot.data());
                            });
                  var xx=address;
                       this.setState({data:xx});
                       var as=this.state.data;
                       this.setState({datax:as})                       
            })
}
  render(){
    const Upload =()=>{
      if (this.state.from==0) {
      this.state.navigation.navigate("FirstPage");
      this.state.navigation.navigate("Cart",{Cid:this.state.addressId});
    }
    else{
      this.state.navigation.navigate("FirstPage");
      this.state.navigation.navigate("Buy",{Cid:this.state.addressId,Pid:this.state.Pid,Size:this.state.Size});

    }
    }
    return (
      <SafeAreaView style={styles.container}>
      <ScrollView>
    <View>
    <View style={styles.listItemX}>
      <View style={{flex:1,justifyContent:"center",}}>
      <TouchableOpacity onPress={() => {this.state.navigation.navigate("Address",{Aid:1234})}}>
      <View style={{flexDirection:"row"}}>
      <Icon style={{color:"skyblue",marginLeft:30,marginRight:15,fontWeight:"bold"}} name="ios-add"/>
      <Text style={{fontSize:18,color:"skyblue"}}>Add a new address</Text>
        </View>
      </TouchableOpacity>
      </View>
    </View>
      </View>
      <View style={styles.container}>
        <FlatList
          style={{flex:1}}
          data={this.state.datax}
          renderItem={({ item }) =>(
          <View>
    <View style={styles.listItem}>
      <View style={{flex:1,marginLeft:10}}>
     <TouchableOpacity onPressIn={() => this.setState({addressId:item.aid})} onPress={Upload}>
        <View style={{flexDirection:"row"}}>
        <Text style={{fontWeight:"bold",width:190,fontSize:15}}>{item.name}</Text>
        <Text style={{color:"gray",backgroundColor:"#eae8e0",borderRadius:12,paddingLeft:5,paddingRight:5}}>HOME</Text>
        </View>

        <Text style={{color:"gray",padding:2,width:270,alignItems: 'baseline',fontSize:16}}>{item.Colony}</Text>
        <Text style={{color:"gray",width:270,alignItems: 'baseline',fontSize:16}}>{item.city}</Text>
        <Text style={{color:"gray",padding:2,width:270,alignItems: 'baseline',fontSize:16}}>{item.pincode}</Text>
        <Text style={{color:"black",width:270,alignItems: 'baseline',fontSize:16}}>{item.mobile}</Text>
      </TouchableOpacity>
      </View>
      <View>
      <View style={{borderWidth:1,borderColor:"#e4e6e8",marginRight:10,marginTop:10,paddingLeft:8,paddingRight:8,paddingTop:4,paddingBottom:4,borderRadius:5}}>
    <TouchableOpacity onPress={() => {this.state.navigation.navigate("Address",{Aid:item.aid})}}>
      <Text style={{color:"#14f0d9",fontSize:14}}>Edit</Text>
      </TouchableOpacity>
      
      </View>
      </View>
    </View>
      </View>
          )}
          keyExtractor={item => item.mobile}
        />
      </View>
      </ScrollView>
        </SafeAreaView>
    );
  }
}