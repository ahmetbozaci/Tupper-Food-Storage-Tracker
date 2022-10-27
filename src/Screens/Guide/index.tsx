import {Text, SafeAreaView} from 'react-native';
import React from 'react';
import styles from './styles';
import TemperatureStorage from './temperatureStorage';

const Guide: React.FC = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Text>Storage Guide</Text>
      <TemperatureStorage />
    </SafeAreaView>
  );
};

export default Guide;
