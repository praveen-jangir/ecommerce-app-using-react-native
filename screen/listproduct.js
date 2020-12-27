import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
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
function Item({ item,navigation}) {
  return (
    <View style={styles.listItem}>
    <TouchableOpacity onPress={() => navigation.navigate("productView",{Pid:item.pId,Fimage:item.Fimage})}>
      <Image style={{width:110, height:120}} source={{uri: item.Fimage}}/>
      </TouchableOpacity>
      <View style={{flex:1,marginLeft:10}}>
      <TouchableOpacity onPress={() => navigation.navigate("productView",{Pid:item.pId,Fimage:item.Fimage})}>
        <Text style={{fontWeight:"bold"}}>{item.title}</Text>
        <Text style={{color:"gray"}}>{item.shopName}</Text>
        <Text style={{color:"white",backgroundColor:"#138f32",padding:2,width:40}}>4.5 ★ </Text><Text style={{color:"gray"}}>(<Icon style={{color:"gray",fontSize:16}} name="ios-person"/> 250)</Text>
        <Text style={{fontSize:16}}>₹{item.newPrice} <Text style={{color:"gray",fontSize:12,textDecorationLine: 'line-through'}}>{item.oldPrice}</Text><Text style={{color:"green",fontSize:12}}>  50% off</Text></Text>
       </TouchableOpacity>     
      </View>
      <TouchableOpacity style={{height:50,width:50, justifyContent:"center",alignItems:"center"}}>
                      <Icon style={{color:"gray",borderRadius:100,width:30,height:30,backgroundColor:"white"}} name="ios-cart"/>
      </TouchableOpacity>
    </View>
  );
}
const Lproduct=[];
const cat="Man cloths with today offer";
export default class App extends React.Component {
   constructor({route,navigation}){
      const {Pid} =route.params;
      const user = firebase.auth().currentUser;
   super();
    this.state = {
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
  render(){
    return (
      <View style={styles.container}>
      <Header style={{backgroundColor:'#1cd4ee',height:60}} searchBar rounded>
      <TouchableOpacity onPress={() => this.state.navigation.goBack()}>
      <Icon style={{marginTop:17,color:"white",marginLeft:-10,marginRight:10}} name="ios-arrow-back" color="white"/>
      </TouchableOpacity>
      <Image style={styles.Logo} source={require('../assets/logo.jpg')}/>
      <Text style={{position:"relative",color:"white",fontSize:18,marginLeft:10,marginTop:17,width:150}}>{cat.slice(0, 14)+".."}</Text>
      <TouchableOpacity onPress={() => this.state.navigation.navigate("Search")}>
      <Icon style={{marginTop:17,color:"white",marginLeft:10}} name="ios-search" color="white"/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.state.navigation.navigate("Cart",{Cid:1234})}>
      <Icon style={{marginTop:17,color:"white",marginLeft:30}} name="ios-cart" color="white"/>
      </TouchableOpacity>
      <Text style={{position:"relative",color:"red",fontSize:20,marginLeft:-17,marginTop:5,fontWeight:"bold",width:20,height:22,borderRadius:100,paddingLeft:5}}>5</Text>
        </Header>
        <FlatList
          style={{flex:1}}
          data={this.state.Data}
          renderItem={({ item }) => <Item item={item} navigation={this.state.navigation}/>}
        />
        {this.state.Status == 0?
            <TouchableOpacity activeOpacity={0.5} onPress={this.SampleFunction} style={styles.TouchableOpacityStyle} >

          <Image source={{uri : 'https://mandawamart.com/admin/map.png'}} 
          
                 style={styles.FloatingButtonStyle} />
       
        </TouchableOpacity>:null}
      </View>
    );
  }
}