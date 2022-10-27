import {Text, SafeAreaView} from 'react-native';
import React from 'react';
import styles from './styles';
import TemperatureStorage from './guides';
import AppHeader from '../../shared/AppHeader';
const Guide = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <AppHeader />
      <Text style={styles.guideTitle}>Storage Guide</Text>
      <TemperatureStorage />
    </SafeAreaView>
  );
};

export default Guide;
