import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

import {RFPercentage} from 'react-native-responsive-fontsize';

export const fontSize = val => RFPercentage(val / 7.6);

export const heightPercentage = val => {
  // get scaled height equivalent of design height
  const num = val / 8.44;
  return heightPercentageToDP(num);
};

export const widthPercentage = val => {
  // get scaled height equivalent of design width
  const num = val / 3.88;
  return widthPercentageToDP(num);
};
