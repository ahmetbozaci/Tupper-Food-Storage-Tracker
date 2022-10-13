import React, {useState} from 'react';
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
import {useAppDispatch, useAppSelector} from '../../features/store';
import {signupFetch} from '../../features/signupSlice';

const SignupForm = ({navigation}) => {
  const dispatch = useAppDispatch();
  const signupData = useAppSelector(state => state.signup);
  const {status} = signupData;
  const [userInformation, setUserInformation] = useState({
    name: '',
    email: '',
    zipCode: '',
    password: '',
    passwordConfirmation: '',
  });

  const initialValues = {
    name: '',
    email: '',
    zipCode: '',
    password: '',
    passwordConfirmation: '',
  };
  const navigateToHome = () => {
    if (status === 'success') {
      navigation.navigate('Login'); // Change it to home page
    }
  };
  const signup = async () => {
    dispatch(signupFetch(userInformation));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        signup();
        navigateToHome();
        actions.resetForm();
      }}>
      {({values, handleChange, errors, touched, handleSubmit}) => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.screen}>
            <Text style={styles.titleText}>Sign Up</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              onChangeText={value => {
                handleChange('name')(value);
                setUserInformation({...userInformation, name: value});
              }}
              value={values.name}
            />
            {touched.name && errors.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}
            <TextInput
              style={styles.input}
              multiline
              placeholder="Email"
              onChangeText={value => {
                handleChange('email')(value);
                setUserInformation({...userInformation, email: value});
              }}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Zip Code"
              onChangeText={value => {
                handleChange('zipCode')(value);
                setUserInformation({...userInformation, zipCode: value});
              }}
              value={values.zipCode}
            />
            {touched.zipCode && errors.zipCode && (
              <Text style={styles.errorText}>{errors.zipCode}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={value => {
                handleChange('password')(value);
                setUserInformation({...userInformation, password: value});
              }}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Password Confirmation"
              onChangeText={value => {
                handleChange('passwordConfirmation')(value);
                setUserInformation({
                  ...userInformation,
                  passwordConfirmation: value,
                });
              }}
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

export default SignupForm;
