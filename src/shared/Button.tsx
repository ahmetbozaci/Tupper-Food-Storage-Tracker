/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {heightPercentage, fontSz} from '../config';
import COLORS from '../color';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface ButtonProps {
  buttonText?: string;
  buttonStyle?: object;
  buttonTextStyle?: object;
  onPress?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  buttonText = 'Submit',
  buttonStyle,
  buttonTextStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyle]}>
      <Text style={[styles.text, buttonTextStyle]}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    paddingVertical: heightPercentage(20),
    marginVertical: heightPercentage(5),
    backgroundColor: COLORS.green3,
    width: '50%',
  },
  text: {
    fontSize: fontSz(24),
    textAlign: 'center',
    fontWeight: '400',
    color: COLORS.white,
  },
});
