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
  Modal,
  Image,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { Directions } from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

export const ForgotPass = (props) => {
  const [email, setEmail] = useState({value: '', error: ''});
  const [modalVisibleSuccess, setModalVisibleSuccess] = useState(false);
  const [modalVisibleError, setModalVisibleError] = useState(false);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.firstBox}></View>
        <View style={styles.secondBox}></View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
          }}>
          <Text style={{marginTop: 180, fontWeight: 'bold', fontSize: 32}}>
            Reset Password
          </Text>
        </View>
        <View style={styles.centerForm}>
          <TextInput
            style={styles.email}
            placeholder="email"
            value={email.value}
            onChangeText={(text) => setEmail({value: text, error: ''})}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (email.value != '') {
                let mail = email.value;
                async function componentDidMount() {
                  try {
                    await fetch('http://143.110.173.215:3000/forgot/pass', {
                      method: 'POST',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        email: mail,
                      }),
                    })
                      .then((response) => response.json())
                      .then((data) => {
                        console.log(data.response);
                        if (data.statusC == '200') {
                          setModalVisibleSuccess(true);
                          setTimeout(function () {
                            setModalVisibleSuccess(false);
                            setTimeout(function () {
                              props.navigation.navigate('ChangePass');
                            }, 1000);
                          }, 2000);
                        }
                      });
                  } catch (e) {
                    console.log(e);
                  }
                }
                componentDidMount();
              } else {
                setModalVisibleError(true);
                setTimeout(function () {
                  setModalVisibleError(false);
                }, 2000);
              }
            }}>
            <Text style={styles.signText}>Submit</Text>
          </TouchableOpacity>
          <Text
            style={styles.forgotPassText}
            onPress={() => props.navigation.navigate('SignIn')}>
            Back to Login
          </Text>
          <Modal
            animationType="none"
            transparent={true}
            visible={modalVisibleSuccess}
            style={{
              width: width - 100,
              height: 50,
            }}>
            <View style={styles.mainModalWrapper}>
              <View style={styles.wrapper}>
                <View style={styles.icon}>
                  <Image
                    source={require('./images/checkmark.png')}
                    style={styles.image}
                  />
                </View>
                <View style={styles.wrapperText}>
                  <Text style={styles.text}>
                    If you have an account with
                  </Text>
                  <Text style={styles.text}>
                    us we've sent an email.
                  </Text>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            animationType="none"
            transparent={true}
            visible={modalVisibleError}
            style={{
              width: width - 100,
              height: 50,
            }}>
            <View style={styles.mainModalWrapper}>
              <View style={styles.wrapperError}>
                <View style={styles.icon}>
                  <Image
                    source={require('./images/cancelWhite.png')}
                    style={styles.imageE}
                  />
                </View>
                <View style={styles.wrapperText}>
                  <Text style={styles.textError}>
                    Error: Please enter a email.
                  </Text>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  forgotPassText: {
    marginTop: 10,
  },
  firstBox: {
    position: 'absolute',
    width: 300,
    height: 400,
    borderStyle: 'solid',
    borderWidth: 50,
    borderColor: 'orange',
    borderRadius: 90,
    top: 55,
    left: -90,
  },
  secondBox: {
    position: 'absolute',
    width: 300,
    height: 700,
    borderStyle: 'solid',
    borderWidth: 50,
    borderColor: 'orange',
    borderRadius: 90,
    top: 45,
    left: 300,
  },
  username: {
    width: 300,
    height: 50,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    marginBottom: 10,
    backgroundColor: 'white',
    paddingLeft: 15,
  },
  password: {
    width: 300,
    height: 50,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    backgroundColor: 'white',
    paddingLeft: 15,
  },
  email: {
    width: 300,
    height: 50,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    backgroundColor: 'white',
    paddingLeft: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0085FF',
    width: 300,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  signText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  centerForm: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 100,
  },
  wrapper: {
    width: width - 100,
    backgroundColor: '#16F6A6',
    borderRadius: 6,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  wrapperError: {
    width: width - 100,
    backgroundColor: '#F63E16',
    borderRadius: 6,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 24,
  },
  text: {
    fontSize: 15,
    color: '#333',
  },
  textError: {
    fontSize: 15,
    color: '#fff',
  },
  mainModalWrapper: {
    width: width,
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 60,
  },
  imageE: {
    marginTop: 5,
  },
  wrapperText: {
    flexDirection: 'column'
  }
});
