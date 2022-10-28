import {StyleSheet} from 'react-native';
import COLORS from '../../color';
import {fontSz, heightPercentage, widthPercentage} from '../../config';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
    marginHorizontal: widthPercentage(25),
  },
  guideTitle: {
    fontSize: fontSz(40),
    fontWeight: '900',
    color: COLORS.black,
    marginBottom: heightPercentage(15),
  },
  guideContainer: {
    marginBottom: heightPercentage(13),
    padding: 20,
    borderRadius: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  arrow: {
    paddingLeft: 20,
  },
  title: {
    fontWeight: '500',
    fontSize: fontSz(20),
    color: COLORS.black,
  },
  textContainer: {},
  subtitle: {
    fontWeight: '800',
    fontSize: fontSz(25),
    color: COLORS.black,
    marginVertical: heightPercentage(15),
  },
  text: {
    fontSize: fontSz(20),
    color: COLORS.black,
    paddingHorizontal: heightPercentage(12),
  },
  backgroundColor1: {
    backgroundColor: '#A4F6E8',
  },
  backgroundColor2: {
    backgroundColor: '#CBA3FF',
  },
  backgroundColor3: {
    backgroundColor: '#91E183',
  },
  backgroundColor4: {
    backgroundColor: '#FF8267',
  },
  backgroundColor5: {
    backgroundColor: '#FFC656',
  },
});

export default styles;
