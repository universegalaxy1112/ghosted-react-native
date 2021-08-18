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

import Category from './components/Explore/Category';
import BigMovie from './components/Explore/BigMovie';

//import {DrawerNavigation} from './Main';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SlidingUpPanel from 'rn-sliding-up-panel';
import {UpcomingCard} from './components/Explore/UpcomingCard';
import SearchCard from './components/Explore/SearchCard';

const {width, height} = Dimensions.get('window');

export const Upcoming = (props) => {
  const date = new Date();
  const [upcoming, setComing] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const searchThis = 'searchMovies';

  useEffect(() => {
    fetchDataUpcoming = async () => {
      try {
        const upcomingResponse = await axios.post(
          'http://143.110.173.215:2005/api/upcoming',
        );
        setComing(
          upcomingResponse.data.results.map((n) => ({
            id: n.id,
            title: n.title,
            rating: n.vote_average / 2,
            image: n.poster_path,
            releasing: n.release_date,
            overview: n.overview,
          })),
        );
      } catch (e) {
        console.log(e);
      }
    };
    fetchDataUpcoming();
  }, []);

  if (searchData.length == 0) {
    return (
      <View>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View
            style={{width: width, height: height, backgroundColor: '#1C1C1C'}}>
            <ScrollView>
              <View
                style={{width: width, justifyContent: 'center', marginTop: 35}}>
                <SearchCard
                  setSearch={setSearchData}
                  data={searchData}
                  routeTo={searchThis}
                />
              </View>
              <View style={styles.wrapperSectionText}>
                <View style={styles.line}></View>
                <Text style={styles.SectionText}>Upcoming Movies</Text>
              </View>
              {upcoming.map((movie) => (
                <UpcomingCard
                  imageUri={'https://image.tmdb.org/t/p/w500/' + movie.image}
                  name={movie.title}
                  releasing={movie.releasing.split("-")}
                  key={movie.title}
                />
              ))}
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
    );
  } else {
    return (
      <View>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View
            style={{
              width: width,
              height: height,
              backgroundColor: '#1c1c1c',
            }}>
            <ScrollView>
              <TouchableOpacity
                onPress={() => setSearchData([])}
                style={{
                  flexDirection: 'row',
                  marginLeft: 20,
                  marginTop: 40,
                  marginBottom: 7,
                }}>
                <Image
                  source={require('./images/left-arrowWhite.png')}
                  style={{width: 20, height: 20, marginRight: 10}}
                />
                <Text style={{color: '#fff', fontSize: 16}}>Back</Text>
              </TouchableOpacity>
              <View style={styles.containerText}>
                <View style={styles.line}></View>
                <Text style={styles.searchText}>Search Results for: </Text>
              </View>
              <ScrollView scrollEventThrottle={16}>
                {searchData.map((search) => (
                  <BigMovie
                    key={search.title}
                    name={search.title}
                    score={search.rating}
                    imageUri={'https://image.tmdb.org/t/p/w500/' + search.image}
                    released={search.released}
                  />
                ))}
              </ScrollView>
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  wrapperSectionText: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 30,
  },
  line: {
    width: 70,
    height: 6,
    backgroundColor: 'orange',
    marginTop: 14,
  },
  SectionText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 14,
    color: 'white'
  },
  containerText: {
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 20,
    color: '#333333',
  },
  searchText: {
    fontSize: 21,
    fontWeight: 'bold',
    marginLeft: 14,
    color: 'white'
  },
  searchInputText: {
    fontSize: 16,
    marginLeft: 4,
    marginTop: 4,
  },
});
