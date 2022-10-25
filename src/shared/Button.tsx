import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {heightPercentage, fontSz} from '../config';
import COLORS from '../color';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface ButtonProps {
  buttonText?: string;
  buttonStyle?: object;
  buttonTextStyle?: object;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

interface SpinnerProps {
  size?: any;
  style?: Object;
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({size, style, color}) => {
  const spinnerColor = color || '#FFFFFF';
  return (
    <View style={[styles.spinnerStyle, style]}>
      <ActivityIndicator size={size || 'large'} color={spinnerColor} />
    </View>
  );
};

const Button: React.FC<ButtonProps> = ({
  buttonText = 'Submit',
  buttonStyle,
  buttonTextStyle,
  onPress,
  loading,
  disabled,
}) => {
  const {diabledStyle} = styles;
  const buttonDisabledStyle = disabled || loading ? diabledStyle : '';
  const renderSpinnerOrText = () => {
    const color = Colors.white;
    if (loading) {
      return <Spinner color={color} size={20} />;
    }
    return <Text style={[styles.text, buttonTextStyle]}>{buttonText}</Text>;
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, buttonStyle, buttonDisabledStyle]}
      disabled={disabled}>
      {renderSpinnerOrText()}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    paddingVertical: heightPercentage(20),
    // marginVertical: heightPercentage(5),
    backgroundColor: COLORS.green3,
    width: '50%',
  },
  text: {
    fontSize: fontSz(24),
    textAlign: 'center',
    fontWeight: '400',
    color: COLORS.white,
  },
  spinnerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  diabledStyle: {
    backgroundColor: COLORS.gray,
    opacity: 0.8,
  },
});
