import React from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Formik} from 'formik';
import styles from './styles';
import validationSchema from './validationSchema';
import CustomButton from '../../../shared/Button';
import COLORS from '../../../color';

const VerifyCode = () => {
  const initialValues = {
    password: '',
    passwordConfirmation: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        actions.resetForm();
      }}>
      {({values, handleChange, errors, touched, handleSubmit}) => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.screen}>
            <Text style={[styles.titleTextSignup, styles.titleText]}>
              Enter Verification Code.
            </Text>
            <TextInput
              style={styles.input}
              placeholder="New Password"
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

export default VerifyCode;
