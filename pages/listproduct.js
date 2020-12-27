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
import firebase from './firebase.js';
const db = firebase.firestore();
function Item({ item,navigation}) {
  return (
    <View style={styles.listItem}>
    <TouchableOpacity onPress={() => navigation.navigate("productView",{Pid:item.pId})}>
      <Image style={{width:110, height:120}} source={{uri: item.Fimage}}/>
      </TouchableOpacity>
      <View style={{flex:1,marginLeft:10}}>
      <TouchableOpacity onPress={() => navigation.navigate("productView",{Pid:item.pId})}>
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
   super();
    this.state = {
      navigation:navigation,
      catId:Pid,
      Data:[],
      
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
      <TouchableOpacity onPress={() => this.state.navigation.navigate("Cart")}>
      <Icon style={{marginTop:17,color:"white",marginLeft:30}} name="ios-cart" color="white"/>
      </TouchableOpacity>
      <Text style={{position:"relative",color:"red",fontSize:20,marginLeft:-17,marginTop:5,fontWeight:"bold",width:20,height:22,borderRadius:100,paddingLeft:5}}>5</Text>
        </Header>
        <Header style={{backgroundColor:'white',height:50}} searchBar rounded>
       <TouchableOpacity style={{width:"50%",flexDirection:"row",alignItems:"center",textAlign:"center",justifyContent:"center"}}>
       <Image style={{
      height: 20,
      width:20,marginRight:6}} source={{uri:'https://cdn.iconscout.com/icon/free/png-256/sort-1772385-1508281.png'}}/>
        <Text style={{fontSize:18,textAlign:"center",justifyContent:"center",color:"black"}}>Sort</Text>
      </TouchableOpacity>
      <View style={{width:20}}></View>
      <View style={{borderRightWidth:0.5,borderColor:"gray"}}></View>
      <View style={{width:20}}></View>
      <TouchableOpacity style={{width:"50%",flexDirection:"row",alignItems:"center",textAlign:"center",justifyContent:"center"}}>
      <Image style={{
    height: 20,
    width:20,marginRight:6}} source={{uri:'https://www.freeiconspng.com/uploads/filter-icon-0.png'}}/>
          <Text style={{fontSize:18,textAlign:"center",justifyContent:"center",color:"black"}}>Filter</Text>
        </TouchableOpacity>
        </Header>
        <FlatList
          style={{flex:1}}
          data={this.state.Data}
          renderItem={({ item }) => <Item item={item} navigation={this.state.navigation}/>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  listItem:{
    margin:5,
    padding:10,
    backgroundColor:"#FFF",
    width:"100%",
    flex:1,
    alignSelf:"center",
    flexDirection:"row",
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
    flex: 1,
    paddingTop: 10,
    backgroundColor:"white",
  },
  Main: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 30,
    backgroundColor:"black",
    position: "relative",
    height:"100%",
    width:"100%",
  },
  imageThumbnail: {
    alignItems: 'center',
    height: 200,
    width:175,
    marginTop:-20,
    position:"relative"
  },
   Logo: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width:50,
    borderRadius:100,
    marginLeft:10,
    marginTop:6,
  },
    Thumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: "100%",
    width:"100%",
  },
  stretch: {
    width: '100%',
    height: '50%',
    resizeMode: 'stretch'
  },
});