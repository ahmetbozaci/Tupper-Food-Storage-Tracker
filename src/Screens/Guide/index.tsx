import {Text, SafeAreaView} from 'react-native';
import React from 'react';
import styles from './styles';
import TemperatureStorage from './temperatureStorage';
import AppHeader from '../../shared/AppHeader';
const Guide: React.FC = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <AppHeader />
      <Text style={styles.guideTitle}>Storage Guide</Text>
      <TemperatureStorage />
    </SafeAreaView>
  );
};

export default Guide;
