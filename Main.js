import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Button,
  Image,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import 'react-native-gesture-handler';

import { Home } from './Home';
import {signIn} from './SignIn'

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
  return (
    <View>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={signIn} />
      </Drawer.Navigator>
    </View>
  );
};
