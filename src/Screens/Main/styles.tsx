import {StyleSheet} from 'react-native';
import COLORS from '../../color';
import {fontSz, widthPercentage, heightPercentage} from '../../config';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: widthPercentage(200),
    height: widthPercentage(200),
    borderRadius: widthPercentage(100),
    backgroundColor: COLORS.gray2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: fontSz(32),
    fontWeight: '500',
    color: COLORS.white,
  },
  buttonWrapper: {
    marginTop: heightPercentage(150),
  },
  button: {
    marginBottom: heightPercentage(15),
  },
});

export default styles;
