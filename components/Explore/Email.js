import React, {useState, useEffect} from 'react';
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

import 'react-native-gesture-handler';

import SignIn from '../../SignIn';
import Home from '../../Home';

export const SearchCard = (props) => {
  const [email, setEmail] = useState([]);

  return (
    <View>
      <SignIn email={setEmail} />
      <Home email={email} />
    </View>
  );
};

export default SearchCard;
