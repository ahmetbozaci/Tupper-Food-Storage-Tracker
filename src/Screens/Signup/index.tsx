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
import {Formik} from 'formik';
import styles from '../loginSignupStyles';
import {initialValuesInterface} from './types';
import validationSchema from './validationSchema';
import CustomButton from '../../shared/Button';
import createUser from '../../Redux/Signup/API';
import {useAppDispatch} from '../../Redux/store';

const SignUpForm = () => {
  const dispatch = useAppDispatch();

  const [userInformation, setUserInformation] = useState({
    name: '',
    email: '',
    zipCode: '',
    password: '',
    passwordConfirmation: '',
  });
  const {name, email, zipCode, password} = userInformation;

  const initialValues: initialValuesInterface = {
    name: '',
    email: '',
    zipCode: '',
    password: '',
    passwordConfirmation: '',
  };

  const signUp = async () => {
    const newUser = {
      name,
      email,
      zipCode,
      password,
    };
    dispatch(createUser(newUser));
    console.log('signUpFunction');
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        signUp();
        actions.resetForm();
        setUserInformation(values);
      }}>
      {({values, handleChange, errors, touched, handleSubmit}) => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.screen}>
            <Text style={styles.titleText}>Sign Up</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              onChangeText={handleChange('name')}
              value={values.name}
            />
            {touched.name && errors.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}
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
              multiline
              placeholder="Zip Code"
              onChangeText={handleChange('zipCode')}
              value={values.zipCode}
            />
            {touched.zipCode && errors.zipCode && (
              <Text style={styles.errorText}>{errors.zipCode}</Text>
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
            <TextInput
              style={styles.input}
              placeholder="Password Confirmation"
              onChangeText={handleChange('passwordConfirmation')}
              value={values.passwordConfirmation}
            />
            {touched.passwordConfirmation && errors.passwordConfirmation && (
              <Text style={styles.errorText}>
                {errors.passwordConfirmation}
              </Text>
            )}
            <CustomButton
              buttonText="Sign up"
              onPress={() => {
                handleSubmit();
              }}
              //! add disabled prop
            />
          </View>
        </TouchableWithoutFeedback>
      )}
    </Formik>
  );
};

export default SignUpForm;
