import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View,
    Image,
    ScrollView,
    ImageBackground,
    Dimensions,
    Switch,
    SafeAreaView,
    ActivityIndicator,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { MyInput, MyGap, MyButton, MyPicker } from '../../components';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { apiURL } from '../../utils/localStorage';

export default function Register({ navigation }) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [loading, setLoading] = useState(false);
    const [valid, setValid] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const validate = text => {
        // console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            // console.log('nama_lengkap is Not Correct');
            setData({ ...data, nama_lengkap: text });
            setValid(false);
            return false;
        } else {
            setData({ ...data, nama_lengkap: text });
            setValid(true);
            // console.log('nama_lengkap is Correct');
        }
    };

    const [data, setData] = useState({
        password: '',
        nama_lengkap: '',
        nik: '',
        email: '',
        tipe: 'QA',
        alamat: ''
    });

    const simpan = () => {
        if (
            data.telepon.length === 0 &&
            data.nama_lengkap.length === 0 &&
            data.telepon.length === 0 &&
            data.alamat.length === 0 &&
            data.username.length === 0 &&
            data.password.length === 0

        ) {
            showMessage({
                message: 'all form is required !',
            });
        } else if (data.telepon.length === 0) {
            showMessage({
                message: 'phone is required !',
            });
        } else if (data.nama_lengkap.length === 0) {
            showMessage({
                message: 'fullname is required !',
            });
        }
        else if (data.email.length === 0) {
            showMessage({
                message: 'email is required !',
            });
        } else if (data.password.length === 0) {
            showMessage({
                message: 'password is required !',
            });
        } else {
            setLoading(true);
            console.log(data);
            axios
                .post(apiURL + 'register.php', data)
                .then(res => {
                    console.warn(res.data);
                    let err = res.data.split('#');

                    // console.log(err[0]);
                    if (err[0] == 50) {
                        setTimeout(() => {
                            setLoading(false);
                            showMessage({
                                message: err[1],
                                type: 'danger',
                            });
                        }, 1200);
                    } else {
                        setTimeout(() => {
                            navigation.replace('Login');
                            showMessage({
                                message: 'Register is Successfully !',
                                type: 'success',
                            });
                        }, 1200);
                    }
                });
        }
    };
    return (
        <ImageBackground
            style={{
                flex: 1,
                backgroundColor: colors.white,
                padding: 10,
            }}>

            {/* <Switch onValueChange={toggleSwitch} value={isEnabled} /> */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>


                <MyGap jarak={10} />
                <MyInput
                    placeholder="enter your full name"
                    label="Full Name"
                    iconname="person"
                    value={data.nama_lengkap}
                    onChangeText={value =>
                        setData({
                            ...data,
                            nama_lengkap: value,
                        })
                    }
                />

                <MyGap jarak={10} />
                <MyInput
                    placeholder="enter your email"
                    label="Email"
                    iconname="mail"
                    value={data.email}
                    onChangeText={value =>
                        setData({
                            ...data,
                            email: value,
                        })
                    }
                />

                <MyGap jarak={10} />
                <MyInput
                    placeholder="enter your institution/company"
                    label="Institution/Company"
                    iconname="business"
                    value={data.company}
                    onChangeText={value =>
                        setData({
                            ...data,
                            company: value,
                        })
                    }
                />

                <MyGap jarak={10} />
                <MyInput

                    label="Address"
                    iconname="map"
                    placeholder="enter your address"
                    value={data.alamat}
                    onChangeText={value =>
                        setData({
                            ...data,
                            alamat: value,
                        })
                    }
                />

                <MyGap jarak={10} />
                <MyInput

                    label="Phone Number (WA)"
                    iconname="call"
                    keyboardType='phone-pad'
                    placeholder="enter your phone number (WA)"
                    value={data.telepon}
                    onChangeText={value =>
                        setData({
                            ...data,
                            telepon: value,
                        })
                    }
                />


                <MyGap jarak={10} />
                <MyInput
                    placeholder="enter your password"
                    label="Password"
                    iconname="key"
                    secureTextEntry
                    value={data.password}
                    onChangeText={value =>
                        setData({
                            ...data,
                            password: value,
                        })
                    }
                />
                <MyGap jarak={20} />
                {!loading &&
                    <MyButton
                        warna={colors.primary}
                        title="REGISTER"
                        Icons="log-in"
                        onPress={simpan}
                    />
                }
                <MyGap jarak={20} />

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
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        padding: 10,
    },
    image: {
        width: 620 / 4,
        height: 160 / 4,
    },
});
