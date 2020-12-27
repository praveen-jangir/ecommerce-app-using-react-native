import React, { Component } from 'react';
import { View, Image,Dimensions,TouchableOpacity,FlatList, Text, SafeAreaView, ScrollView,ActivityIndicator,Modal,} from 'react-native';
import styled from 'styled-components/native'
import SwiperFlatList from 'react-native-swiper-flatlist';
import ViewPager from '@react-native-community/viewpager'
import Snackbar from 'react-native-snackbar-component';
import styles from "./styles"
import {
  Container,
  Header,
  Content,
  Left,
  Right,
  Body,
  Icon,
  Thumbnail,
  Input,
  Footer
} from 'native-base';

import firebase from '../pages/firebase.js';
const db = firebase.firestore();
const cat="Man cloths with today offer";

function Item({ item,navigation}) {
  return (
<View>
<View style={[styles.child, { backgroundColor: 'white' }]}>
            <TouchableOpacity>
              <Image style={styles.Thumbnail} source={{uri:item.image}}/>
              </TouchableOpacity>
</View>
   </View>
  );
}
const size=[{"size":"S",no:1},{"size":"M",no:2},{"size":"L",no:3},{"size":"XL",no:4},];
const userx =[{"username":"praveen"},];
const pro=[];
const videosxx = [];
const videosxx1 = [];
const videosxx2 = [];
const videosxx3 = [];
class DisplayAnImageWithStyle extends Component {
    constructor({route,navigation}){
      console.disableYellowBox = true;
      const {Pid,Cat} =route.params;
      const {Fimage} =route.params;
      const user = firebase.auth().currentUser;
    super();
    this.state = {
      allUsers: userx,
      usersFiltered: userx,
      navigation:navigation,
      title:"Loding...",
      Nprice:"Loding...",
      dis:"Loding",
      Oprice:"Loding",
      distance:0,
      snackIsVisible:false,
      Pid:Pid,
      example:"",
      modalVisible:false,
      state:0,
      image:Fimage,
      seller:"",
      uid:user.uid,
      Vdataxx:[],
      Vdataxx1:[],
      Vdataxx2:[],
      Vdataxx3:[],
      type:0,
      cat:Cat,
      Status:1,
    };
  }
  componentDidMount() {

    db.collection('track')
               .where('Uid', '==',this.state.uid)
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
    var list=['001','002','003','004','005','006','007','008','009','010','011','012','013','014','015','016','017','018','019','020','021','022'
          ,'023','024','025','026','027','028','029','030','031','032','033','034','035','036','037','038','039','040','041','042','043','045','046','047','048','049'
        ,'050','051','052','053','054','055','056','057','058','059','060','061','062','063','064','065','066','067','068','069','070','071','072','073','074','075'];
      this.fatch();
      var lenxx=videosxx.length;
      var lenxx1=videosxx1.length;
      var lenxx2=videosxx2.length;
      var lenxx3=videosxx3.length;
      var i=0;
      var x=this.state.cat;
function checkAdult(age) {
        return age == x;
                      }
                        if(list.find(checkAdult)){
                          this.setState({type:0})
                          }
                          else{
                           this.setState({type:1}) 
                          }
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
    }
      fatch=()=>{
      db.collection('Product')
      .where('pId','==',this.state.Pid)
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(documentSnapshot => {
                        pro.push(documentSnapshot.data().Fimage);
                        this.setState({title:documentSnapshot.data().title,Nprice:documentSnapshot.data().newPrice,
                          dis:documentSnapshot.data().dis,Oprice:documentSnapshot.data().oldPrice,seller:documentSnapshot.data().shopName,
                          cat:documentSnapshot.data().catId,
                        })
                            });
                });

                         db.collection('Product')
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
CatidData = () => {
  this.setState({state:1});
  if (this.state.type==1) {
  if (this.state.example=="") {
    this.setState({snackIsVisible:false});
    this.setModalVisible(true);
  }else{
     this.setState({snackIsVisible:true});
      db
      .collection('cart')
  .add({
    pId:this.state.Pid,
    size:this.state.example,
    ip:"",
    uid:this.state.uid,
    title:this.state.title,
    Nprice:this.state.Nprice,
    Oprice:this.state.Oprice,
    Qty:1,
    image:this.state.image,
    seller:this.state.seller,
  })
 .then(docRef => {
    this.setState({state:0});
 });
  setTimeout(function(){
  this.setState({snackIsVisible:false});
  }.bind(this), 1500);
}
}
else{
  this.setState({snackIsVisible:true});
 db
      .collection('cart')
  .add({
    pId:this.state.Pid,
    size:1234,
    ip:"",
    uid:this.state.uid,
    title:this.state.title,
    Nprice:this.state.Nprice,
    Oprice:this.state.Oprice,
    Qty:1,
    image:this.state.image,
    seller:this.state.seller,
  })
 .then(docRef => {
    this.setState({state:0});
 });
  setTimeout(function(){
  this.setState({snackIsVisible:false});
  }.bind(this), 1500);
}
}
CatidDatax = (size) => {
this.setModalVisible(false);
this.setState({example:size})
if (this.state.state==1) {
      db
      .collection('cart')
  .add({
    pId:this.state.Pid,
    size:size,
    ip:"",
    uid:this.state.uid,
    title:this.state.title,
    Nprice:this.state.Nprice,
    Oprice:0,
    Qty:1,
    image:this.state.image,
    seller:this.state.seller,
  })
 .then(docRef => {
  this.setState({state:0});
 });
}
else{
  this.state.navigation.navigate("Buy",{Pid:this.state.Pid,Size:size,Cid:1234});
    }
this.setState({ snackIsVisible: true });;
setTimeout(function(){
  this.setState({snackIsVisible:false});
  }.bind(this), 1500);
}
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }



  BuyData =()=>{
    this.setState({state:0});
    if (this.state.type==1) {

    if (this.state.example=="")
    {
      this.setModalVisible(true);
    }
    else
      {
          this.state.navigation.navigate("Buy",{Pid:this.state.Pid,Size:this.state.example,Cid:1234});
      }
    }

    else{
      this.state.navigation.navigate("Buy",{Pid:this.state.Pid,Size:1234,Cid:1234});
    }
  }
  SampleFunction=()=>{

      this.state.navigation.navigate("Order");

  }
  render() {
const { modalVisible } = this.state;
    return (
    <SafeAreaView style={styles.containerx}>
      <Header style={{backgroundColor:'#1cd4ee',height:60}} searchBar rounded>
      <TouchableOpacity onPress={() => this.state.navigation.goBack()}>
      <Icon style={{marginTop:17,color:"white",marginLeft:-10,marginRight:10}} name="ios-arrow-back" color="white"/>
      </TouchableOpacity>
      <Image style={styles.Logo} source={require('../assets/logo.jpg')}/>
      <Text style={{position:"relative",color:"white",fontSize:18,marginLeft:10,marginTop:17,width:150}}></Text>
      <TouchableOpacity onPress={() => this.state.navigation.navigate("Search")}>
      <Icon style={{marginTop:17,color:"white",marginLeft:10}} name="ios-search" color="white"/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.state.navigation.navigate("Cart",{Cid:1234})}>
      <Icon style={{marginTop:17,color:"white",marginLeft:30}} name="ios-cart" color="white"/>
      </TouchableOpacity>
      <Text style={{position:"relative",color:"red",fontSize:20,marginLeft:-17,marginTop:5,fontWeight:"bold",width:20,height:22,borderRadius:100,paddingLeft:5}}>5</Text>
        </Header>
            <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
          <View style={{flexDirection:"row",marginBottom:10,backgroundColor:"white"}}>
        <Icon style={{marginTop:0,color:"gray",marginRight:10,marginLeft:22,fontSize:32}} name="ios-close"/>
        <Text style={{fontSize:20}}>Select Size</Text>
        </View>
        <View style={styles.modalView}>
        <View style={{flexDirection: 'row',height:350}}>
        <FlatList
          data={size}
          renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={1}
            onPress={() => this.CatidDatax(item.size)}>
           <Text style={{borderWidth:1,padding:5,width:50,textAlign:"center",borderColor:"#e4e6e8",marginRight:14,marginRight:14,backgroundColor: this.state.example === item.size ? '#ccc' : '#fff'}}>{item.size}</Text>
           </TouchableOpacity>
           )}
          keyExtractor={item => item.size}
          numColumns={10}
        />
        </View>
            </View>
          </View>
        </Modal>
    <ScrollView>
      <View style={styles.containerx}>
        <SwiperFlatList
          autoplay
          autoplayDelay={4}
          autoplayLoop
          index={0}
          showPagination
          data={pro}
          renderItem={({ item }) =>
           <View>
           <View style={[styles.child, { backgroundColor: 'white' }]}>
              <Image style={styles.Thumbnail} source={{uri:this.state.image}}/>
             </View>
           <Item item={item} navigation={this.state.navigation}/>
          </View>
         }
        />
        </View>

     <View style={{flex:1,marginLeft:10}}>
        <Text style={{padding:5,fontSize:18}}>{this.state.title}</Text>
        <Text style={{padding:5,fontSize:16,color:"gray",marginTop:-10}}>{this.state.dis}</Text>
        <View style={{flex: 1, flexDirection: 'row'}}>
        <Text style={{color:"white",backgroundColor:"#138f32",padding:2,width:40}}>4.5 ★ </Text>
        <Text style={{color:"gray",marginLeft:10}}>(<Icon style={{color:"gray",fontSize:16}} name="ios-person"/> 250)</Text>
        </View>
        <Text style={{fontSize:22,paddingTop:10}}>₹{this.state.Nprice} <Text style={{color:"gray",fontSize:16,textDecorationLine: 'line-through'}}>{this.state.Oprice}</Text><Text style={{color:"green",fontSize:14}}>  50% off</Text></Text>
      </View>
      <View style={{borderWidth: 0.25,borderColor:"#e4e6e8",marginTop:20}}></View>

      <View style={{flex:1,marginLeft:10,marginTop:10}}>
        <Text style={{padding:5,fontSize:16,color:"gray"}}>Available offers</Text>
        <View style={{flex: 1, flexDirection: 'row',marginTop:7}}>
        <Image style={{width:17,height:15,padding:5,marginTop:2,marginLeft:10}} source={require('../assets/offer.png')}/>
        <Text style={{color:"gray",marginLeft:3}}> Get order Some day with ContactLess Delivary</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row',marginTop:7}}>
        <Image style={{width:17,height:15,padding:5,marginTop:2,marginLeft:10}} source={require('../assets/offer.png')}/>
        <Text style={{color:"gray",marginLeft:3}}> Get<Text style={{color:"green"}}> 30%</Text> Off on Your Frist Order Buy Now</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row',marginTop:7}}>
        <Image style={{width:17,height:15,padding:5,marginTop:2,marginLeft:10}} source={require('../assets/offer.png')}/>
        <Text style={{color:"gray",marginLeft:3}}> Retrun Order after if you don't want </Text>
        </View>
      </View>

      <View style={{borderWidth: 0.25,borderColor:"#e4e6e8",marginTop:20}}></View>
      {this.state.type == 1?
      <View style={{flex:1,marginLeft:10,marginTop:10}}>
        <Text style={{padding:5,fontSize:16,color:"gray"}}>Size</Text>
        <View style={{flex: 1, flexDirection: 'row',marginTop:7}}>
        <FlatList
          data={size}
          renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={1}
            onPress={() => this.setState({ example: item.size })}>
           <Text style={{borderWidth:1,padding:5,width:50,textAlign:"center",borderColor:"#e4e6e8",marginRight:14,marginRight:14,backgroundColor: this.state.example === item.size ? '#ccc' : '#fff'}}>{item.size}</Text>
           </TouchableOpacity>
           )}
          //Setting the number of column
          numColumns={10}
        />
        </View>
      </View>
      :null}

      <View style={{borderWidth: 0.25,borderColor:"#e4e6e8",marginTop:20}}></View>
<Text style={{padding:5,fontSize:18,color:"black",marginLeft:6,marginTop:10}}>Similar Products</Text>
<ScrollView
horizontal={true}
>
        <View style={styles.MainContainer}>
        <FlatList
          data={this.state.Vdataxx3}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1,height:220,backgroundColor:"white",alignItems:"center",padding:5}}>
            <TouchableOpacity>
              <Image style={styles.imageThumbnailx} source={{uri: item.Fimage}}/>
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

      <View style={{borderWidth: 0.25,borderColor:"#e4e6e8",marginTop:20}}></View>
      <Text style={{padding:5,fontSize:18,color:"black",marginLeft:6,marginTop:10}}>Similar Products</Text>
<ScrollView
horizontal={true}
>
        <View style={styles.MainContainer}>
          <FlatList
          data={this.state.Vdataxx2}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1,height:220,backgroundColor:"white",alignItems:"center",padding:5}}>
            <TouchableOpacity>
              <Image style={styles.imageThumbnailx} source={{uri: item.Fimage}}/>
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
      <View style={{borderWidth: 0.25,borderColor:"#e4e6e8",marginTop:20}}></View>
      <Text style={{padding:5,fontSize:18,color:"black",marginLeft:6,marginTop:10,marginBottom:10}}>More Products</Text>
<View style={styles.MainContainer}>
        <FlatList
          data={this.state.Vdataxx1}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1,height:240,backgroundColor:"white",alignItems:"center"}}>
            <TouchableOpacity>
              <Image style={styles.XThumbnail} source={{uri: item.Fimage}}/>
              <Icon style={{color:"gray",marginLeft:120,position:"absolute",borderRadius:100,width:30,height:30,backgroundColor:"white",paddingLeft:3,paddingRight:1,paddingTop:2,paddingBottom:2,bottom:5}} name="ios-cart" color="white"/>
              </TouchableOpacity>
              <Text style={{marginLeft:-90}}>Short Name</Text>
              <Text style={{marginLeft:-50}}>Dress discripation</Text>
              <Text style={{marginLeft:-50,fontSize:15}}>₹999 <Text style={{color:"gray",fontSize:12,textDecorationLine: 'line-through'}}>1999</Text><Text style={{color:"green",fontSize:12}}>  50% off</Text></Text>
            </View>
          )}
          //Setting the number of column
          numColumns={2}
        />
        
      </View>
      </ScrollView>
      <Footer style={{flexDirection: 'row',borderWidth:0.25,borderColor:"#e4e6e8",width:"100%"}}>
      <TouchableOpacity style={{width:"50%"}} onPress={() => {
                  this.CatidData();
                }}>
      <Text style={{color:"gray",fontSize:20,width:"100%",backgroundColor:"white",textAlign:"center",justifyContent:"center",padding:15}}>ADD TO CART</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{width:"50%"}} onPress={() => {
                  this.BuyData();
                }}
>
      <Text style={{color:"white",fontSize:20,width:"100%",backgroundColor:"orange",textAlign:"center",justifyContent:"center",padding:15}}>BUY NOW</Text>
        </TouchableOpacity>
        </Footer>

                <Snackbar
                Options={{
                  position:"Top"
                }}
          visible={this.state.snackIsVisible}
          textMessage="Added to cart"
          actionHandler={() => {
            this.state.navigation.navigate("Cart",{Cid:1234});
            this.setState({snackIsVisible:false});
          }}
          actionText="View Cart"
          distanceCallback={(distance) => {
            this.setState({distance:distance});
          }}
        />
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