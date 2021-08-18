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

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Star from 'react-native-star-view';
import axios from 'axios';

import TVShows from '../../TVShows'
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

export const SearchCard = (props) => {
  const [searchInput, setSearchInput] = useState({value: ''});

  return (
    <View style={{width: width, alignItems: 'center'}}>
      <View style={styles.wrapperSearch}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
            style={styles.textSearch}
            value={searchInput.value}
            onChangeText={(text) => setSearchInput({value: text})}
            currentlyFocusedInput={true}
            placeholder="Search..."
            placeholderTextColor='white'
            disabled
          />
          <TouchableOpacity
            onPress={async () => {
              if (props.routeTo == "searchMovies") {
                const searchRes = await axios.post(
                  'http://143.110.173.215:2005/api/' + props.routeTo,
                  {
                    searchData: searchInput.value,
                  },
                );

                props.setSearch(
                  searchRes.data.results.map((n) => ({
                    id: n.id,
                    title: n.title,
                    rating: n.vote_average / 2,
                    image: n.poster_path,
                    released: n.release_date.split("-"),
                  })),
                );
                setSearchInput({ value: '' });
              } else {
                const searchRes = await axios.post(
                  'http://143.110.173.215:2005/api/' + props.routeTo,
                  {
                    searchData: searchInput.value,
                  },
                );

                props.setSearch(
                  searchRes.data.results.map((n) => ({
                    id: n.id,
                    title: n.name,
                    rating: n.vote_average / 2,
                    image: n.poster_path,
                    released: n.first_air_date.split('-'),
                  })),
                );
                setSearchInput({value: ''});
              }}}
            style={{
              height: 45,
              width: 50,
              alignSelf: 'flex-end',
              backgroundColor: '#F7AA36',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              borderTopRightRadius: 6,
              borderBottomRightRadius: 6,
            }}>
            <Image
              source={require('../../images/loupe.png')}
              style={{height: 20, width: 20}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperSearch: {
    width: width - 120,
    height: 45,
    backgroundColor: '#333333',
    color: 'white',
    marginTop: 20,
    borderRadius: 6,
  },
  textSearch: {
    marginLeft: 25,
    color: 'white'
  },
});

export default SearchCard;
