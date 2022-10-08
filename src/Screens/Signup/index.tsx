/* eslint-disable @typescript-eslint/no-unused-vars */
import {Text, SafeAreaView} from 'react-native';
import React from 'react';
import styles from '../Main/styles';
import UserForm from '../../components/UserForm';

const Signup: React.FC = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <UserForm />
    </SafeAreaView>
  );
};

export default Signup;
