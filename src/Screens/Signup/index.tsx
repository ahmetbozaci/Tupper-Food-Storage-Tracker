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
import styles from './styles';
import {initialValuesInterface} from './types';
import validationSchema from './validationSchema';
import CustomButton from '../../shared/Button';
import {useDispatch} from 'react-redux';
import createUser from '../../Redux/Signup/API';

const UserForm = () => {
  const dispatch = useDispatch();

  const [userInformation, setUserInformation] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  const {name, email, password} = userInformation;

  const initialValues: initialValuesInterface = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  const signUp = () => {
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
        setUserInformation(values);
      }}>
      {({values, handleChange, isValid, errors, touched, handleSubmit}) => (
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
                signUp();
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

export default UserForm;
