import React from 'react';
import styles from "../screen/styles"
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
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
function Item({ item,navigation,thisx}) {
  return (
    <View style={styles.listItem}>
    {item.status!=3?
    <TouchableOpacity onPress={() => thisx.Get(item.uid,item.oid)}>
      <Image style={{width:70, height:80}} source={{uri: item.image}}/>
      </TouchableOpacity>:
    <TouchableOpacity onPress={() => alert("Order Pickuped")}>
      <Image style={{width:70, height:80}} source={{uri: item.image}}/>
      </TouchableOpacity>}
      <View style={{flex:1,marginLeft:10}}>
        <Text style={{fontWeight:"bold"}}>{item.title}</Text>
        <Text style={{color:"gray"}}>{item.shopName}</Text>
        <Text style={{fontSize:16}}>₹{item.price}</Text>
        {item.status!=3?
        <View style={{flexDirection:"row"}}>
        <Image style={{width:20, height:20}} source={{uri:"https://www.usa.philips.com/c-dam/b2bhc/master/education-resources/copd-insider/why-every-copd-patient-needs-a-case-manager/outcome-icon.png"}}/>
        <Text style={{fontSize:16,color:"#dd791f",marginLeft:5}}>Pickup The Order</Text>
        </View>:
        <View style={{flexDirection:"row"}}>
        <Image style={{width:20, height:20}} source={{uri:"https://www.nicepng.com/png/full/236-2362999_check-icon-yellow-check-icon-png.png"}}/>
        <Text style={{fontSize:16,color:"#ffb400",marginLeft:5}}>Order Pickuped</Text>
        </View>}
        
      </View>
      <TouchableOpacity style={{height:50,width:50, justifyContent:"center",alignItems:"center"}}>
                      <Icon style={{color:"gray",borderRadius:100,width:30,height:30,backgroundColor:"white"}} name="arrow-forward"/>
      </TouchableOpacity>
    </View>
  );
}
const Lproduct=[];
const cat="Man cloths with today offer";
export default class App extends React.Component {
   constructor({route,navigation}){
      const user = firebase.auth().currentUser;
   super();
    this.state = {
      navigation:navigation,
      Data:[],
      Status:1,
      Uid:user.uid,
      this:this,
    };             

  }
    componentDidMount() {
      var len=Lproduct.length;
      var i=0;
      while(len>=i){
        Lproduct.pop();
        i=i+1;
      }
      this.fatch();
    }
      fatch=()=>{
                db.collection('Order')
                .where('status','in',[0,3])
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(documentSnapshot => {
                        Lproduct.push(documentSnapshot.data());
                        this.setState({Data:Lproduct})
                            });
                });

                }
               SampleFunction=()=>{

      this.state.navigation.navigate("Order");

  }
  Get=(x,y)=>{
                db.collection('track')
                .where('Status','==',0)
                .where('TrackId','==','')
                .where('Uid','==',x)
                .get()
                .then(snapshot => {
        snapshot.forEach(doc => {
  db
  .collection('track')
  .doc(doc.id)
  .update({
    TrackId:this.state.Uid,
    Status:3,
  })
    .then(dex=>{

  db
  .collection('Order')
  .doc(y)
  .update({
    status:3,
  })
    .then(dex=>{alert("");
  })
  })

        });
      })
    
  }
  render(){
    return (
      <View style={styles.container}>
        <FlatList
          style={{flex:1}}
          data={this.state.Data}
          renderItem={({ item }) => <Item item={item} navigation={this.state.navigation} thisx={this}/>}
        />
              </View>
    );
  }
}
