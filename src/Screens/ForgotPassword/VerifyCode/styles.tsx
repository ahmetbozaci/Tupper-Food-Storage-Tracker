import {StyleSheet} from 'react-native';
import COLORS from '../../../color';
import {fontSz, widthPercentage, heightPercentage} from '../../../config';

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {
    textAlign: 'center',
    fontSize: 24,
    color: COLORS.green3,
    marginBottom: 70,
  },
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 60,
    height: 72,
    borderRadius: 12,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: COLORS.gray7,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  focusCell: {
    borderColor: '#000',
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
