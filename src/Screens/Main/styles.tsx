import {StyleSheet} from 'react-native';
import COLORS from '../../color';
import {fontSz, widthPercentage, heightPercentage} from '../../config';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.green4,
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: fontSz(70),
    fontWeight: 'bold',
    color: COLORS.green3,
  },
  buttonWrapper: {
    marginTop: heightPercentage(70),
  },
  button: {
    width: widthPercentage(250),
    marginBottom: heightPercentage(10),
  },
  text: {
    color: COLORS.black,
    textAlign: 'center',
  },
  signupButton: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.green3,
    borderWidth: 2.5,
    borderRadius: 30,
  },
  buttonText: {
    color: COLORS.green3,
  },
  forgotPassword: {
    marginBottom: heightPercentage(200),
  },
  signup: {
    color: COLORS.blue,
  },
});

export default styles;
