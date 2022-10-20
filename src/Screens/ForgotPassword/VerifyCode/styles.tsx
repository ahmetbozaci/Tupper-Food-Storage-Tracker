import {StyleSheet} from 'react-native';
import COLORS from '../../../color';
import {fontSz, widthPercentage, heightPercentage} from '../../../config';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: widthPercentage(24),
  },
  content: {
    paddingHorizontal: widthPercentage(40),
  },
  title: {
    fontWeight: '700',
    fontSize: 24,
    color: COLORS.green3,
    marginTop: heightPercentage(42),
    marginBottom: heightPercentage(102),
  },
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: widthPercentage(60),
    height: heightPercentage(72),
    borderRadius: 12,
    lineHeight: 60,
    fontSize: fontSz(24),
    borderWidth: 3,
    borderColor: COLORS.gray7,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
  button: {
    alignSelf: 'flex-end',
    paddingVertical: heightPercentage(15),
    paddingHorizontal: widthPercentage(46),
    marginTop: heightPercentage(243),
  },
  btnText: {
    fontWeight: '500',
    fontSize: fontSz(16),
  },
});

export default styles;
