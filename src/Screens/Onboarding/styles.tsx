import {StyleSheet} from 'react-native';
import COLORS from '../../color';
import {fontSz, widthPercentage, heightPercentage} from '../../config';

const styles = StyleSheet.create({
  subtitle: {
    color: COLORS.black,
    fontSize: fontSz(20),
    textAlign: 'center',
    lineHeight: 24,
    marginHorizontal: widthPercentage(50),
  },
  title: {
    color: COLORS.green3,
    fontWeight: 'bold',
    fontSize: fontSz(50),
    textAlign: 'center',
    marginTop: 40,
    marginHorizontal: widthPercentage(60),
    marginVertical: heightPercentage(100),
  },
  indicator: {
    height: 8,
    width: 8,
    backgroundColor: 'grey',
    marginHorizontal: 4,
    borderRadius: 50,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: heightPercentage(40),
  },
  button: {
    alignSelf: 'flex-end',
    marginRight: heightPercentage(25),
    width: '35%',
  },
  btnText: {
    fontWeight: '500',
    fontSize: fontSz(16),
  },
  backArrowContainer: {
    marginTop: heightPercentage(50),
    marginLeft: widthPercentage(30),
  },
});

export default styles;
