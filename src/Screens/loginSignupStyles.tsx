import {StyleSheet} from 'react-native';
import COLORS from '../color';
import {fontSz, widthPercentage, heightPercentage} from '../config';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    marginHorizontal: widthPercentage(40),
  },
  titleText: {
    fontSize: fontSz(40),
    fontWeight: 'bold',
    color: COLORS.green3,
  },
  titleTextSignup: {
    marginVertical: heightPercentage(45),
  },
  titleTextLogin: {
    marginVertical: heightPercentage(60),
  },
  errorText: {
    fontSize: 12,
    color: '#FF0D10',
  },
  input: {
    borderWidth: 2,
    borderColor: COLORS.gray7,
    paddingVertical: heightPercentage(15),
    paddingHorizontal: widthPercentage(30),
    marginVertical: heightPercentage(10),
    fontSize: fontSz(16),
    borderRadius: 12,
    color: COLORS.green,
    fontWeight: '500',
  },
  button: {
    alignSelf: 'flex-end',
    paddingVertical: heightPercentage(15),
    paddingHorizontal: widthPercentage(46),
  },
  btnText: {
    fontWeight: '500',
    fontSize: fontSz(16),
  },
});

export default styles;
