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
    fontWeight: '600',
    fontFamily: 'Poppins-Bold',
    color: COLORS.green3,
  },
  buttonWrapper: {
    marginTop: heightPercentage(100),
  },
  button: {
    width: widthPercentage(230),
    marginBottom: heightPercentage(10),
    paddingVertical: heightPercentage(15),
    borderRadius: 25,
  },
  text: {
    color: COLORS.black,
    textAlign: 'center',
    fontFamily: 'Helvetica-Regular',
  },
  signupButton: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.green3,
    borderWidth: 2.5,
  },
  buttonText: {
    fontWeight: '500',
    fontSize: fontSz(16),
    fontFamily: 'Helvetica-Medium',
  },
  forgotPassword: {
    marginBottom: heightPercentage(145),
    marginTop: heightPercentage(20),
    fontSize: fontSz(20),
    fontFamily: 'Helvetica-Regular',
    fontWeight: '400',
  },
  signup: {
    color: COLORS.blue,
  },
});

export default styles;
