// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import 'react-native-gesture-handler';

import * as React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import FirstPage from './screen/index.js';
import Cart from './screen/cart.js';
import Search from './screen/search.js';
import Product from './screen/product.js';
import LProduct from './screen/listproduct.js';
import ProductView from './screen/productView.js';
import Buy from './screen/buy.js';
import Order from './screen/Payment.js';
import Login from './pages/login.js';
import Orderx from './screen/order.js';
import Cat from './screen/cat.js';
import Bick from './screen/bick.js';
import Logout from './screen/Logout.js';
import Not from './screen/not.js';
// Import Custom Sidebar
import {
  Icon,
} from 'native-base';
import CustomSidebarMenu from './CustomSidebarMenu';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={toggleDrawer}>
        {/*Donute Button Image */}
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          style={{ width: 25, height: 25, marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
};

function firstScreenStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Test">
      <Stack.Screen
      options={{headerShown: false}}
        name="FirstPage"
        component={FirstPage}
      />
      <Stack.Screen
        name="My Orders"
        component={Orderx}
      />
      
      <Stack.Screen
        options={{headerShown: false}}
        name="Not"
        component={Not}
      />
        <Stack.Screen
      options={{headerShown: false}}
        name="Logout"
        component={Logout}
      />
      <Stack.Screen
      options={{headerShown: false}}
        name="Vehicles On Rent"
        component={Bick}
      />

      <Stack.Screen
      options={{headerShown: false}}
        name="All Catrgories"
        component={Cat}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
      />

<Stack.Screen
options={{headerShown: false}}
        name="Login"
        component={Login}
      />
      <Stack.Screen
      options={{headerShown: false}}
        name="Order"
        component={Order}
      />
      <Stack.Screen
      options={{headerShown: false}}
        name="Search"
        component={Search}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Product"
        component={Product}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="LProduct"
        component={LProduct}
      />
      <Stack.Screen
        name="Buy"
        component={Buy}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="productView"
        component={ProductView}
      />
    </Stack.Navigator>
  );
}

function App() {

  return (
    <NavigationContainer>
      <Drawer.Navigator
      options={{headerShown: false}}
        drawerContentOptions={{
          activeTintColor: '#f66262',
          itemStyle: { marginVertical: 5 },
          headerShown:'false'
        }}
        drawerContent={(props) => <CustomSidebarMenu {...props} />}>
        <Drawer.Screen
          name="FirstPage"

          navigationOptions= {{
                    header:false
              }}
          options={{ drawerLabel: 'Home',headerShown: false,drawerIcon: ({focused, size}) => (
            <Icon
              name="md-home"
              size={size}
              style={{color:"#f66262"}}
              color={focused ? '#f66262' : '#f66262'}
            />
          ), }}
          component={firstScreenStack}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
