import {Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import COLORS from '../../color';

const Home: React.FC = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Text>index</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});

export default Home;
