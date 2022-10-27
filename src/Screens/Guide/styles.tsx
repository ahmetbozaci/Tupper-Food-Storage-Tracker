import {StyleSheet} from 'react-native';
import {fontSz, widthPercentage, heightPercentage} from '../../config';

import COLORS from '../../color';
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  temperatureContainer: {
    backgroundColor: COLORS.blue3,
  },
  headerContainer: {
    flexDirection: 'row',
  },
  header: {color: 'red', marginRight: widthPercentage(100)},
  title: {},
  text: {},
});

export default styles;
