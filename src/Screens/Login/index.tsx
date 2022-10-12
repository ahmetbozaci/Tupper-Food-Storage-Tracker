/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {
  Button,
  TextInput,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Form, Formik} from 'formik';
import styles from '../loginSignupStyles';
import {initialValuesInterface} from './types';
import validationSchema from './validationSchema';
import CustomButton from '../../shared/Button';
import {useDispatch} from 'react-redux';
import createUser from '../../Redux/Signup/API';

const LoginForm = () => {
  // const dispatch = useDispatch();

  const initialValues: initialValuesInterface = {
    email: '',
    password: '',
  };

  const login = () => {
    // event.preventDefault();
    // const newUser = {
    //   name,
    //   email,
    //   password,
    // };
    // dispatch(createUser(newUser));
    console.log('hello');
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        actions.resetForm();
      }}>
      {({values, handleChange, isValid, errors, touched, handleSubmit}) => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.screen}>
            <Text style={styles.titleText}>Log In</Text>
            <TextInput
              style={styles.input}
              multiline
              placeholder="Email"
              onChangeText={handleChange('email')}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={handleChange('password')}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <CustomButton
              buttonText="Log In"
              onPress={() => {
                handleSubmit();
                login();
              }}
              disabled={!isValid}
              // buttonTextStyle={styles.buttonText}
              // onPress={() => navigation.navigate('Signup')}
            />
          </View>
        </TouchableWithoutFeedback>
      )}
    </Formik>
  );
};

export default LoginForm;
