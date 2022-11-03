/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet} from 'react-native';
import COLORS from './color';
import {fontSz, widthPercentage, heightPercentage} from './config';
const globalStyles = StyleSheet.create({
  helveticaLight: {
    fontFamily: 'HELVETICANEUE-LIGHT',
  },
  fontsFree: {
    fontFamily: 'FONTSFREE-NET-AXIFORMA4WOFF2',
  },
  helveticaMedium: {
    fontFamily: 'HELVETICANEUE-MEDIUM',
  },
  poppinsBold: {
    fontFamily: 'POPPINS-BOLD',
  },
  poppinsLight: {
    fontFamily: 'POPPINS-LIGHT',
  },
  poppinsMedium: {
    fontFamily: 'POPPINS-MEDIUM',
  },
  poppinsRegular: {
    fontFamily: 'KolkerBrush-Regular',
    color: 'black',
  },
});

export default globalStyles;
