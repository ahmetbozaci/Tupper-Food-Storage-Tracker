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
import {signupFetch} from '../../features/signupSlice';
import COLORS from '../../color';

const SignupForm = ({navigation}) => {
  const dispatch = useAppDispatch();

  const initialValues = {
    name: '',
    email: '',
    zipCode: '',
    password: '',
    passwordConfirmation: '',
  };

  const navigateToHome = data => {
    if (data === 'success') {
      navigation.navigate('Tabs'); // Change it to home page
    }
  };

  const signup = async values => {
    const data = await dispatch(signupFetch(values));
    navigateToHome(data.payload.status);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        signup(values);
        actions.resetForm();
      }}>
      {({values, handleChange, errors, touched, handleSubmit}) => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.screen}>
            <Text style={[styles.titleTextSignup, styles.titleText]}>
              Sign Up
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor={COLORS.gray8}
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
              placeholderTextColor={COLORS.gray8}
              onChangeText={handleChange('email')}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Zip Code"
              placeholderTextColor={COLORS.gray8}
              onChangeText={handleChange('zipCode')}
              value={values.zipCode}
            />
            {touched.zipCode && errors.zipCode && (
              <Text style={styles.errorText}>{errors.zipCode}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={COLORS.gray8}
              onChangeText={handleChange('password')}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholderTextColor={COLORS.gray8}
              placeholder="Confirm Password"
              onChangeText={handleChange('passwordConfirmation')}
            />
            {touched.passwordConfirmation && errors.passwordConfirmation && (
              <Text style={styles.errorText}>
                {errors.passwordConfirmation}
              </Text>
            )}
            <View
              style={[styles.buttonContainer, styles.buttonContainerSignup]}>
              <CustomButton
                onPress={() => {
                  handleSubmit();
                }}
                //! add disabled prop
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </Formik>
  );
};

export default SignupForm;
