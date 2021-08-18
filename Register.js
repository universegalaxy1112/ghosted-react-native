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
  Alert,
  Modal,
  Image,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

export const Register = (props) => {
  const [username, setUsername] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [modalVisibleSuccess, setModalVisibleSuccess] = useState(false);
  const [modalVisibleError, setModalVisibleError] = useState(false);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.firstBox}></View>
        <View style={styles.secondBox}></View>
        <View style={styles.centerForm}>
          <TextInput
            style={styles.username}
            placeholder="username"
            value={username.value}
            onChangeText={(text) => setUsername({value: text, error: ''})}
          />
          <TextInput
            style={styles.email}
            placeholder="email"
            value={email.value}
            onChangeText={(text) => setEmail({value: text, error: ''})}
          />
          <TextInput
            style={styles.password}
            secureTextEntry={true}
            placeholder="password"
            value={password.value}
            onChangeText={(text) => setPassword({value: text, error: ''})}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              let name = username.value;
              let pass = password.value;
              let mail = email.value;
              console.log(name, pass, email);

              async function componentDidMount() {
                try {
                  await fetch('http://143.110.173.215:3000/register', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      username: name,
                      email: mail,
                      password: pass,
                    }),
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      console.log(data.response);
                      if (data.statusC == '201') {
                        setModalVisibleSuccess(true);
                        setTimeout(function () {
                          setModalVisibleSuccess(false);
                          setTimeout(function () {
                            props.navigation.navigate('SignIn');
                          }, 1000);
                        }, 2000);
                      } else if(data.statusC == '424') {
                        setModalVisibleError(true);
                        setTimeout(function () {
                          setModalVisibleError(false);
                        }, 2000);
                      }
                    });
                } catch (e) {
                  console.log(e);
                }
              }
              componentDidMount();
            }}>
            <Text style={styles.signText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginTop: 15}}
            onPress={() => {
              props.navigation.navigate('SignIn');
            }}>
            <Text>Back to Login</Text>
          </TouchableOpacity>
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
                    Account was created successfully.
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
                    Error: The error.
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
    marginTop: 50,
  },
  signText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  centerForm: {
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: 5
  }
});
