import {StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import COLORS from '../../color';
import AppHeader from '../../shared/AppHeader';
import TopTab from '../../navigation/TopTab';

const Foods: React.FC = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <AppHeader />
      <TopTab />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

export default Foods;
