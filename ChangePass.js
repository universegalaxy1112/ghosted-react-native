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

const {width, height} = Dimensions.get('window');

export const ChangePass = (props) => {
  const [pass, setPass] = useState({value: '', error: ''});
  const [rePass, setRePass] = useState({value: '', error: ''});
  const [token, setToken] = useState({value: '', error: ''});
  const [modalVisibleSuccess, setModalVisibleSuccess] = useState(false);
  const [modalVisibleError, setModalVisibleError] = useState(false);
  const [modalNotSamePass, setModalNotSamePass] = useState(false);
  const [emptyField, setEmptyField] = useState(false);

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
            placeholder="6-Digit Code"
            value={token.value}
            onChangeText={(text) => setToken({value: text, error: ''})}
          />
          <TextInput
            style={styles.email}
            placeholder="Password"
            value={pass.value}
            onChangeText={(text) => setPass({value: text, error: ''})}
          />
          <TextInput
            style={styles.email}
            placeholder="Repeat Password"
            value={rePass.value}
            onChangeText={(text) => setRePass({value: text, error: ''})}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (token.value != '' && pass.value != '' && rePass.value != '') {
                let tokenAccess = token.value;
                let password = pass.value;
                let repeatPassword = rePass.value;

                if (password == repeatPassword) {
                  async function componentDidMount() {
                    try {
                      await fetch('http://143.110.173.215:3000/forgot/verify', {
                        method: 'POST',
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          password: password,
                          repeatPassword: repeatPassword,
                          token: tokenAccess,
                        }),
                      })
                        .then((response) => response.json())
                        .then((data) => {
                          console.log(data)
                          if (data.statusC == '200') {
                            setModalVisibleSuccess(true);
                            setTimeout(function () {
                              setModalVisibleSuccess(false);
                              setTimeout(function () {
                                props.navigation.navigate('SignIn');
                              }, 1000);
                            }, 2000);
                          }
                        });
                    } catch (e) {
                      console.log(e);
                    }
                  }
                  componentDidMount();
                  props.navigation.navigate('SignIn');
                } else if (pass.value != rePass.value) {
                  setModalNotSamePass(true);

                  setTimeout(function () {
                    setModalNotSamePass(false);
                  }, 2000);
                }
              } else if (token.value == '') {
                setModalVisibleError(true);

                setTimeout(function () {
                  setModalVisibleError(false);
                }, 2000);
              } else if (pass.value == '' || rePass.value == '') {
                setEmptyField(true);

                setTimeout(function () {
                  setEmptyField(false);
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
                    Password was changed successfully.
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
                    Error: The token is empty or invalid.
                  </Text>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            animationType="none"
            transparent={true}
            visible={modalNotSamePass}
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
                    Error: The passwords do not match.
                  </Text>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            animationType="none"
            transparent={true}
            visible={emptyField}
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
                    Error: One of the password fields
                  </Text>
                  <Text style={styles.textError}>
                    is empty.
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
});
