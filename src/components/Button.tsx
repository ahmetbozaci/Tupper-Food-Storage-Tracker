import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {heightPercentage, fontSz} from '../config';
import COLORS from '../color';

interface ButtonProps {
  buttonText: string;
  buttonStyle?: object;
  buttonTextStyle?: object;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({
  buttonText,
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
    borderRadius: 16,
    paddingVertical: heightPercentage(8),
    backgroundColor: COLORS.green,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: fontSz(14),
    textAlign: 'center',
  },
});
