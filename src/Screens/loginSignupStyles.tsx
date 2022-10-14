import {StyleSheet} from 'react-native';
import COLORS from '../color';
import {fontSz, widthPercentage, heightPercentage} from '../config';

const styles = StyleSheet.create({
  titleText: {
    fontSize: fontSz(40),
    fontWeight: 'bold',
    color: COLORS.green3,
  },
  titleTextSignup: {
    marginVertical: heightPercentage(45),
  },
  titleTextLogin: {
    marginVertical: heightPercentage(100),
  },
  errorText: {
    fontSize: 12,
    color: '#FF0D10',
  },
  screen: {
    flex: 1,
    marginHorizontal: widthPercentage(40),
    justifyContent: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: COLORS.gray7,
    paddingVertical: heightPercentage(15),
    paddingHorizontal: widthPercentage(30),
    marginVertical: heightPercentage(10),
    fontSize: fontSz(20),
    borderRadius: 12,
    color: COLORS.green,
  },
  buttonContainer: {
    alignItems: 'flex-end',
  },
  buttonContainerLogin: {
    marginVertical: heightPercentage(100),
  },
  buttonContainerSignup: {
    marginVertical: heightPercentage(35),
  },
});

export default styles;
