import {StyleSheet, Text, Pressable, View} from 'react-native';
import React from 'react';
import {heightPercentage, fontSz, widthPercentage} from '../config';
import COLORS from '../color';

interface Props {
  onLogoutPress: () => void;
}

const AppHeader: React.FC<Props> = ({onLogoutPress}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.logoText}>Tupper</Text>
      <Pressable onPress={onLogoutPress}>
        <Text style={styles.logout}>Logout</Text>
      </Pressable>
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
