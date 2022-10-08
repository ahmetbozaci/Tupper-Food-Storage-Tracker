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
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: fontSz(32),
    fontWeight: '500',
  },
  buttonWrapper: {
    marginTop: heightPercentage(150),
  },
  button: {
    marginBottom: heightPercentage(15),
    paddingVertical: heightPercentage(15),
  },
  buttonText: {
    fontSize: fontSz(24),
    fontWeight: '400',
  },
});

export default styles;
