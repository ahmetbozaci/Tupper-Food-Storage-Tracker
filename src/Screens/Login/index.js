import React from 'react';
import {
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

import {useAppDispatch} from '../../features/store';
import {loginFetch} from '../../features/loginSlice';

const LoginForm = ({navigation}) => {
  const dispatch = useAppDispatch();

  //email //omodauda@yahoo.com
  //password //testing

  const initialValues = {
    email: '',
    password: '',
  };
  const navigateToHome = data => {
    if (data === 'success') {
      navigation.navigate('Tabs');
    }
  };

  const login = async values => {
    const data = await dispatch(loginFetch(values));
    navigateToHome(data.payload.status);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        login(values);
        actions.resetForm();
      }}>
      {({values, handleChange, errors, touched, handleSubmit}) => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.screen}>
            <Text style={[styles.titleTextLogin, styles.titleText]}>
              Log In
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange('email')}
              value={values.email}
              name="email"
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={handleChange('password')}
              value={values.password}
              name="password"
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <View style={[styles.buttonContainerLogin, styles.buttonContainer]}>
              <CustomButton
                onPress={() => {
                  handleSubmit();
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </Formik>
  );
};

export default LoginForm;
