import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon, ListItem, Button } from 'react-native-elements';
import { colors } from '../../utils/colors';
import { fonts, windowWidth } from '../../utils/fonts';
import { TextInput } from 'react-native-gesture-handler';

export default function MyInput({
  onFocus,
  label,
  iconname,
  onChangeText,
  value,
  pakaiicon = true,
  keyboardType,
  secureTextEntry,
  styleInput,
  placeholder,
  autoFocus,
  tinggi = 50,
  multiline,
  label2,
  styleLabel,
  colorIcon = colors.primary,
}) {
  return (
    <>
      <View
        style={{
          flexDirection: pakaiicon ? 'row' : 'column',
          alignItems: 'center',
          paddingVertical: 3,
        }}>
        {pakaiicon && <Icon type="ionicon" name={iconname} color={colorIcon} size={16} />}
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            color: colors.primary,
            left: 10,
            fontSize: windowWidth / 38,
            textAlign: 'center',
            ...styleLabel,
          }}>
          {label}
        </Text>
      </View>
      {label2 && (
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            color: colors.primary,
            left: 10,
            fontSize: windowWidth / 38,
            textAlign: 'center',
            ...styleLabel,
          }}>
          {label2}
        </Text>
      )}
      <TextInput
        multiline={multiline}
        autoFocus={autoFocus}
        onFocus={onFocus}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        style={{
          borderRadius: 5,
          height: tinggi,
          backgroundColor: colors.tertiary,
          paddingLeft: 10,
          color: colors.black,
          fontSize: 12,
          fontFamily: fonts.primary[400],
          ...styleInput,
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({});
