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
  Modal,
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
import axios from 'axios';

import YoutubePlayer from 'react-native-youtube-iframe';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReadMore from 'react-native-read-more-text';

const {width, height} = Dimensions.get('window');

export const TVCardBig = (props) => {
  const [movieInfo, setMovieInfo] = useState(false);
  const [genres, setGenres] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [country, setCountry] = useState([]);
  const [year, setYear] = useState([]);
  const [lang, setLang] = useState([]);
  const [tag, setTag] = useState([]);
  const [vidKey, setKey] = useState([]);
  const [overview, setOverview] = useState([]);
  const [lastAir, setLastAir] = useState([]);
  const [nextAir, setNextAir] = useState([]);
  const [inProduction, setProduction] = useState([]);
  const [lengthEpisodes, setLength] = useState([]);

  const [createdBy, setCreatedBy] = useState([]);

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

          console.log(props.id);

          const getTVData = await axios.post(
            'http://143.110.173.215:2005/api/tvID',
            {
              mid: props.id,
            },
          );
          setGenres(
            getTVData.data[0].genres.map((g) => ({
              name: g.name,
            })),
          );
          setCreatedBy(
            getTVData.data[0].created_by.map((c) => ({
              name: c.name,
            })),
          );
          setSeasons(getTVData.data[0].seasons.length);
          if (getTVData.data[0].production_countries[0] !== undefined)
            setCountry(getTVData.data[0].production_countries[0].iso_3166_1);
          else setCountry('N/A');
          setYear(getTVData.data[0].first_air_date.split('-'));
          setLang(getTVData.data[0].spoken_languages[0].english_name);
          setTag(getTVData.data[0].tagline);
          setKey(getTVData.data[1].results[0].key);
          setOverview(getTVData.data[0].overview);
          setLastAir(getTVData.data[0].last_air_date.split('-'));
          setNextAir(getTVData.data[0].next_episode_to_air.air_date.split('-'));
          setLength(getTVData.data[0].episode_run_time);

          const ifBookmarked = await axios.post(
            'http://143.110.173.215:3000/api/checkBookmarkTV',
            {
              uid: uid,
              tvid: props.id,
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
          <View style={styles.wrapperInfo}>
            <Star score={props.score} style={styles.starStyle} size={10} />
            <Text
              style={{
                paddingLeft: 12,
                fontWeight: 'bold',
                color: '#F7AA36',
                fontSize: 16,
              }}>
              {props.score}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginLeft: 14, marginTop: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: 17, color: 'white'}}>
              Released on:{' '}
            </Text>
            <Text style={styles.createdOn}>
              {' '}
              {props.released[2] +
                '/' +
                props.released[1] +
                '/' +
                props.released[0]}
            </Text>
          </View>
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
                    <Text style={{color: 'white'}}>Seasons</Text>
                  </View>
                  <View>
                    <Text style={{color: 'white'}}>{seasons}</Text>
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
                      {overview}
                    </Text>
                  </ReadMore>
                </View>
              </View>
              <View style={styles.wrapperMoreInfo}>
                <View style={styles.airDates}>
                  <View style={styles.wrapperLast}>
                    <Image
                      source={require('../../images/calendar.png')}
                      style={styles.imageCal}
                    />
                    <Text style={styles.textDates}>Last episode:</Text>
                    <Text style={styles.dates}>
                      {lastAir[2] + '/' + lastAir[1] + '/' + lastAir[0]}
                    </Text>
                  </View>
                  <View style={styles.wrapperLast}>
                    <Image
                      source={require('../../images/calendar.png')}
                      style={styles.imageCal}
                    />
                    <Text style={styles.textDates}>Next episode:</Text>
                    <Text style={styles.dates}>
                      {nextAir[2] + '/' + nextAir[1] + '/' + nextAir[0]}
                    </Text>
                  </View>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <View style={styles.wrapperLast}>
                    <Image
                      source={require('../../images/clock.png')}
                      style={styles.imageCal}
                    />
                    <Text style={styles.textDates}>Length of episodes: </Text>
                    <Text style={styles.lengthText}>
                      {lengthEpisodes + 'm'}
                    </Text>
                  </View>
                </View>
                <View style={styles.wrapperBy}>
                  <Text style={{color: 'white'}}>Created by: </Text>
                  {createdBy.map((cr) => (
                    <Text style={{color: 'white'}}>{cr.name}</Text>
                  ))}
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
            </LinearGradient>
          </View>
        </ScrollView>
      </Modal>
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
    marginTop: 22,
  },
  wrapperItemsDesc: {
    justifyContent: 'space-between',
  },
  wrapperItems: {
    width: width - 200,
  },
  mButton: {
    backgroundColor: '#1a8fe8',
    width: width - 200,
    height: 34,
    marginBottom: 20,
    borderRadius: 2,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  mButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  mName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 14,
    marginTop: 46,
    color: 'white',
  },
  mDescription: {
    marginLeft: 14,
    marginTop: 7,
  },
  wrapperMainItems: {
    alignSelf: 'flex-end',
  },
  starStyle: {
    height: 20,
    width: 110,
  },
  wrapperInfo: {
    flexDirection: 'row',
    marginLeft: 14,
    marginTop: 10,
  },
  createdOn: {
    marginTop: 3,
    color: 'white',
  },
  imageInfo: {
    width: 190,
    height: 290,
    borderRadius: 20,
    color: 'white',
  },
  textInfo: {
    alignSelf: 'flex-start',
    fontSize: 28,
    fontWeight: '700',
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
    color: 'white',
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
    left: 360,
  },
  bookmarkerImage: {
    width: 20,
    height: 30,
  },
  airDates: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperLast: {
    backgroundColor: '#333',
    flexDirection: 'row',
    height: 44,
    width: 230,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 16,
  },
  textDates: {
    color: 'white',
    marginLeft: 14,
    marginRight: 6,
    fontSize: 14,
  },
  dates: {
    color: 'white',
    fontSize: 14,
  },
  lengthText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  imageCal: {
    width: 20,
    height: 20,
  },
});

export default TVCardBig;
