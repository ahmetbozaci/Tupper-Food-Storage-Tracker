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
import styles from './styles';
import {initialValuesInterface} from './types';
import validationSchema from './validationSchema';
import CustomButton from '../../shared/Button';

const UserForm: React.FC = () => {
  const [userInformation, setUserInformation] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  const initialValues: initialValuesInterface = {
    email: '',
    password: '',
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        actions.resetForm();
        setUserInformation(values);
      }}
    >
      {({values, handleChange, handleSubmit, isValid, errors, touched}) => (
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
              onPress={handleSubmit}
              disabled={!isValid}
              // onPress={() => navigation.navigate('Signup')}
            />
          </View>
        </TouchableWithoutFeedback>
      )}
    </Formik>
  );
};

export default UserForm;
