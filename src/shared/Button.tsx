/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {heightPercentage, fontSz} from '../config';
import COLORS from '../color';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface ButtonProps {
  buttonText: string;
  buttonStyle?: object;
  buttonTextStyle?: object;
  disabled?: boolean;
  onPress?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  buttonText,
  buttonStyle,
  buttonTextStyle,
  onPress,
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, buttonStyle]}
      disabled={disabled}>
      <Text style={[styles.text, buttonTextStyle]}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    paddingVertical: heightPercentage(20),
    marginVertical: heightPercentage(5),
    backgroundColor: COLORS.black,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: fontSz(24),
    textAlign: 'center',
    fontWeight: '400',
    color: COLORS.white,
  },
});
