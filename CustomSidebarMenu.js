import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
} from 'react-native';
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
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const CustomSidebarMenu = (props) => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/*Top Large Image */}
      <Image
        source={require('./assets/drower.png')}
        style={styles.sideMenuProfileIcon}
      />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <View style={{flexDirection:"row",width:300,borderTopWidth:1,borderColor:"#ccccccbd",}}>
        <Icon style={{padding: 16,
        flexDirection: 'row',
        alignItems: 'center',marginRight:-20,color:"#f66262"}} name="ios-apps" color="white"/>
          <DrawerItem  
          style={{width:300}}  
          label="All Categories"
          onPress={() => props.navigation.navigate("All Catrgories")}
        />
        </View>



<View style={{flexDirection:"row",width:300}}>
        <Icon style={{padding: 16,
    flexDirection: 'row',
    alignItems: 'center',marginRight:-20,color:"#f66262"}} name="ios-call" color="white"/>
        <DrawerItem  
          style={{width:300}}  
          label="Direct Order"
          onPress={() => Linking.openURL(`tel:9649215382`)}
        />

        </View>


        <View style={{flexDirection:"row",width:300}}>
        <Icon style={{padding: 16,
    flexDirection: 'row',
    alignItems: 'center',marginRight:-20,color:"#f66262"}} name="ios-car" color="white"/>
        <DrawerItem  
          style={{width:300}}  
          label="Rent Vehicles"
          onPress={() => props.navigation.navigate("Vehicles On Rent")}
        />

        </View>
        
        <View style={{flexDirection:"row",width:300,borderTopWidth:1,borderColor:"#ccccccbd",}}>
        <Icon style={{padding: 16,
    flexDirection: 'row',
    alignItems: 'center',marginRight:-20,color:"#f66262"}} name="basket" color="white"/>
        <DrawerItem  
          style={{width:300}}
          label="My Orders"
          onPress={() => props.navigation.navigate("My Orders")}
        />

        </View>
        
        <View style={{flexDirection:"row",width:300}}>
        <Icon style={{padding: 16,
    flexDirection: 'row',
    alignItems: 'center',marginRight:-20,color:"#f66262"}} name="ios-cart" color="white"/>
        <DrawerItem  
          style={{width:300}}
          label="My Cart"
          onPress={() => props.navigation.navigate("Cart",{Cid:1234})}
        />

        </View>
        
        <View style={{flexDirection:"row",width:300}}>
        <Icon style={{padding: 16,
    flexDirection: 'row',
    alignItems: 'center',marginRight:-20,color:"#f66262"}} name="ios-person" color="white"/>
        <DrawerItem  
          style={{width:300}}
          label="My Account"
          onPress={() => alert("Sorry Your Account not Working.")}
        />

        </View>
        
        <View style={{flexDirection:"row",width:300}}>
        <Icon style={{padding: 16,
    flexDirection: 'row',
    alignItems: 'center',marginRight:-20,color:"#f66262"}} name="cash" color="white"/>
        <DrawerItem  
          style={{width:300}}
          label="My Coupons"
          onPress={() => alert("Coupons are not Available")}
        />

        </View>
                <View style={{flexDirection:"row",width:300}}>
        <Icon style={{padding: 16,
    flexDirection: 'row',
    alignItems: 'center',marginRight:-20,color:"#f66262"}} name="exit" color="white"/>
        <DrawerItem  
          style={{width:300}}
          label="Logout"
          onPress={() => props.navigation.navigate("Logout")}
        />

        </View>
        <View style={{flexDirection:"row",width:300,borderTopWidth:1,borderColor:"#ccccccbd",}}>

        <DrawerItem  
          style={{width:300}}
          label="Notification Preferences"
          onPress={() => Linking.openURL('http://www.mandawamart.com/MMart/Notification.php')}
        />

        </View>
        
        <View style={{flexDirection:"row",width:300}}>
        <DrawerItem  
          style={{width:300}}
          label="Help Center"
          onPress={() => Linking.openURL('http://www.mandawamart.com/MMart/help.php')}
        />

        </View>
        
        <View style={{flexDirection:"row",width:300}}>
        <DrawerItem  
          style={{width:300}}
          label="Privacy Policy"
          onPress={() => Linking.openURL('http://www.mandawamart.com/MMart/policy.php')}
        />

        </View>
        
        <View style={{flexDirection:"row",width:300}}>
        <DrawerItem  
          style={{width:300}}
          label="Legal"
          onPress={() => Linking.openURL('http://www.mandawamart.com/MMart/Terms.php')}
        />
        </View>
      </DrawerContentScrollView>
      <Text style={{ fontSize: 16, textAlign: 'center', color: 'grey' }}>
        www.mandawamart.com
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    width: "100%",
    height: 150,
    alignSelf: 'center',
    backgroundColor: '#f66262',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomSidebarMenu;
