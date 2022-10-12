/* eslint-disable prettier/prettier */
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
import {fetchUser} from '../../Redux/features/loginSlice';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [userInformation, setUserInformation] = useState({
    email: '',
    password: '',
  });

  const initialValues: initialValuesInterface = {
    email: '',
    password: '',
  };

  const login = () => {
    dispatch(fetchUser(userInformation.email));
    console.log('login');
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        login();
        console.log(values);
        actions.resetForm();
      }}
    >
      {({values, handleChange, errors, touched, handleSubmit}) => (
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
              }}
              // disabled={!isValid}
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
