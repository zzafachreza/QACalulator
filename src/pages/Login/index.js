import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { fonts, windowWidth, colors } from '../../utils';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import { apiURL, storeData } from '../../utils/localStorage';


export default function ({ navigation }) {

  const [kirim, setKirim] = useState({
    email: null,
    password: null,
    tipe: 'QA'
  });
  const [loading, setLoading] = useState(false);



  const masuk = () => {


    if (kirim.email == null && kirim.password == null) {
      alert('email dan Passwoord tidak boleh kosong !');
    } else if (kirim.email == null) {
      alert('email tidak boleh kosong !');
    } else if (kirim.password == null) {
      alert('Passwoord tidak boleh kosong !');
    } else {


      setLoading(true);
      console.log('snet', kirim);
      setTimeout(() => {
        axios
          .post(apiURL + 'login.php', kirim)
          .then(res => {
            console.log(res.data);
            setLoading(false);
            if (res.data.kode == 50) {

              alert(res.data.msg);

            } else {
              storeData('user', res.data);
              navigation.replace('Home');
            }
          });
      }, 1200);


    }




  }

  return (
    <>
      <ScrollView style={{ padding: 10, flex: 1, backgroundColor: colors.white }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5, paddingTop: 10 }}>

          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>


            <Image
              source={require('../../assets/logo.png')}
              style={
                {
                  width: 120,
                  height: 120,
                  resizeMode: 'contain'
                }
              }
            />


            <Text style={{
              marginTop: '2%',
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

          </View>


        </View>
        <MyGap jarak={10} />
        <View style={{ padding: 10, marginVertical: 10, flex: 1 }}>
          <MyInput label="Email" onChangeText={val => setKirim({
            ...kirim,
            email: val
          })}


            iconname="mail" placeholder="enter your email" />
          <MyGap jarak={20} />
          <MyInput
            onChangeText={val => setKirim({
              ...kirim,
              password: val
            })}
            secureTextEntry={true}
            label="Password"
            iconname="key"
            placeholder="enter your password"
          />
          <MyGap jarak={40} />
          {!loading &&

            <>
              <MyButton
                onPress={masuk}
                title="LOGIN"
                warna={colors.primary}
                Icons="log-in-outline"
              />
              <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center'
              }}><Text style={{
                fontSize: windowWidth / 25,
                fontFamily: fonts.primary[400],
                textAlign: 'center',
                color: colors.primary
              }}>Don't have an account? Please register here</Text></TouchableOpacity>
            </>

          }
        </View>
        {loading && <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>}

      </ScrollView>
      <View>
        <Text style={{
          textAlign: 'center',
          padding: 10,
          backgroundColor: colors.white,
          color: colors.black,
          fontSize: windowWidth / 28,
          fontFamily: fonts.primary[600],
        }}>Copyright © 2023 | Laboratory of Pupuk Kaltim</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
