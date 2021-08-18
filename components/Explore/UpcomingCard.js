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
import 'react-native-gesture-handler';
import Star from 'react-native-star-view';
import {Upcoming} from '../../Upcoming';

const {width, height} = Dimensions.get('window');

export const UpcomingCard = (props) => {
  return (
    <View>
      <TouchableOpacity style={styles.mainView}>
        <View style={{flex: 2}}>
          <Image
            source={{uri: props.imageUri}}
            style={{
              flex: 1,
              width: 150,
              height: 220,
              resizeMode: 'cover',
              borderTopLeftRadius: 6,
              borderBottomLeftRadius: 6,
              justifyContent: 'flex-start',
            }}
          />
        </View>
        <View style={styles.wrapperItems}>
          <Text style={styles.mName}>{props.name}</Text>
          <View style={{flexDirection: 'row', marginLeft: 14, marginTop: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: 16, color: 'white'}}>
              Releasing on:{' '}
            </Text>
            <Text style={styles.createdOn}>{props.releasing[2] + "/" + props.releasing[1] + "/" + props.releasing[0]}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    height: 200,
    width: width - 40,
    backgroundColor: '#333333',
    borderRadius: 6,
    alignSelf: 'center',
    marginTop: 25,
  },
  wrapperItemsDesc: {
    justifyContent: 'space-between',
  },
  wrapperItems: {
    width: width - 200,
  },
  mName: {
    fontWeight: 'bold',
    fontSize: 21,
    marginLeft: 14,
    marginTop: 46,
    color: 'white'
  },
  createdOn: {
    marginTop: 3,
    color: 'white'
  },
});

export default UpcomingCard;
