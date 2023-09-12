import { Alert, StyleSheet, Text, View, Image, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

export default function Home({ navigation }) {
  const isFocused = useIsFocused();
  const [user, setUser] = useState({});
  const [PSIA, setPSIA] = useState(14.73);
  const HVI_ID = [1010.0, 0, 0, 1769.70, 2516.10, 3251.90, 3262.30, 4000.90, 4008.70, 5129.22];
  const GI_BI = [0.55390, 1.51950, 0.96720, 1.03820, 1.52250, 2.00680, 2.00680, 2.49110, 2.49110, 3.21755];
  const BI = [0.01160, 0.01950, 0.00442, 0.02380, 0.03470, 0.04410, 0.04700, 0.05760, 0.06060, 0.08637];
  const [GHVReal, setGHVReal] = useState({
    value1: 0,
    value2: 0
  })
  const [GHVIdeal, setGHVIdeal] = useState({
    value1: 0,
    value2: 0
  })
  const [CF, setCF] = useState({
    value1: 0,
    value2: 0
  })
  const [RD, setRD] = useState({
    value1: 0,
    value2: 0
  })
  const [XiBI, setXiBI] = useState({
    value1: 0,
    value2: 0
  })
  const [XiGI_ID, setXi_GI_ID] = useState({
    value1: 0,
    value2: 0
  })
  // const [data, setData] = useState([
  //   {
  //     label: 'CH4',
  //     value1: 0,
  //     value2: 0
  //   },
  //   {
  //     label: 'CO2',
  //     value1: 0,
  //     value2: 0
  //   },
  //   {
  //     label: 'N2',
  //     value1: 0,
  //     value2: 0
  //   },
  //   {
  //     label: 'C2H6',
  //     value1: 0,
  //     value2: 0
  //   },
  //   {
  //     label: 'C3H8',
  //     value1: 0,
  //     value2: 0
  //   },
  //   {
  //     label: 'i C4H10',
  //     value1: 0,
  //     value2: 0
  //   },
  //   {
  //     label: 'n C4H10',
  //     value1: 0,
  //     value2: 0
  //   },
  //   {
  //     label: 'i C5H12',
  //     value1: 0,
  //     value2: 0
  //   },
  //   {
  //     label: 'n C5H12',
  //     value1: 0,
  //     value2: 0
  //   },
  //   {
  //     label: 'C6 +',
  //     value1: 0,
  //     value2: 0
  //   },

  // ]);

  const [data, setData] = useState([
    {
      label: 'CH4',
      value1: 91.593,
      value2: 91.567
    },
    {
      label: 'CO2',
      value1: 3.243,
      value2: 3.248
    },
    {
      label: 'N2',
      value1: 0.05,
      value2: 0.049
    },
    {
      label: 'C2H6',
      value1: 2.24,
      value2: 2.239
    },
    {
      label: 'C3H8',
      value1: 1.529,
      value2: 1.533
    },
    {
      label: 'i C4H10',
      value1: 0.339,
      value2: 0.344
    },
    {
      label: 'n C4H10',
      value1: 0.42,
      value2: 0.428
    },
    {
      label: 'i C5H12',
      value1: 0.177,
      value2: 0.175
    },
    {
      label: 'n C5H12',
      value1: 0.126,
      value2: 0.129
    },
    {
      label: 'C6 +',
      value1: 0.283,
      value2: 0.288
    },

  ])

  const BI_OF_AIR = 0.00537;
  const Z_AIR = 1 - (Math.pow(BI_OF_AIR, 2)) * PSIA;

  const __calculate = () => {

    // XIbi V1
    let Xibi_v1 = 0;
    let Xibi_v2 = 0;
    let xiGiid_v1 = 0;
    let xiGiid_v2 = 0;
    let xiHvi_v1 = 0;
    let xiHvi_v2 = 0;
    data.map((item, index) => {
      Xibi_v1 += (item.value1 / 100) * BI[index];
      Xibi_v2 += (item.value2 / 100) * BI[index];

      xiGiid_v1 += (item.value1 / 100) * GI_BI[index];
      xiGiid_v2 += (item.value2 / 100) * GI_BI[index];

      xiHvi_v1 += (item.value1 / 100) * HVI_ID[index];
      xiHvi_v2 += (item.value2 / 100) * HVI_ID[index];
    })


    setXiBI({
      value1: Xibi_v1,
      value2: Xibi_v2

    })

    setXi_GI_ID({
      value1: xiGiid_v1,
      value2: xiGiid_v2
    })

    setCF({
      value1: (1 - (PSIA * Math.pow(Xibi_v1, 2))).toFixed(4),
      value2: (1 - (PSIA * Math.pow(Xibi_v2, 2))).toFixed(4),
    })

    setGHVIdeal({
      value1: xiHvi_v1.toFixed(4),
      value2: xiHvi_v2.toFixed(4)
    })
    setGHVReal({
      value1: ((xiHvi_v1 * PSIA) / (14.696 * (1 - (PSIA * Math.pow(Xibi_v1, 2))))).toFixed(4),
      value2: ((xiHvi_v2 * PSIA) / (14.696 * (1 - (PSIA * Math.pow(Xibi_v2, 2))))).toFixed(4)
    })

    setRD({
      value1: (xiGiid_v1 * Z_AIR / (1 - (PSIA * Math.pow(Xibi_v1, 2)))).toFixed(4),
      value2: (xiGiid_v2 * Z_AIR / (1 - (PSIA * Math.pow(Xibi_v2, 2)))).toFixed(4)
    })

  }



  useEffect(() => {


    getData('user').then(res => {
      setUser(res);
    })
  }
    , []);





  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white,
    }}>
      {/* header */}
      <View style={{
        height: windowHeight / 7,
        backgroundColor: colors.primary,
        paddingHorizontal: 10,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        paddingVertical: 20,
      }}>
        <View style={{
          flexDirection: 'row',
          marginBottom: 5,
        }}>
          <View style={{
            flex: 1,
          }}>
            <Text style={{

              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 28,
              color: colors.white
            }}>Welcome, {user.nama_lengkap}</Text>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 20,
              color: colors.white
            }}>
              Quality Assurance and GHV of Natural Gas Calculator
            </Text>
          </View>


          <TouchableOpacity onPress={() => {
            storeData('user', null);

            navigation.replace('Login');
          }} style={{

            padding: 10,
            borderRadius: 5,
            flexDirection: 'row',
            backgroundColor: colors.white,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Icon type="ionicon" size={windowWidth / 30} name="log-out-outline" color={colors.primary} />
            <Text style={{
              left: 5,
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 30,
              color: colors.primary
            }}>Logout</Text>
          </TouchableOpacity>
        </View>



      </View>

      {/* calculator */}


      <ScrollView showsVerticalScrollIndicator={false} style={{
        padding: 10,
      }}>



        <View style={{
          paddingVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-around'
        }}>
          <View style={{
            flex: 1,
            marginRight: 2,
            backgroundColor: colors.white
          }}>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: 12,
              color: colors.black,

              borderRadius: 10,
              textAlign: 'center'
            }}>Result 1{'\n'}(% Mol)</Text>
          </View>
          <View style={{
            marginLeft: 2,
            marginRight: 2,
            flex: 1,
          }}>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: 12,
              color: colors.black,

              borderRadius: 10,
              textAlign: 'center'
            }}>Result 2{'\n'}(% Mol)</Text>
          </View>

          <View style={{
            flex: 1,
            marginLeft: 2,
            marginRight: 2,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: 12,
              color: colors.black,
              paddingHorizontal: 0,
              borderRadius: 10,
              textAlign: 'center'
            }}>Repeatibility {'\n'}Test</Text>

          </View>
          <View style={{
            flex: 1,
            marginLeft: 2,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: 12,
              color: colors.black,
              paddingHorizontal: 0,
              borderRadius: 10,
              textAlign: 'center'
            }}>Reproducibility{'\n'}Test</Text>
          </View>


        </View>
        {data.map((item, index) => {

          let avg = ((item.value1 + item.value2) / 2).toFixed(3);
          let dev = Math.abs(item.value1 - item.value2).toFixed(3);
          let v1_limit = 0;
          let v2_limit = 0;
          let v1_status = '';
          let v2_status = '';
          if ((index + 1) == 1) {
            v1_limit = (0.0079 * (Math.pow(avg, (1 / 3)))).toFixed(3);
            v2_limit = (91000 * (Math.pow(avg, -3))).toFixed(3);
            v1_status = dev <= v1_limit ? 'PASS' : 'FAILED';
            v2_status = dev <= v2_limit ? 'PASS' : 'FAILED';
          } else if ((index + 1) == 2) {
            v1_limit = (0.039 * (Math.pow(avg, (1 / 4)))).toFixed(3);
            v2_limit = (0.158 * (Math.pow(avg, (1 / 2)))).toFixed(3);
            v1_status = dev <= v1_limit ? 'PASS' : 'FAILED';
            v2_status = dev <= v2_limit ? 'PASS' : 'FAILED';
          } else if ((index + 1) == 3) {
            v1_limit = (0.0042 * (Math.pow(avg, (1 / 3)))).toFixed(3);
            v2_limit = (0.12 * (Math.pow(avg, (1 / 3)))).toFixed(3);
            v1_status = dev <= v1_limit ? 'PASS' : 'FAILED';
            v2_status = dev <= v2_limit ? 'PASS' : 'FAILED';
          } else if ((index + 1) == 4) {
            v1_limit = (0.0124 * (Math.pow(avg, (1 / 3)))).toFixed(3);
            v2_limit = (0.0315 * (Math.pow(avg, (1 / 3)))).toFixed(3);
            v1_status = dev <= v1_limit ? 'PASS' : 'FAILED';
            v2_status = dev <= v2_limit ? 'PASS' : 'FAILED';
          } else if ((index + 1) == 5) {
            v1_limit = (0.0084 * (Math.pow(avg, (1 / 8)))).toFixed(3);
            v2_limit = (0.026 * (Math.pow(avg, (1 / 2)))).toFixed(3);
            v1_status = dev <= v1_limit ? 'PASS' : 'FAILED';
            v2_status = dev <= v2_limit ? 'PASS' : 'FAILED';
          } else if ((index + 1) == 6) {
            v1_limit = (0.01 * (Math.pow(avg, (1 / 5)))).toFixed(3);
            v2_limit = (0.018 * (Math.pow(avg, (1 / 2)))).toFixed(3);
            v1_status = dev <= v1_limit ? 'PASS' : 'FAILED';
            v2_status = dev <= v2_limit ? 'PASS' : 'FAILED';
          } else if ((index + 1) == 7) {
            v1_limit = (0.0117 * (Math.pow(avg, (2 / 5)))).toFixed(3);
            v2_limit = (0.033 * (Math.pow(avg, (1 / 2)))).toFixed(3);
            v1_status = dev <= v1_limit ? 'PASS' : 'FAILED';
            v2_status = dev <= v2_limit ? 'PASS' : 'FAILED';
          } else if ((index + 1) == 8) {
            v1_limit = (0.009 * (Math.pow(avg, (1 / 4)))).toFixed(3);
            v2_limit = (0.025 * (Math.pow(avg, (1 / 4)))).toFixed(3);
            v1_status = dev <= v1_limit ? 'PASS' : 'FAILED';
            v2_status = dev <= v2_limit ? 'PASS' : 'FAILED';
          } else if ((index + 1) == 9) {
            v1_limit = (0.01 * (Math.pow(avg, (1 / 5)))).toFixed(3);
            v2_limit = (0.026 * (Math.pow(avg, (1 / 3)))).toFixed(3);
            v1_status = dev <= v1_limit ? 'PASS' : 'FAILED';
            v2_status = dev <= v2_limit ? 'PASS' : 'FAILED';
          } else if ((index + 1) == 10) {
            v1_limit = (0.0135 * (Math.pow(avg, (1 / 4)))).toFixed(3);
            v2_limit = (0.051 * (Math.pow(avg, (1 / 2)))).toFixed(3);
            v1_status = dev <= v1_limit ? 'PASS' : 'FAILED';
            v2_status = dev <= v2_limit ? 'PASS' : 'FAILED';
          }


          return (

            <View style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              marginVertical: 2,

            }}>
              <View style={{
                flex: 1,
                padding: 5,
              }}>
                <Text style={{
                  fontFamily: fonts.secondary[600],
                  fontSize: 12
                }}>{item.label}</Text>
              </View>

              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around'
              }}>
                <View style={{
                  flex: 1,
                  marginRight: 2,
                }}>
                  <TextInput value={item.value1.toString()} onEndEditing={x => {

                    if (x.nativeEvent.text == 0) {
                      let newArr = [...data];
                      newArr[index] = {
                        label: newArr[index].label,
                        value1: 0,
                        value2: newArr[index].value2
                      }
                      setData(newArr)
                    }
                  }} onChangeText={x => {

                    let newArr = [...data];
                    newArr[index] = {
                      label: newArr[index].label,
                      value1: x,
                      value2: newArr[index].value2
                    }


                    setData(newArr)

                  }} keyboardType='number-pad' style={{
                    backgroundColor: colors.tertiary,
                    fontFamily: fonts.secondary[600],
                    fontSize: 15,
                    textAlign: 'center'
                  }} />
                </View>
                <View style={{
                  marginLeft: 2,
                  marginRight: 2,
                  flex: 1,
                }}>
                  <TextInput onEndEditing={x => {

                    if (x.nativeEvent.text == 0) {
                      let newArr = [...data];
                      newArr[index] = {
                        label: newArr[index].label,
                        value2: 0,
                        value1: newArr[index].value1
                      }
                      setData(newArr)
                    }
                  }} onChangeText={x => {
                    let newArr = [...data];
                    newArr[index] = {
                      label: newArr[index].label,
                      value2: x,
                      value1: newArr[index].value1
                    }
                    setData(newArr)

                  }} value={item.value2.toString()} keyboardType='number-pad' style={{
                    backgroundColor: colors.tertiary,
                    fontFamily: fonts.secondary[600],
                    fontSize: 15,
                    textAlign: 'center'
                  }} />
                </View>

                <View style={{
                  flex: 1,
                  marginLeft: 2,
                  marginRight: 2,
                  backgroundColor: v1_status == 'PASS' ? colors.success : colors.danger,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 15,

                    color: colors.white,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    textAlign: 'center'
                  }}>{v1_status}</Text>
                </View>
                <View style={{
                  flex: 1,
                  marginLeft: 2,
                  backgroundColor: v2_status == 'PASS' ? colors.success : colors.danger,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 15,
                    color: colors.white,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    textAlign: 'center'
                  }}>{v2_status}</Text>
                </View>
              </View>

            </View>
          )
        })}

        <View style={{ paddingHorizontal: 10, paddingVertical: 5, marginVertical: 2, }}>
          <View style={{ flex: 1, padding: 5, }}>
            <Text style={{ fontFamily: fonts.secondary[600], fontSize: 12 }}>Pressure Base (psia)</Text>
          </View>
          <View style={{ flexDirection: 'row', }}>
            <View style={{ flex: 0.5, marginRight: 2 }}>
              <TextInput value={PSIA.toString()} keyboardType='number-pad' style={{
                backgroundColor: colors.tertiary, fontFamily: fonts.secondary[600], fontSize: 15, textAlign: 'center'
              }} />
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 10, paddingVertical: 5, marginVertical: 2, }}>
          <View style={{ flex: 1, padding: 5, }}>
            <Text style={{ fontFamily: fonts.secondary[600], fontSize: 12 }}>Gross Heat Value Real (Btu/Scf)</Text>
          </View>
          <View style={{ flexDirection: 'row', width: '51%' }}>
            <View style={{
              flex: 1, marginRight: 2, height: 48,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.tertiary,
            }}>
              <Text style={{ fontFamily: fonts.secondary[600], fontSize: 15, textAlign: 'center' }}>
                {GHVReal.value1.toString()}
              </Text>
            </View>
            <View style={{
              flex: 1, marginLeft: 2, height: 48,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.tertiary,
            }}>
              <Text style={{ fontFamily: fonts.secondary[600], fontSize: 15, textAlign: 'center' }}>
                {GHVReal.value2.toString()}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 10, paddingVertical: 5, marginVertical: 2, }}>
          <View style={{ flex: 1, padding: 5, }}>
            <Text style={{ fontFamily: fonts.secondary[600], fontSize: 12 }}>Gross Heat Value Ideal (Btu/Scf)</Text>
          </View>
          <View style={{ flexDirection: 'row', width: '51%' }}>
            <View style={{
              flex: 1, marginRight: 2, height: 48,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.tertiary,
            }}>
              <Text style={{ fontFamily: fonts.secondary[600], fontSize: 15, textAlign: 'center' }}>
                {GHVIdeal.value1.toString()}
              </Text>
            </View>
            <View style={{
              flex: 1, marginLeft: 2, height: 48,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.tertiary,
            }}>
              <Text style={{ fontFamily: fonts.secondary[600], fontSize: 15, textAlign: 'center' }}>
                {GHVIdeal.value2.toString()}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 10, paddingVertical: 5, marginVertical: 2, }}>
          <View style={{ flex: 1, padding: 5, }}>
            <Text style={{ fontFamily: fonts.secondary[600], fontSize: 12 }}>Compressibility Factor</Text>
          </View>
          <View style={{ flexDirection: 'row', width: '51%' }}>
            <View style={{
              flex: 1, marginRight: 2, height: 48,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.tertiary,
            }}>
              <Text style={{ fontFamily: fonts.secondary[600], fontSize: 15, textAlign: 'center' }}>
                {CF.value1.toString()}
              </Text>
            </View>
            <View style={{
              flex: 1, marginLeft: 2, height: 48,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.tertiary,
            }}>
              <Text style={{ fontFamily: fonts.secondary[600], fontSize: 15, textAlign: 'center' }}>
                {CF.value2.toString()}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 10, paddingVertical: 5, marginVertical: 2, }}>
          <View style={{ flex: 1, padding: 5, }}>
            <Text style={{ fontFamily: fonts.secondary[600], fontSize: 12 }}>Relative Density</Text>
          </View>
          <View style={{ flexDirection: 'row', width: '51%' }}>
            <View style={{
              flex: 1, marginRight: 2, height: 48,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.tertiary,
            }}>
              <Text style={{ fontFamily: fonts.secondary[600], fontSize: 15, textAlign: 'center' }}>
                {RD.value1.toString()}
              </Text>
            </View>
            <View style={{
              flex: 1, marginLeft: 2, height: 48,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.tertiary,
            }}>
              <Text style={{ fontFamily: fonts.secondary[600], fontSize: 15, textAlign: 'center' }}>
                {RD.value2.toString()}
              </Text>
            </View>
          </View>
        </View>




        <MyGap jarak={20} />

        <MyButton Icons="refresh" title="Calculate" warna={colors.primary} onPress={__calculate}
        />


        <MyGap jarak={50} />
        <Text style={{
          textAlign: 'center',
          fontFamily: fonts.secondary[600],
          color: colors.border,
          margin: 5,
        }}>Base on ASTM D-2161 & ASTM D-2270</Text>

        <Text style={{
          textAlign: 'center',
          padding: 10,
          backgroundColor: colors.white,
          color: colors.black,
          fontSize: windowWidth / 28,
          fontFamily: fonts.primary[600],
        }}>Copyright © 2023 | Laboratory of Pupuk Kaltim</Text>
      </ScrollView>










    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  judul: {
    fontFamily: fonts.secondary[600],
    fontSize: windowWidth / 35
  },
  item: {
    fontFamily: fonts.secondary[400],
    fontSize: windowWidth / 35
  }
})