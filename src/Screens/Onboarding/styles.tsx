import {StyleSheet} from 'react-native';
import COLORS from '../../color';
const styles = StyleSheet.create({
  subtitle: {
    color: COLORS.black,
    fontSize: 13,
    textAlign: 'center',
    maxWidth: '70%',
  },
  title: {
    color: COLORS.green3,
    fontSize: 36,
    textAlign: 'center',
  },

  indicator: {
    height: 10,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 50,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
