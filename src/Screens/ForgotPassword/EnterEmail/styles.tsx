import {StyleSheet} from 'react-native';
import COLORS from '../../../color';
import {fontSz, widthPercentage, heightPercentage} from '../../../config';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    marginHorizontal: widthPercentage(40),
  },
  titleText: {
    fontSize: fontSz(24),
    fontWeight: 'bold',
    color: COLORS.green3,
  },
  titleTextSignup: {
    marginTop: heightPercentage(42),
    marginBottom: heightPercentage(112),
  },
  titleTextLogin: {
    marginVertical: heightPercentage(100),
  },
  errorText: {
    fontSize: 12,
    color: '#FF0D10',
    marginTop: heightPercentage(5),
  },
  input: {
    borderWidth: 3,
    borderColor: COLORS.gray7,
    paddingVertical: heightPercentage(18),
    paddingHorizontal: widthPercentage(15),
    fontSize: fontSz(16),
    fontWeight: '500',
    borderRadius: 12,
    color: COLORS.green,
  },
  button: {
    alignSelf: 'flex-end',
    paddingVertical: heightPercentage(15),
    paddingHorizontal: widthPercentage(46),
    marginTop: heightPercentage(250),
  },
  btnText: {
    fontWeight: '500',
    fontSize: fontSz(16),
  },
});

export default styles;
