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

import {withSafeAreaInsets} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SlidingUpPanel from 'rn-sliding-up-panel';
import SearchCard from './components/Explore/SearchCard';

const {width, height} = Dimensions.get('window');

export const Home = (props) => {
  const date = new Date();
  const [movies, setMovies] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [newMovies, setNewMovies] = useState([]);
  const searchThis = 'searchMovies';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'http://143.110.173.215:2005/api/popMovies',
        );
        setMovies(
          response.data.results.map((m) => ({
            id: m.id,
            title: m.title,
            rating: m.vote_average / 2,
            image: m.poster_path,
            genre: m.genre_ids,
            overview: m.overview,
          })),
        );
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchDataNew = async () => {
      try {
        const responseNew = await axios.post(
          'http://143.110.173.215:2005/api/newMovies',
        );
        setNewMovies(
          responseNew.data.results.map((n) => ({
            id: n.id,
            title: n.title,
            rating: n.vote_average / 2,
            image: n.poster_path,
            released: n.release_date,
            overview: n.overview,
            genre: n.genre_ids,
            overview: n.overview,
          })),
        );
      } catch (e) {
        console.log(e);
      }
    };
    fetchDataNew();
  }, []);

  if (searchData.length == 0) {
    return (
      <View>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView>
            <ScrollView scrollEventThrottle={16}>
              <View
                style={{flex: 1, backgroundColor: '#1C1C1C', paddingTop: 20}}>
                <SearchCard
                  setSearch={setSearchData}
                  data={searchData}
                  routeTo={searchThis}
                />
                <View style={styles.containerText}>
                  <View style={styles.line}></View>
                  <Text style={styles.featuredText}>Featured</Text>
                </View>
                <View style={{height: 220, marginTop: 20}}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {movies.map((movie) => (
                      <Category
                        name={movie.title}
                        score={movie.rating}
                        imageUri={
                          'https://image.tmdb.org/t/p/w500/' + movie.image
                        }
                        key={movie.title}
                        genre={movie.genre}
                        desc={movie.overview}
                        id={movie.id}
                      />
                    ))}
                  </ScrollView>
                </View>
              </View>
            </ScrollView>
            <ScrollView scrollEventThrottle={16}>
              <View
                style={{flex: 1, backgroundColor: '#1C1C1C', paddingTop: 20}}>
                <View style={styles.containerTextSecond}>
                  <View style={styles.line}></View>
                  <Text style={styles.newReleasesText}>Now Playing</Text>
                </View>
                {newMovies.map((movie) => (
                  <BigMovie
                    name={movie.title}
                    score={movie.rating}
                    imageUri={'https://image.tmdb.org/t/p/w500/' + movie.image}
                    key={movie.id}
                    id={movie.id}
                    released={movie.released.split('-')}
                    overview={movie.overview}
                    genre={movie.genre}
                    desc={movie.overview}
                  />
                ))}
              </View>
            </ScrollView>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  } else {
    return (
      <View>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{height: height, backgroundColor: '#1C1C1C'}}>
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
                <Text
                  style={{
                    fontSize: 16,
                    marginLeft: 4,
                    marginTop: 4,
                    color: 'white',
                  }}>
                </Text>
              </View>
              <ScrollView scrollEventThrottle={16}>
                {searchData.map((search) => (
                  <BigMovie
                    name={search.title}
                    score={search.rating}
                    imageUri={'https://image.tmdb.org/t/p/w500/' + search.image}
                    released={search.released}
                    key={search.title}
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
  searchInputText: {
    fontSize: 16,
    marginLeft: 4,
    marginTop: 4,
  },
  containerText: {
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 20,
    color: '#333333',
  },
  containerTextSecond: {
    flexDirection: 'row',
    marginTop: 24,
    marginLeft: 20,
    color: '#333333',
  },
  line: {
    width: 70,
    height: 6,
    backgroundColor: '#F7AA36',
    marginTop: 14,
  },
  featuredText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 14,
    color: 'white',
  },
  searchText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 14,
    color: 'white',
  },
  newReleasesText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 14,
    color: 'white',
  },
  icon: {
    backgroundColor: '#e1e6e2',
    borderRadius: 90,
    width: 45,
    height: 45,
    marginTop: 24,
    marginRight: 23,
    alignSelf: 'flex-end',
    zIndex: 1000,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    height: height,
  },
  closePanel: {
    alignSelf: 'flex-end',
    marginRight: 30,
    marginTop: 25,
  },
  mainFieldBox: {
    flexDirection: 'row',
    width: width - 120,
    height: 40,
    borderColor: '#333',
    borderWidth: 2,
    backgroundColor: '#e1e6e2',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 20,
  },
  editIcon: {
    marginRight: 13,
  },
  imageEdit: {
    height: 20,
    width: 20,
  },
  inputName: {
    paddingLeft: 10,
  },
  wrapperFields: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  wrapperInfo: {
    flexDirection: 'row',
    marginTop: 22,
    marginBottom: 15,
    justifyContent: 'center',
  },
  wrapperInfoInfo: {
    marginLeft: 34,
  },
  wrapperInfoName: {
    fontWeight: 'bold',
    fontSize: 17,
  },
});
