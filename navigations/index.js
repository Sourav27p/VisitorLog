import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../Screens/Home';
import test from '../test';
import VisitorLog from '../Screens/VisitorLog';
import LatestNews from '../Screens/LatestNews';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const index = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator headerMode="none">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Logs" component={VisitorLog} />
        <Drawer.Screen name="Latest News" component={LatestNews} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default index;
