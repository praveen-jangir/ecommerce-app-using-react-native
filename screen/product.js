import React, { Component } from 'react';
import { View, Image, StyleSheet,Dimensions,TouchableOpacity,FlatList, Text, SafeAreaView, ScrollView,ActivityIndicator} from 'react-native';
import styled from 'styled-components/native'
import SwiperFlatList from 'react-native-swiper-flatlist';
import ViewPager from '@react-native-community/viewpager'
import styles from "./styles"
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
export const { width, height } = Dimensions.get('window');
function Item({ item,navigation}) {
  return (<View style={{ flex: 1, flexDirection: 'column', margin: 1,height:260,backgroundColor:"white",alignItems:"center"}}>
            <TouchableOpacity onPress={() => navigation.navigate("productView",{Pid:item.pId,Fimage:item.Fimage})}>
              <Image style={styles.imageThumbnail} source={{uri: item.Fimage}}/>
              <Icon style={{color:"gray",marginLeft:140,position:"absolute",borderRadius:100,width:30,height:30,backgroundColor:"white",paddingLeft:3,paddingRight:1,paddingTop:2,paddingBottom:2,bottom:5}} name="ios-cart" color="white"/>
              </TouchableOpacity>
            
              <Text style={{marginLeft:-90}}>{item.shopName}</Text>
              <TouchableOpacity onPress={() => navigation.navigate("productView",{Pid:item.pId,Fimage:item.Fimage})}>
              <Text style={{marginLeft:-50}}>{item.dis}</Text>
              <Text style={{marginLeft:-50,fontSize:15}}>₹{item.newPrice} <Text style={{color:"gray",fontSize:12,textDecorationLine: 'line-through'}}>{item.oldPrice}</Text><Text style={{color:"green",fontSize:12}}>  50% off</Text></Text>
            </TouchableOpacity>
            </View>
            );
}
const catx="Man cloths with today offer";
const cat = [];
const videos=[];
const Lproduct=[];
const userx =[{"username":"praveen"},];
class DisplayAnImageWithStyle extends Component {
    constructor({route,navigation}){
      const {Pid} =route.params;
      const user = firebase.auth().currentUser;
      db.collection('Product')
                .where('catId','==',Pid)
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(documentSnapshot => {
                        videos.push(documentSnapshot.data());
                        var x=videos.length;
                   /*     if (x%2==0 && x==1) {
                        }
                        else{
                          if (x==1) {
                          }
                          else{
                            videos.pop();
                          }
                        }*/
                  console.log(videos);
                            });
                });
    super();
    this.state = {
      allUsers: userx,
      usersFiltered: userx,
      navigation:navigation,
      catId:Pid,
      Data:[],
      Status:1,
      Uid:user.uid,

    };
  }

    componentDidMount() {
    db.collection('track')
               .where('Uid', '==',this.state.Uid)
               .where('Status', '==',0)
               .get()
               .then(querySnapshot => {
                  querySnapshot.forEach(documentSnapshot => {
                        if (documentSnapshot.data().Status==0) {
                          this.setState({Status:0})
                        }else
                        {
                          this.setState({Status:1})
                        }
                            });
                });
      var len=Lproduct.length;
      var i=0;
      while(len>=i){
        Lproduct.pop();
        i=i+1;
      }
      this.fatch();
    }
      fatch=()=>{
                db.collection('Product')
                .where('catId','==',this.state.catId)
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(documentSnapshot => {
                        Lproduct.push(documentSnapshot.data());
                        this.setState({Data:Lproduct})
                        console.log(Lproduct);
                            });
                });

                }
                SampleFunction=()=>{

      this.state.navigation.navigate("Order");

  }
  render() {

    return (
    <SafeAreaView style={styles.containeri}>
      <Header style={{backgroundColor:'#1cd4ee',height:60}} searchBar rounded>
      <TouchableOpacity onPress={() => this.state.navigation.goBack()}>
      <Icon style={{marginTop:17,color:"white",marginLeft:-10,marginRight:10}} name="ios-arrow-back" color="white"/>
      </TouchableOpacity>
      <Image style={styles.Logo} source={require('../assets/logo.jpg')}/>
      <Text style={{position:"relative",color:"white",fontSize:18,marginLeft:10,marginTop:17,width:150}}>{catx.slice(0, 14)+".."}</Text>
      <TouchableOpacity onPress={() => this.state.navigation.navigate("Search")}>
      <Icon style={{marginTop:17,color:"white",marginLeft:10}} name="ios-search" color="white"/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.state.navigation.navigate("Cart",{Cid:1234})}>
      <Icon style={{marginTop:17,color:"white",marginLeft:30}} name="ios-cart" color="white"/>
      </TouchableOpacity>
      <Text style={{position:"relative",color:"red",fontSize:20,marginLeft:-17,marginTop:5,fontWeight:"bold",width:20,height:22,borderRadius:100,paddingLeft:5}}>5</Text>
        </Header>
        
    <ScrollView>
        <View>
        <View style={styles.MainContainer}>
        <FlatList
          data={this.state.Data}
          renderItem={({ item }) => <Item item={item} navigation={this.state.navigation}/>}
          
          numColumns={2}
        />
        
      </View>
       </View>
            </ScrollView>
            {this.state.Status == 0?
            <TouchableOpacity activeOpacity={0.5} onPress={this.SampleFunction} style={styles.TouchableOpacityStyle} >

          <Image source={{uri : 'https://mandawamart.com/admin/map.png'}} 
          
                 style={styles.FloatingButtonStyle} />
       
        </TouchableOpacity>:null}
        </SafeAreaView>
    );
  }
}

export default DisplayAnImageWithStyle;