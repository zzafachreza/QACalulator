import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
} from 'react-native';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { getData } from '../../utils/localStorage';

export default function Splash({ navigation }) {
  const top = new Animated.Value(0.3);

  const animasi = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(top, {
          toValue: 1,
          duration: 1000,
        }),
        Animated.timing(top, {
          toValue: 0.3,
          duration: 1000,
        }),
      ]),
      {
        iterations: 1,
      },
    ).start();
  };



  useEffect(() => {
    animasi();


    const unsubscribe = getData('user').then(res => {
      // console.log(res);
      if (!res) {
        // console.log('beum login');

        setTimeout(() => {
          navigation.replace('Login');
        }, 1500);
      } else {
        console.log('sudah login logon');

        setTimeout(() => {
          navigation.replace('Home');
        }, 1500);
      }
    });
  }, []);


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>

        <Image
          source={require('../../assets/logo.png')}
          style={
            {

              height: 250,
              resizeMode: 'contain'
            }
          }
        />
        <Text style={{
          marginTop: '10%',
          color: colors.primary,
          fontFamily: fonts.secondary[600],
          fontSize: windowWidth / 17,
        }}>Quality Assurance and GHV</Text>
        <Text style={{
          color: colors.secondary,
          fontFamily: fonts.secondary[600],
          fontSize: windowWidth / 17,
          marginBottom: 20,
        }}>of Natural Gas Calculator</Text>

        <ActivityIndicator size="large" color={colors.secondary} />
        <Text style={{
          marginTop: 20,
          color: colors.primary,
          fontFamily: fonts.secondary[600],
          fontSize: windowWidth / 25,
          marginBottom: 10,
        }}>by Laboratory of</Text>
        <Image
          source={require('../../assets/pupuk.png')}
          style={
            {
              height: 30,
              width: 200,
            }
          }
        />

      </View>



    </View>
  );
}

const styles = StyleSheet.create({});
