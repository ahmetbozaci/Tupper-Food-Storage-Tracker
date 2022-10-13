import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {heightPercentage, fontSz, widthPercentage} from '../config';
import COLORS from '../color';

const AppHeader: React.FC = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.logoText}>Tuppr</Text>
      <Text style={styles.logout}>Logout</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '43.6%',
    paddingRight: widthPercentage(21),
    paddingVertical: heightPercentage(20),
  },
  logoText: {
    fontSize: fontSz(24),
    color: COLORS.primary,
    fontWeight: '900',
  },
  logout: {
    fontWeight: '400',
    fontSize: fontSz(15),
    color: COLORS.black,
  },
});

export default AppHeader;
