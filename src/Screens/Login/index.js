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
import validationSchema from './validationSchema';
import CustomButton from '../../shared/Button';
import {useAppDispatch, useAppSelector} from '../../features/store';
import {loginUser} from '../../features/loginSlice';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const loginData = useAppSelector(state => state.login);
  const [userInformation, setUserInformation] = useState({
    email: '', //omodauda@yahoo.com
    password: '', //testing
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const login = () => {
    console.log(loginData);
    dispatch(loginUser(userInformation));
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        login();
        actions.resetForm();
      }}>
      {({values, handleChange, errors, touched, handleSubmit}) => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.screen}>
            <Text style={styles.titleText}>Log In</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={value => {
                handleChange('email')(value);
                setUserInformation({...userInformation, email:value});
              }}
              value={values.email}
              name="email"
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={value => {
                handleChange('password')(value);
                setUserInformation({...userInformation, password:value});
              }}
              value={values.password}
              name="password"
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
