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
    fontWeight: 'bold',
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
  },
  arrow: {
    textAlign: 'right',
  },
  title: {
    fontWeight: '500',
    fontSize: fontSz(20),
  },
  textContainer: {},
  subtitle: {
    fontWeight: '900',
    fontSize: fontSz(25),
    marginVertical: heightPercentage(15),
  },
  text: {
    fontSize: fontSz(20),
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
