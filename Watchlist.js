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

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import axios from 'axios';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import 'react-native-gesture-handler';

//import {DrawerNavigation} from './Main';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {WatchlistCard} from './components/Explore/WatchlistCard';

const {width, height} = Dimensions.get('window');

export const Watchlist = (props) => {
  const [watchlistData, setWatchlistData] = useState([]);

  useEffect(() => {
    const fetchDataPopS = async () => {
      try {
        const responseWatchlist = await axios.post(
          'http://143.110.173.215:3000/api/watchlist',
          {
            uid: await AsyncStorage.getItem('id'),
          },
        );

        setWatchlistData(
          responseWatchlist.data.map((g) => ({
            name: g[0].original_title,
            runtime: g[0].runtime,
            pic: g[0].poster_path,
            date: g[0].release_date,
            status: g[0].status,
            stars: g[0].vote_average,
            tagline: g[0].tagline,
            voteCount: g[0].vote_count,
            id: g[0].id,
            watched: g[1],
          })),
        );
      } catch (e) {
        console.log(e);
      }
    };
    fetchDataPopS();
  }, []);

  return (
    <View>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{height: height, backgroundColor: '#1C1C1C'}}>
        <ScrollView>
          <Text style={styles.textWatch}>Watchlist</Text>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            {watchlistData.map((w) => (
              <WatchlistCard
                image={w.pic}
                title={w.name}
                tag={w.tagline}
                rating={w.stars / 2}
                amountRated={w.voteCount}
                status={w.status}
                year={w.date.split('-')}
                time={w.runtime}
                key={w.id}
                id={w.id}
                watched={w.watched}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  textWatch: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
    marginLeft: 20,
    marginBottom: 10,
  },
});
