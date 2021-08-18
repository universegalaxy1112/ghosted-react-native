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
  Modal,
} from 'react-native';

import CheckBox from '@react-native-community/checkbox';

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
import axios from 'axios';

import YoutubePlayer from 'react-native-youtube-iframe';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReadMore from 'react-native-read-more-text';

const {width, height} = Dimensions.get('window');

export const Category = (props) => {
    const [movieInfo, setMovieInfo] = useState(false);
    const [genres, setGenres] = useState([]);
    const [runtime, setRuntime] = useState([]);
    const [country, setCountry] = useState([]);
    const [year, setYear] = useState([]);
    const [lang, setLang] = useState([]);
    const [tag, setTag] = useState([]);
    const [vidKey, setKey] = useState([]);

    const [cast, setCast] = useState([]);

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  
  _renderTruncatedFooter = (handlePress) => {
    return (
      <Text style={{color: '#548be3', marginTop: 5}} onPress={handlePress}>
        Read more
      </Text>
    );
  };

  _renderRevealedFooter = (handlePress) => {
    return (
      <Text style={{color: '#548be3', marginTop: 5}} onPress={handlePress}>
        Show less
      </Text>
    );
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.mainView}
        onPress={async () => {
          setMovieInfo(true);
          let uid = await AsyncStorage.getItem('id');
          uid = uid.toString();

          const getMovieData = await axios.post(
            'http://143.110.173.215:2005/api/movieID',
            {
              mid: props.id,
            },
          );

          // Info
          setGenres(
            getMovieData.data[0].genres.map((g) => ({
              name: g.name,
            })),
          );
          setRuntime(getMovieData.data[0].runtime);
          setCountry(getMovieData.data[0].production_countries[0].iso_3166_1);
          setYear(getMovieData.data[0].release_date.split('-'));
          setLang(getMovieData.data[0].spoken_languages[0].english_name);
          setTag(getMovieData.data[0].tagline);
          setKey(getMovieData.data[1].results[0].key);

          // Crew, Cast, Production
          setCast(
            getMovieData.data[2].cast.map((ca) => ({
              name: ca.name,
              pic: ca.profile_path,
            })),
          );

          const ifBookmarked = await axios.post(
            'http://143.110.173.215:3000/api/checkBookmark',
            {
              uid: uid,
              mid: props.id,
            },
          );

          if (ifBookmarked.data.booked == true) {
            setToggleCheckBox(false);
          } else if (ifBookmarked.data.booked == false) {
            setToggleCheckBox(true);
          }
        }}>
        <View style={{flex: 2}}>
          <Image
            source={{uri: props.imageUri}}
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: 'cover',
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
            }}
          />
        </View>
        <Text style={styles.mName}>{props.name}</Text>
        <View style={styles.wrapperInfo}>
          <Star score={props.score} style={styles.starStyle} size={10} />
          <Text
            style={{
              paddingLeft: 10,
              color: '#F7AA36',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            {props.score}
          </Text>
        </View>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={false} visible={movieInfo}>
        <ScrollView>
          <View style={styles.mainModalWrapper}>
            <View style={styles.imageInfoWrapper}>
              <Image source={{uri: props.imageUri}} style={styles.imageInfo} />
            </View>
            <View
              style={{
                position: 'absolute',
                width: width,
                paddingLeft: width - 60,
                paddingTop: 30,
                zIndex: 1000,
              }}>
              <TouchableOpacity onPress={() => setMovieInfo(false)}>
                <Image source={require('../../images/cancel.png')} />
              </TouchableOpacity>
            </View>
            <LinearGradient
              colors={['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0)']}
              start={{x: 1, y: 0.03}}
              end={{x: 1, y: 0}}
              style={{
                zIndex: 1000,
                marginTop: -height + 450,
              }}>
              <Text style={styles.textInfo}>{props.name}</Text>
              <Text style={styles.langInfo}>{'(' + lang + ')'}</Text>
              <Text style={styles.tagline}>{tag}</Text>
              <TouchableOpacity
                onPress={async () => {
                  setToggleCheckBox(!toggleCheckBox);
                  let uuid = await AsyncStorage.getItem('id');
                  const insertBookmark = await axios.post(
                    'http://143.110.173.215:3000/api/bookmarkedTV',
                    {
                      tvID: props.id,
                      uid: uuid,
                      bookmarked: toggleCheckBox,
                    },
                  );
                }}
                style={styles.bookmarker}>
                {toggleCheckBox == true ? (
                  <Image
                    style={styles.bookmarkerImage}
                    source={require('../../images/bookmark-empty.png')}
                  />
                ) : (
                  <Image
                    style={styles.bookmarkerImage}
                    source={require('../../images/bookmark-full.png')}
                  />
                )}
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingTop: 17,
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                    width: width - 100,
                  }}>
                  {genres.map((gen) => (
                    <View style={styles.boxGenre}>
                      <Text style={{color: 'white'}}>{gen.name}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 16,
                }}>
                <Star score={props.score} size={20} />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <View style={{marginRight: 20, alignItems: 'center'}}>
                  <View>
                    <Text style={{color: 'white'}}>Year</Text>
                  </View>
                  <View>
                    <Text style={{color: 'white'}}>{year[0]}</Text>
                  </View>
                </View>
                <View style={{marginRight: 20, alignItems: 'center'}}>
                  <View>
                    <Text style={{color: 'white'}}>Length</Text>
                  </View>
                  <View>
                    <Text style={{color: 'white'}}>
                      {Math.trunc(runtime / 60) + 'h ' + (runtime % 60) + 'm'}
                    </Text>
                  </View>
                </View>
                <View style={{alignItems: 'center'}}>
                  <View>
                    <Text style={{color: 'white'}}>Country</Text>
                  </View>
                  <View>
                    <Text style={{color: 'white'}}>{country}</Text>
                  </View>
                </View>
              </View>
              <View>
                <View
                  style={{
                    width: width - 100,
                    alignSelf: 'center',
                    marginTop: 35,
                    marginBottom: 7,
                  }}>
                  <Text
                    style={{fontWeight: '700', fontSize: 22, color: 'white'}}>
                    Overview
                  </Text>
                </View>
                <View
                  style={{
                    width: width - 100,
                    alignSelf: 'center',
                    marginBottom: 25,
                  }}>
                  <ReadMore
                    numberOfLines={3}
                    renderTruncatedFooter={_renderTruncatedFooter}
                    renderRevealedFooter={_renderRevealedFooter}>
                    <Text style={{letterSpacing: 0.3, color: 'white'}}>
                      {props.desc}
                    </Text>
                  </ReadMore>
                </View>
              </View>
              <View style={styles.playerWrapper}>
                <YoutubePlayer
                  height={300}
                  width={400}
                  videoId={vidKey}
                  play={false}
                  onPlaybackQualityChange={(q) => console.log(q)}
                  volume={10000}
                  playbackRate={1}
                  style={styles.ytPlayer}
                />
              </View>
              <View style={styles.wrapperCast}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 26,
                    fontWeight: 'bold',
                    marginLeft: 40,
                    marginBottom: 15,
                  }}>
                  Cast
                </Text>
                <ScrollView
                  horizontal={true}
                  style={{
                    marginLeft: 20,
                    marginBottom: 20,
                    height: 80,
                  }}
                  contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {cast.map((cas) =>
                    cas.pic != null ? (
                      <TouchableOpacity onPress={() => console.log(cas.id)}>
                        <Image
                          source={{
                            uri: 'https://image.tmdb.org/t/p/w200/' + cas.pic,
                          }}
                          style={styles.profilePic}
                        />
                      </TouchableOpacity>
                    ) : (
                      <View></View>
                    ),
                  )}
                </ScrollView>
              </View>
            </LinearGradient>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#333333',
    height: 220,
    width: 150,
    marginLeft: 20,
    borderRadius: 8,
  },
  mName: {
    marginBottom: 0,
    paddingBottom: 0,
    paddingLeft: 10,
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  mDescription: {
    paddingLeft: 10,
    fontSize: 12,
    marginBottom: 12,
  },
  starStyle: {
    width: 100,
    height: 20,
    marginBottom: 10,
    marginLeft: 10,
  },
  wrapperInfo: {
    flexDirection: 'row',
  },
  imageInfo: {
    width: 190,
    height: 290,
    borderRadius: 20,
  },
  textInfo: {
    alignSelf: 'flex-start',
    fontSize: 28,
    fontWeight: '700',
    marginTop: -15,
    marginLeft: 20,
    color: 'white',
    textShadowColor: '#000',
    textShadowOffset: {width: 0.5, height: 0.5},
    textShadowRadius: 1,
    color: 'white',
  },
  langInfo: {
    alignSelf: 'flex-start',
    fontSize: 20,
    marginLeft: 20,
    color: '#fff',
  },
  tagline: {
    alignSelf: 'center',
    fontSize: 16,
    marginTop: 12,
    color: 'white',
  },
  boxGenre: {
    backgroundColor: '#333',
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: 18,
    marginRight: 10,
    marginBottom: 18,
    color: 'white',
  },
  imageInfoWrapper: {
    width: width,
    alignContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  imageInfo: {
    width: width,
    height: height,
    marginTop: -55,
  },
  playerWrapper: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  bookmarker: {
    width: 50,
    height: 50,
    top: -25,
    left: width - 40,
  },
  bookmarkerImage: {
    width: 20,
    height: 30,
  },
  profilePic: {
    width: 70,
    height: 70,
    marginLeft: 18,
    borderRadius: 60,
  },
  wrapperCast: {
    marginTop: -55,
  },
});

export default Category;
