import React, { Component } from 'react';
import { View, Image, StyleSheet,Dimensions,TouchableOpacity,FlatList, Text, SafeAreaView, ScrollView,ActivityIndicator} from 'react-native';
import styled from 'styled-components/native'
import SwiperFlatList from 'react-native-swiper-flatlist';
import ViewPager from '@react-native-community/viewpager'
import firebase from '../pages/firebase.js';
import styles from "./styles"
const db = firebase.firestore();
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
  Item
} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
export const { width, height } = Dimensions.get('window');

import cat from '../services/api'
const videos = [];
const videosx = [];
const videosxx = [];
const videosxx1 = [];
const videosxx2 = [];
const videosxx3 = [];

const userx =[{"username":"praveen"},];
function Itemx({ item,navigation}) {
  return (
    <View style={{ flex: 1, flexDirection: 'column', margin: 1,height:260,backgroundColor:"white",borderRadius:7,textAlign: "left",alignItems:"center"}}>
            <TouchableOpacity onPress={() => navigation.navigate("productView",{Pid:item.pId,Fimage:item.Fimage,Cat:item.catId})}>
            <View style={{alignItems:"center"}}>
              <Image style={styles.imageThumbnaili} source={{uri: item.Fimage}}/>
              </View>
              </TouchableOpacity>
              <View style={{paddingLeft:14,textAlign: "left"}}>
              <Text style={{fontSize:14,fontWeight:"bold"}}>{item.title.slice(0, 40)}</Text>
              <TouchableOpacity onPress={() => navigation.navigate("productView",{Pid:item.pId,Fimage:item.Fimage,Cat:item.catId})}>
              <Text style={{width:140,fontSize:14}}>{item.dis.slice(0, 40)}</Text>
              <Text style={{fontSize:14}}>₹{item.newPrice} <Text style={{color:"gray",fontSize:12,textDecorationLine: 'line-through'}}>{item.oldPrice}</Text><Text style={{color:"green",fontSize:12}}>  50% off</Text></Text>
            </TouchableOpacity>
            </View>
            </View>
            );
}
class DisplayAnImageWithStyle extends Component {
    constructor({route,navigation}){
      navigation.setOptions({ headerShown: false });
        const user = firebase.auth().currentUser;
    super();
    this.state = {
      allUsers: userx,
      usersFiltered: userx,
      navigation:navigation,
      Data:[],
      Vdata:[],
      Vdatax:[],
      Vdataxx:[],
      Vdataxx1:[],
      Vdataxx2:[],
      Vdataxx3:[],
      Uid:user.uid,
      Status:1,
    };
    this.state.navigation.setOptions({ headerShown: false });
    navigation.setOptions({ headerShown: false });
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

      var catx=cat.length;
      var len=videos.length;
      var lenx=videosx.length;
      var lenxx=videosxx.length;
      var lenxx1=videosxx1.length;
      var lenxx2=videosxx2.length;
      var lenxx3=videosxx3.length;
      var i=0;
      while(lenxx1>=i){
        videosxx1.pop();
        i=i+1;
      }
      while(lenxx3>=i){
        videosxx3.pop();
        i=i+1;
      }
      while(lenxx2>=i){
        videosxx2.pop();
        i=i+1;
      }
      while(lenxx>=i){
        videosxx.pop();
        i=i+1;
      }
      while(len>=i){
        videos.pop();
        i=i+1;
      }
      while(lenx>=i){
        videosx.pop();
        i=i+1;
      }
      while(catx>=i){
        cat.pop();
        i=i+1;
      }
      this.fatch();
      
    }
      fatch=()=>{
               db.collection('cat')
               .where('catId', 'in', ['003', '004','005','007','008','009','011','012'])
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(documentSnapshot => {
                        cat.push(documentSnapshot.data());
                            });
                  this.setState({Data:cat})
                });

               db.collection('cat')
               .where('catId', 'in', ['001', '002'])
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(documentSnapshot => {
                        videos.push(documentSnapshot.data());
                            });
                  this.setState({Vdata:videos})
                });

                db.collection('cat')
               .where('catId', 'in', ['006', '010'])
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(documentSnapshot => {
                        videosx.push(documentSnapshot.data());
                            });
                  this.setState({Vdatax:videosx})
                });

               db.collection('Product')
               .where('catId', 'in', ['001', '002'])
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(documentSnapshot => {
                        videosxx.push(documentSnapshot.data());
                            });
                  this.setState({Vdataxx:videosxx})
                });

               db.collection('Product')
               .where('catId', 'in', ['006', '009'])
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(documentSnapshot => {
                        videosxx1.push(documentSnapshot.data());
                            });
                  this.setState({Vdataxx1:videosxx1})
                });

                db.collection('Product')
               .where('catId', 'in', ['004','009'])
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(documentSnapshot => {
                        videosxx2.push(documentSnapshot.data());
                            });
                  this.setState({Vdataxx2:videosxx2})
                });

                db.collection('Product')
               .where('catId', 'in', ['004','006'])
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(documentSnapshot => {
                        videosxx3.push(documentSnapshot.data());
                            });
                  this.setState({Vdataxx3:videosxx3})
                });


                }
                  SampleFunction=()=>{

      this.state.navigation.navigate("Order");

  }

  render() {

    return (
    <SafeAreaView style={styles.containeri}>
      <Header style={{backgroundColor:'#1cd4ee',height:120}} searchBar rounded>
      <TouchableOpacity onPress={() => this.state.navigation.openDrawer()}>
      <Icon style={{marginTop:25,color:"white"}} name="ios-menu" color="white"/>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => this.state.navigation.navigate("Available Order")}>
      <Image style={styles.Logoi} source={require('../assets/logo.png')}/>
      </TouchableOpacity>
<TouchableOpacity onPress={() => this.state.navigation.navigate("Cart",{Cid:1234})}>
      <Icon style={{marginTop:25,color:"white",marginLeft:130}} name="ios-cart" color="white"/>
</TouchableOpacity>
      <Text style={{position:"relative",color:"red",fontSize:24,marginLeft:-10,marginTop:5,fontWeight:"bold"}}>5</Text>
      
          <Item style={{width:"100%",marginTop:70,justifyContent:"center",marginLeft:-335}}>

            <Input style={{width:"100%"}}
            onTouchStart={()=>  this.state.navigation.navigate("Search")}
              placeholder="Search"
              onChangeText={text => this.setState({search:text})}
            />
          <TouchableOpacity  onPress={() => this.state.navigation.navigate("Search")}>
            <Icon name="ios-search"/>
            </TouchableOpacity>
          </Item>
          
        </Header>
        
    <ScrollView>
      <View style={styles.containeri}>
        <SwiperFlatList
          autoplay
          autoplayDelay={2}
          autoplayLoop
          index={2}
          showPagination
        >
          <View style={[styles.childi, { backgroundColor: 'tomato' }]}>
            <TouchableOpacity>
              <Image style={styles.Thumbnaili} source={{uri:"https://cdn1.vectorstock.com/i/1000x1000/65/60/sale-discount-voucher-template-design-poster-vector-17416560.jpg"}}/>
              </TouchableOpacity>
                        </View>
          <View style={[styles.childi, { backgroundColor: 'thistle' }]}>
            <TouchableOpacity>
              <Image style={styles.Thumbnaili} source={{uri:"https://cdn4.vectorstock.com/i/1000x1000/93/23/creative-sale-banner-in-purple-and-yellow-color-vector-14299323.jpg"}}/>
              </TouchableOpacity>
          </View>
          <View style={[styles.childi, { backgroundColor: 'skyblue' }]}>
            <TouchableOpacity>
              <Image style={styles.Thumbnaili} source={{uri:"https://cdn1.vectorstock.com/i/1000x1000/34/50/discount-voucher-poster-template-design-in-vector-19833450.jpg"}}/>
              </TouchableOpacity>
          </View>
          <View style={[styles.childi, { backgroundColor: 'teal' }]}>
            <TouchableOpacity>
              <Image style={styles.Thumbnaili} source={{uri:"https://cdn3.vectorstock.com/i/1000x1000/65/62/discount-voucher-poster-template-background-vector-17416562.jpg"}}/>
              </TouchableOpacity>
          </View>
        </SwiperFlatList>
      </View>
    <View>
        <View style={styles.MainContaineri}>
        <LinearGradient colors={['#0ebcec', '#a4ec0e']}>
        <View style={{height:50}}>
         <Text style={{fontSize:20,color:"white",fontWeight:"bold",marginLeft:10}}>Regular Products</Text>
         <Text style={{fontSize:14,color:"green",marginLeft:10}}>Get Best offer</Text>
        </View>
        <FlatList
          data={this.state.Data}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1,height:210,backgroundColor:"white",justifyContent:"center",alignItems:"center",borderRadius:10 }}>
            <TouchableOpacity onPress={() => this.state.navigation.navigate(item.type,{Pid:item.catId})}>
              <Image style={styles.imageThumbnaili} source={{uri: item.image}}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.state.navigation.navigate(item.type,{Pid:item.catId})}>
              <Text style={{justifyContent:"center",textAlign:"center",marginTop:0}}>{item.title}</Text>
              </TouchableOpacity>
            </View>
          )}
          //Setting the number of column
          numColumns={2}
        />
        </LinearGradient>
      </View>
      <View style={styles.MainContaineri,{backgroundColor:"#cdec0e"}}>
      <LinearGradient colors={['#a4ec0e','#0eecdf']}>
        <View style={{height:50}}>
         <Text style={{fontSize:20,color:"white",fontWeight:"bold",marginLeft:10}}>Man dress</Text>
         <Text style={{fontSize:14,color:"green",marginLeft:10}}>Get Best offer</Text>
        </View>
        <FlatList
          data={this.state.Vdata}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1,height:210,backgroundColor:"white",justifyContent:"center",alignItems:"center",borderRadius:10 }}>
            <TouchableOpacity onPress={() => this.state.navigation.navigate(item.type,{Pid:item.catId})}>
              <Image style={styles.imageThumbnaili} source={{uri: item.image}}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.state.navigation.navigate(item.type,{Pid:item.catId})}>
              <Text style={{justifyContent:"center",textAlign:"center",marginTop:0}}>{item.title}</Text>
              </TouchableOpacity>
            </View>
          )}
          //Setting the number of column
          numColumns={2}
        />
        </LinearGradient>
      </View>
      <View style={styles.MainContaineri,{backgroundColor:"#cdec0e"}}>
      <LinearGradient colors={['#0eecdf','#ffb900']}>
        <View style={{height:50}}>
         <Text style={{fontSize:20,color:"white",fontWeight:"bold",marginLeft:10}}>Shoes</Text>
         <Text style={{fontSize:14,color:"green",marginLeft:10}}>Get Best offer</Text>
        </View>
        <FlatList
          data={this.state.Vdatax}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1,height:210,backgroundColor:"white",justifyContent:"center",alignItems:"center",borderRadius:10 }}>
            <TouchableOpacity onPress={() => this.state.navigation.navigate(item.type,{Pid:item.catId})}>
              <Image style={styles.imageThumbnaili} source={{uri: item.image}}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.state.navigation.navigate(item.type,{Pid:item.catId})}>
              <Text style={{justifyContent:"center",textAlign:"center",marginTop:0}}>{item.title}</Text>
              </TouchableOpacity>
            </View>
          )}
          //Setting the number of column
          numColumns={2}
        />
        </LinearGradient>
      </View>

      <View style={{backgroundColor:"transparent"}}>
      <LinearGradient colors={['#ffb900','#73ff03']}>
      <View style={{height:50}}>
         <Text style={{fontSize:20,color:"white",fontWeight:"bold",marginLeft:10}}>Man dress</Text>
         <Text style={{fontSize:14,color:"green",marginLeft:10}}>Get Best offer</Text>
        </View>
<ScrollView
horizontal={true}
>
        <View style={styles.MainContaineri,{backgroundColor:"transparent"}}>
        <FlatList
          data={videosxx}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1,height:220,backgroundColor:"white",alignItems:"center",padding:5}}>
            <TouchableOpacity onPress={() => this.state.navigation.navigate("productView",{Pid:item.pId,Fimage:item.Fimage,Cat:item.catId})}>
              <Image style={styles.imageThumbnaili} source={{uri: item.Fimage}}/>
              <Icon style={{color:"gray",marginLeft:110,position:"absolute",borderRadius:100,width:30,height:30,backgroundColor:"white",paddingLeft:3,paddingRight:1,paddingTop:2,paddingBottom:2,bottom:5}} name="ios-cart" color="white"/>
              </TouchableOpacity>
              <Text style={{marginLeft:-70}}>Short Name</Text>
              <Text style={{marginLeft:-30}}>Dress discripation</Text>
              <Text style={{marginLeft:-30,fontSize:15}}>₹999 <Text style={{color:"gray",fontSize:12,textDecorationLine: 'line-through'}}>1999</Text><Text style={{color:"green",fontSize:12}}>  50% off</Text></Text>
            </View>
          )}
          //Setting the number of column
          numColumns={20}
        />
        
      </View>
</ScrollView>
</LinearGradient>
</View>
      
      
      <View style={{backgroundColor:"transparent"}}>
      <LinearGradient colors={['#73ff03','#b203ff']}>
      <View style={{height:50}}>
         <Text style={{fontSize:20,color:"white",fontWeight:"bold",marginLeft:10}}>Best of the day</Text>
         <Text style={{fontSize:14,color:"green",marginLeft:10}}>Get Best offer</Text>
        </View>
<ScrollView
horizontal={true}
>
        <View style={styles.MainContaineri,{backgroundColor:"transparent"}}>
        <FlatList
          data={videosxx1}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1,height:220,backgroundColor:"white",alignItems:"center",padding:5}}>
            <TouchableOpacity onPress={() => this.state.navigation.navigate("productView",{Pid:item.pId,Fimage:item.Fimage,Cat:item.catId})}>
              <Image style={styles.imageThumbnaili} source={{uri: item.Fimage}}/>
              <Icon style={{color:"gray",marginLeft:110,position:"absolute",borderRadius:100,width:30,height:30,backgroundColor:"white",paddingLeft:3,paddingRight:1,paddingTop:2,paddingBottom:2,bottom:5}} name="ios-cart" color="white"/>
              </TouchableOpacity>
              <Text style={{marginLeft:-70}}>Short Name</Text>
              <Text style={{marginLeft:-30}}>Dress discripation</Text>
              <Text style={{marginLeft:-30,fontSize:15}}>₹999 <Text style={{color:"gray",fontSize:12,textDecorationLine: 'line-through'}}>1999</Text><Text style={{color:"green",fontSize:12}}>  50% off</Text></Text>
            </View>
          )}
          //Setting the number of column
          numColumns={20}
        />
        
      </View>
</ScrollView>
</LinearGradient>
</View>


      <View style={{backgroundColor:"transparent"}}>
      <LinearGradient colors={['#b203ff','#ccc']}>
      <View style={{height:50}}>
         <Text style={{fontSize:20,color:"white",fontWeight:"bold",marginLeft:10}}>Fast Food</Text>
         <Text style={{fontSize:14,color:"green",marginLeft:10}}>Get Best offer</Text>
        </View>
<ScrollView
horizontal={true}
>
        <View style={styles.MainContaineri,{backgroundColor:"transparent"}}>
        <FlatList
          data={videosxx2}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1,height:220,backgroundColor:"white",alignItems:"center",padding:5}}>
            <TouchableOpacity onPress={() => this.state.navigation.navigate("productView",{Pid:item.pId,Fimage:item.Fimage,Cat:item.catId})}>
              <Image style={styles.imageThumbnaili} source={{uri: item.Fimage}}/>
              <Icon style={{color:"gray",marginLeft:110,position:"absolute",borderRadius:100,width:30,height:30,backgroundColor:"white",paddingLeft:3,paddingRight:1,paddingTop:2,paddingBottom:2,bottom:5}} name="ios-cart" color="white"/>
              </TouchableOpacity>
              <Text style={{marginLeft:-70}}>Short Name</Text>
              <Text style={{marginLeft:-30}}>Dress discripation</Text>
              <Text style={{marginLeft:-30,fontSize:15}}>₹999 <Text style={{color:"gray",fontSize:12,textDecorationLine: 'line-through'}}>1999</Text><Text style={{color:"green",fontSize:12}}>  50% off</Text></Text>
            </View>
          )}
          //Setting the number of column
          numColumns={20}
        />
        
      </View>
</ScrollView>
</LinearGradient>
</View>

        <View>
           <LinearGradient colors={['#ccc','#d5ff00']}>
        <View style={styles.MainContaineri,{backgroundColor:"transparent",marginTop:10}}>
        <View style={{height:50}}>
         <Text style={{fontSize:20,color:"white",fontWeight:"bold",marginLeft:10}}>Fast Food</Text>
         <Text style={{fontSize:14,color:"green",marginLeft:10}}>Get Best offer</Text>
        </View>

        <FlatList
          data={this.state.Vdataxx3}
          renderItem={({ item }) => <Itemx item={item} navigation={this.state.navigation}/>}
        
          numColumns={2}
        />
        
      </View>
      </LinearGradient>
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
