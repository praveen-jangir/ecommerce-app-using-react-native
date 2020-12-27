// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,Image,TouchableOpacity
} from 'react-native';
import {
  Container,
    Header,
  Content,
  Left,
  Right,
  Body,
  Item,
  Icon,
  ListItem,
  Thumbnail,
  Input,
  Footer,
} from 'native-base';

import firebase from '../pages/firebase.js';
const db = firebase.firestore();
const searchx=[];
const App = ({route,navigation}) => {
/*  const { Search } = route.params;
*/  const [search, setSearch] = useState('');
  const [Status, setStatus] = useState(1);
  const user = firebase.auth().currentUser;
  const navigationx=navigation;
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);


    db.collection('track')
               .where('Uid', '==',user.uid)
               .where('Status', '==',0)
               .get()
               .then(querySnapshot => {
                  querySnapshot.forEach(documentSnapshot => {
                        if (documentSnapshot.data().Status==0) {
                        setStatus(0);
                        }else
                        {
                          setStatus(1);
                        }
                            });
                });
const Update=(x,y)=>{
  navigation.navigate("productView",{Pid:x,Fimage:y});
}
  useEffect(() => {
    db.collection('Product')
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(documentSnapshot => {
                        console.log(documentSnapshot.data());
                        setMasterDataSource(documentSnapshot.data());
                        searchx.push(documentSnapshot.data());
                            });
                });
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = searchx.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(searchx);
      setSearch(text);
    }
  };
const SampleFunction=()=>{

      navigation.navigate("Order");

  }
  const ItemView = ({ item }) => {
    return (
      <View style={styles.itemStyle} onPress={() => getItem(item)}>
      <Image style={styles.Logo} source={{uri: item.Fimage}}/>
      <Text style={{fontSize:16,color:"black",width:265, alignItems: "center",marginTop:20}}>{item.title.slice(0, 34)}</Text>
      <Icon style={{marginTop:17,marginLeft:0,marginRight:10}} name="ios-search"/>
      </View>
    );
  };
const ItemList = ({ item }) => {
    return (
    <TouchableOpacity onPress={() => Update(item.pId,item.Fimage)}>
      <View style={styles.itemStyle} onPress={() => getItem(item)}>
      <Image style={styles.Logo} source={{uri: item.Fimage}}/>
      <Text style={{fontSize:16,color:"black",width:265, alignItems: "center",marginTop:20,marginLeft:10}}>{item.title.slice(0, 34)}</Text>
      <Icon style={{marginTop:17,marginLeft:-15,marginRight:10}} name="ios-search"/>
      </View>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };

  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:"white" }}>
      <View style={styles.container}>
        <Item style={{borderBottomWidth:1}}>
            <Icon style={{marginLeft:15}} name="ios-search"/>
            <Input
            style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search For Products, Brands and More"
            />
        </Item>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemList}
        />
      </View>

{Status == 0?
            <TouchableOpacity activeOpacity={0.5} onPress={SampleFunction} style={styles.TouchableOpacityStyle} >

          <Image source={{uri : 'https://mandawamart.com/admin/map.png'}} 
          
                 style={styles.FloatingButtonStyle} />
       
        </TouchableOpacity>:null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:6,
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
    flexDirection:"row"
  },
  textInputStyle: {
    height: 40,
    paddingLeft: 10,
    margin: 5,
    backgroundColor: '#FFFFFF',
  },
   Logo: {
    height: 50,
    width:50,
    marginLeft:0,
    marginTop:6,
  },

  TouchableOpacityStyle:{

    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    left: 20,
    top: 140,
  },

  FloatingButtonStyle: {

    resizeMode: 'contain',
    width: 100,
    height: 100,
  }
});

export default App;
