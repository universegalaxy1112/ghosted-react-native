import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState} from 'react';
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
  Switch,
} from 'react-native';

import 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

export const WatchlistCard = (props) => {
    let stats;
    if (props.watched == 1) {
        stats = true;
    } else {
        stats = false;
    }
    const [statusOf, setStatus] = useState(stats);
    return (
    <View>
      <View style={styles.wrapper}>
        <View style={styles.wrapperImage}>
          <Image
            source={{uri: 'https://image.tmdb.org/t/p/w200' + props.image}}
            style={styles.image}
          />
        </View>
        <View style={styles.wrapperInfo}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.tagline}>{props.tag}</Text>
          <View style={styles.wrapperRating}>
            <Text style={styles.ratingText}>{props.rating}</Text>
            <Image
              source={require('../../images/star.png')}
              style={styles.starImage}
            />
            <Text style={styles.amountRatedText}>
              {'(' + props.amountRated + ' reviews)'}
            </Text>
          </View>
          <View style={{marginTop: 24}}>
            <View style={styles.wrapperStatus}>
              <Text style={styles.infoText}>Status:</Text>
              <Text style={styles.infoTextSecondary}>
                {props.status}
              </Text>
            </View>
            <View style={styles.wrapperLength}>
              <Text style={styles.infoText}>Length:</Text>
              <Text style={styles.infoTextSecondary}>
                {Math.trunc(props.time / 60) + 'h ' + (props.time % 60) + 'm'}
              </Text>
            </View>
            <View style={styles.wrapperWatched}>
              <Text style={styles.infoText}>Watched:</Text>
              <Switch
                trackColor={{false: '#474747', true: '#F7AA36'}}
                thumbColor={statusOf ? '#474747' : '#FFFFFF'}
                onValueChange={(val) => {
                  setStatus(val);
                  const statusFunc = async () => {
                    await axios.post(
                      'http://143.110.173.215:3000/api/updateStatus',
                      {
                          statusInfo: val,
                          uid: await AsyncStorage.getItem('id'),
                          bid: props.id
                      },
                    );
                  };
                  statusFunc();
                }}
                value={statusOf}
                style={{transform: [{scaleX: 1.15}, {scaleY: 1.15}]}}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  leftSide: {
    height: 205,
    width: (width - 40) / 2,
    backgroundColor: 'red',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  rightSide: {
    height: 205,
    width: (width - 40) / 2,
    backgroundColor: 'green',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  wrapper: {
    backgroundColor: '#333333',
    width: width - 40,
    height: 205,
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: 14,
  },
  wrapperImage: {
    justifyContent: 'center',
    marginLeft: 16,
  },
  image: {
    width: 117,
    height: 179,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  tagline: {
    fontSize: 12,
    fontWeight: '100',
    color: '#BBBBBB',
    marginBottom: 12,
  },
  wrapperInfo: {
    justifyContent: 'center',
    alignContent: 'center',
    marginLeft: 20,
  },
  wrapperRating: {
    flexDirection: 'row',
  },
  ratingText: {
    color: '#F7AA36',
    fontWeight: 'bold',
    fontSize: 16,
  },
  amountRatedText: {
    color: '#BBBBBB',
    marginLeft: 7,
  },
  starImage: {
    height: 20,
    width: 20,
    marginLeft: 2,
  },
  wrapperStatus: {
    flexDirection: 'row',
  },
  wrapperLength: {
    flexDirection: 'row',
  },
  wrapperWatched: {
    flexDirection: 'row',
    marginTop: 5,
  },
  infoText: {
    color: '#BBBBBB',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 14,
  },
  infoTextSecondary: {
    color: '#BBBBBB',
    fontSize: 16,
  },
});

export default WatchlistCard;
