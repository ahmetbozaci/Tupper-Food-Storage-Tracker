import {StyleSheet} from 'react-native';
import COLORS from '../color';
import {fontSz, widthPercentage, heightPercentage} from '../config';

const styles = StyleSheet.create({
  titleText: {
    fontSize: fontSz(40),
    fontWeight: 'bold',
    color: COLORS.black3,
    textAlign: 'center',
    paddingBottom: 30,
  },
  errorText: {
    fontSize: 12,
    color: '#FF0D10',
  },
  screen: {
    flex: 1,
    paddingHorizontal: widthPercentage(30),
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray4,
    paddingVertical: heightPercentage(15),
    paddingHorizontal: widthPercentage(30),
    marginVertical: heightPercentage(5),
    fontSize: fontSz(20),
    borderRadius: 50,
  },
});

export default styles;
