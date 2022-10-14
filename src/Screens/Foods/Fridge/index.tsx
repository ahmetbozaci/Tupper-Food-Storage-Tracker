import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import COLORS from '../../../color';

const Fridge: React.FC = () => {
  return (
    <View style={styles.screen}>
      <Text>Fridge</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

export default Fridge;
