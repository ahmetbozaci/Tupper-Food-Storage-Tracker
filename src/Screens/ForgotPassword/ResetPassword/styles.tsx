import {StyleSheet} from 'react-native';
import COLORS from '../../../color';
import {fontSz, widthPercentage, heightPercentage} from '../../../config';

const styles = StyleSheet.create({
  titleText: {
    fontSize: fontSz(24),
    fontWeight: 'bold',
    color: COLORS.green3,
  },
  titleTextSignup: {
    marginTop: heightPercentage(78),
    marginBottom: heightPercentage(112),
  },
  errorText: {
    fontSize: 12,
    color: '#FF0D10',
  },
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    marginHorizontal: widthPercentage(40),
  },
  input: {
    borderWidth: 2,
    borderColor: COLORS.gray7,
    paddingVertical: heightPercentage(18),
    paddingHorizontal: widthPercentage(15),
    marginVertical: heightPercentage(10),
    fontSize: fontSz(16),
    fontWeight: '500',
    borderRadius: 12,
    color: COLORS.green,
  },
  button: {
    alignSelf: 'flex-end',
    paddingVertical: heightPercentage(15),
    paddingHorizontal: widthPercentage(46),
    marginTop: heightPercentage(175),
  },
  btnText: {
    fontWeight: '500',
    fontSize: fontSz(16),
  },
});

export default styles;
