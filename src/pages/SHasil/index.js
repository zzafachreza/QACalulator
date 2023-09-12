import React, { useState } from 'react';
import { StyleSheet, Dimensions, View, TouchableOpacity, Text, Image } from 'react-native';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import Pdf from 'react-native-pdf';



export default function SHasil({ navigation, route }) {
    const source = route.params.img;

    // const source = { uri: "bundle-assets://pdf/4.pdf" };

    console.log(source)

    return (
        <View style={styles.container}>
            {/* <View style={{
                height: 80,
                backgroundColor: colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.white,
                    fontSize: 20
                }}>{route.params.judul}</Text>
            </View> */}

            <Image source={source} style={{
                width: '100%',
                resizeMode: 'contain',
                height: '100%'
            }} />

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});